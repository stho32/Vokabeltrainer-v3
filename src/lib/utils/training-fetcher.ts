// Training-Fetcher für URL-Import
import { validateTraining, formatValidationErrors } from './training-validator';
import type { Training } from '$lib/types';
import type { ValidationResult } from './training-validator';

export interface FetchResult {
	success: boolean;
	training?: Training;
	error?: string;
	url: string;
}

const FETCH_TIMEOUT = 10000; // 10 Sekunden
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function fetchTraining(url: string): Promise<FetchResult> {
	try {
		// URL validieren
		let parsedUrl: URL;
		try {
			parsedUrl = new URL(url);
		} catch {
			return { success: false, error: 'Ungültige URL', url };
		}

		// Nur HTTPS erlauben (außer localhost)
		if (parsedUrl.protocol !== 'https:' && parsedUrl.hostname !== 'localhost') {
			return { success: false, error: 'Nur HTTPS-URLs erlaubt', url };
		}

		// Fetch mit Timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

		let response: Response;
		try {
			response = await fetch(url, {
				signal: controller.signal,
				headers: {
					Accept: 'application/json'
				}
			});
		} catch (err) {
			if (err instanceof Error && err.name === 'AbortError') {
				return { success: false, error: 'Zeitüberschreitung beim Laden', url };
			}
			return {
				success: false,
				error: 'Netzwerkfehler - möglicherweise CORS-Problem',
				url
			};
		} finally {
			clearTimeout(timeoutId);
		}

		// HTTP-Status prüfen
		if (!response.ok) {
			return {
				success: false,
				error: `Server-Fehler: ${response.status} ${response.statusText}`,
				url
			};
		}

		// Content-Length prüfen (wenn verfügbar)
		const contentLength = response.headers.get('content-length');
		if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
			return {
				success: false,
				error: `Datei zu groß (max. ${MAX_FILE_SIZE / 1024 / 1024} MB)`,
				url
			};
		}

		// JSON parsen
		let data: unknown;
		try {
			const text = await response.text();
			if (text.length > MAX_FILE_SIZE) {
				return {
					success: false,
					error: `Datei zu groß (max. ${MAX_FILE_SIZE / 1024 / 1024} MB)`,
					url
				};
			}
			data = JSON.parse(text);
		} catch {
			return { success: false, error: 'Ungültiges JSON-Format', url };
		}

		// Training validieren
		const result: ValidationResult = validateTraining(data);
		if (!result.valid) {
			return {
				success: false,
				error: `Validierungsfehler:\n${formatValidationErrors(result.errors)}`,
				url
			};
		}

		// Source-URL setzen
		const training = result.training!;
		training.sourceUrl = url;

		return { success: true, training, url };
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unbekannter Fehler';
		return { success: false, error: message, url };
	}
}

export async function fetchMultipleTrainings(urls: string[]): Promise<FetchResult[]> {
	return Promise.all(urls.map(fetchTraining));
}
