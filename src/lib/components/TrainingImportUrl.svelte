<script lang="ts">
	import { fetchTraining } from '$lib/utils/training-fetcher';
	import { importedTrainingsStore } from '$lib/stores/imported-trainings.svelte';
	import { logger } from '$lib/utils/logger';
	import type { Training } from '$lib/types';

	interface Props {
		onImport?: (training: Training) => void;
	}

	let { onImport }: Props = $props();

	let url = $state('');
	let isLoading = $state(false);
	let message = $state<{ type: 'success' | 'error'; text: string } | null>(null);

	async function handleImport() {
		if (!url.trim()) {
			message = { type: 'error', text: 'Bitte URL eingeben' };
			return;
		}

		isLoading = true;
		message = null;
		logger.action('TrainingImportUrl', 'Import gestartet', { url });

		const result = await fetchTraining(url.trim());

		isLoading = false;

		if (result.success && result.training) {
			const training = result.training;

			// Training speichern (überschreiben falls vorhanden)
			importedTrainingsStore.addOrUpdate(training);

			message = {
				type: 'success',
				text: `"${training.name}" mit ${training.questions.length} Fragen importiert`
			};

			logger.action('TrainingImportUrl', 'Import erfolgreich', {
				id: training.id,
				name: training.name,
				questionCount: training.questions.length
			});

			// URL leeren
			url = '';

			// Callback aufrufen
			if (onImport) {
				onImport(training);
			}
		} else {
			message = { type: 'error', text: result.error || 'Unbekannter Fehler' };
			logger.event('TrainingImportUrl', 'Import fehlgeschlagen', { url, error: result.error });
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !isLoading) {
			handleImport();
		}
	}

	function dismissMessage() {
		message = null;
	}
</script>

<div class="url-import">
	<div class="input-group">
		<input
			type="url"
			bind:value={url}
			placeholder="https://example.com/training.json"
			disabled={isLoading}
			onkeydown={handleKeydown}
			class="url-input"
		/>
		<button type="button" onclick={handleImport} disabled={isLoading || !url.trim()} class="import-button">
			{#if isLoading}
				<span class="spinner"></span>
			{:else}
				Importieren
			{/if}
		</button>
	</div>
</div>

{#if message}
	<div class="message" class:success={message.type === 'success'} class:error={message.type === 'error'}>
		<span class="message-text">{message.text}</span>
		<button type="button" class="dismiss-button" onclick={dismissMessage} aria-label="Schließen">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	</div>
{/if}

<style>
	.url-import {
		margin-bottom: 1rem;
	}

	.input-group {
		display: flex;
		gap: 0.5rem;
	}

	.url-input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		border: 2px solid var(--color-border, #ddd);
		border-radius: 0.25rem;
		font-size: 0.9rem;
		transition: border-color 0.2s;
	}

	.url-input:focus {
		outline: none;
		border-color: var(--color-primary, #1976d2);
	}

	.url-input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
	}

	.import-button {
		padding: 0.5rem 1rem;
		background-color: var(--color-primary, #1976d2);
		color: white;
		border: none;
		border-radius: 0.25rem;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 100px;
		justify-content: center;
	}

	.import-button:hover:not(:disabled) {
		opacity: 0.9;
	}

	.import-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.message {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.message.success {
		background-color: #e8f5e9;
		color: #2e7d32;
		border: 1px solid #a5d6a7;
	}

	.message.error {
		background-color: #ffebee;
		color: #c62828;
		border: 1px solid #ef9a9a;
	}

	.message-text {
		flex: 1;
		white-space: pre-line;
	}

	.dismiss-button {
		background: none;
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		color: inherit;
		opacity: 0.7;
		flex-shrink: 0;
	}

	.dismiss-button:hover {
		opacity: 1;
	}
</style>
