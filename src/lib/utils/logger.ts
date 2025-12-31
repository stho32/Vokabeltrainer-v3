// Zentrales Logging-Utility für die Vokabeltrainer-Anwendung
// Alle Logs werden auf stdout (console) ausgegeben

type LogLevel = 'INFO' | 'ACTION' | 'STATE' | 'EVENT' | 'DEBUG';

interface LogContext {
	component?: string;
	action?: string;
	data?: Record<string, unknown>;
}

class Logger {
	private formatTimestamp(): string {
		const now = new Date();
		return now.toISOString().slice(11, 23); // HH:mm:ss.SSS
	}

	private formatMessage(level: LogLevel, category: string, message: string, context?: LogContext): string {
		const timestamp = this.formatTimestamp();
		const prefix = `[${timestamp}] [${level}] [${category}]`;

		let output = `${prefix} ${message}`;

		if (context?.data && Object.keys(context.data).length > 0) {
			output += ` | ${JSON.stringify(context.data)}`;
		}

		return output;
	}

	// Benutzeraktionen (Klicks, Eingaben)
	action(category: string, action: string, data?: Record<string, unknown>): void {
		console.log(this.formatMessage('ACTION', category, action, { data }));
	}

	// Zustandsänderungen
	state(category: string, message: string, data?: Record<string, unknown>): void {
		console.log(this.formatMessage('STATE', category, message, { data }));
	}

	// Ereignisse (z.B. Timer, Animationen)
	event(category: string, message: string, data?: Record<string, unknown>): void {
		console.log(this.formatMessage('EVENT', category, message, { data }));
	}

	// Allgemeine Informationen
	info(category: string, message: string, data?: Record<string, unknown>): void {
		console.log(this.formatMessage('INFO', category, message, { data }));
	}

	// Debug-Informationen
	debug(category: string, message: string, data?: Record<string, unknown>): void {
		console.log(this.formatMessage('DEBUG', category, message, { data }));
	}

	// Gruppierte Logs für zusammengehörige Aktionen
	group(category: string, title: string): void {
		console.group(`[${this.formatTimestamp()}] [GROUP] [${category}] ${title}`);
	}

	groupEnd(): void {
		console.groupEnd();
	}
}

export const logger = new Logger();
