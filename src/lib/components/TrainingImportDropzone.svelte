<script lang="ts">
	import { validateTraining, formatValidationErrors } from '$lib/utils/training-validator';
	import { importedTrainingsStore } from '$lib/stores/imported-trainings.svelte';
	import { logger } from '$lib/utils/logger';
	import type { Training } from '$lib/types';

	interface Props {
		onImport?: (trainings: Training[]) => void;
	}

	let { onImport }: Props = $props();

	let isDragOver = $state(false);
	let isLoading = $state(false);
	let message = $state<{ type: 'success' | 'error'; text: string } | null>(null);
	let fileInput: HTMLInputElement;

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragOver = true;
	}

	function handleDragLeave() {
		isDragOver = false;
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			await processFiles(files);
		}
	}

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			processFiles(input.files);
		}
	}

	async function processFiles(files: FileList) {
		isLoading = true;
		message = null;
		logger.action('TrainingImportDropzone', 'Dateien empfangen', { count: files.length });

		const imported: Training[] = [];
		const errors: string[] = [];

		for (const file of Array.from(files)) {
			// JSON- und TXT-Dateien akzeptieren (TXT kann JSON enthalten)
			if (!file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
				errors.push(`${file.name}: Nur JSON- oder TXT-Dateien erlaubt`);
				continue;
			}

			try {
				const text = await file.text();
				const data = JSON.parse(text);
				const result = validateTraining(data);

				if (result.valid && result.training) {
					const training = result.training;

					// Prüfen ob ID bereits existiert
					if (importedTrainingsStore.hasId(training.id)) {
						// Überschreiben
						importedTrainingsStore.update(training);
						imported.push(training);
						logger.action('TrainingImportDropzone', 'Training aktualisiert', {
							id: training.id,
							file: file.name
						});
					} else {
						importedTrainingsStore.add(training);
						imported.push(training);
						logger.action('TrainingImportDropzone', 'Training importiert', {
							id: training.id,
							file: file.name
						});
					}
				} else {
					errors.push(`${file.name}: ${formatValidationErrors(result.errors)}`);
				}
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Unbekannter Fehler';
				errors.push(`${file.name}: ${errorMsg}`);
				logger.event('TrainingImportDropzone', 'Fehler beim Verarbeiten', {
					file: file.name,
					error: errorMsg
				});
			}
		}

		isLoading = false;

		// Nachricht anzeigen
		if (imported.length > 0 && errors.length === 0) {
			const totalQuestions = imported.reduce((sum, t) => sum + t.questions.length, 0);
			message = {
				type: 'success',
				text: `${imported.length} Training(s) mit ${totalQuestions} Fragen importiert`
			};
		} else if (imported.length > 0 && errors.length > 0) {
			message = {
				type: 'success',
				text: `${imported.length} Training(s) importiert, ${errors.length} Fehler`
			};
		} else if (errors.length > 0) {
			message = {
				type: 'error',
				text: errors.join('\n')
			};
		}

		// Callback aufrufen
		if (imported.length > 0 && onImport) {
			onImport(imported);
		}

		// File-Input zurücksetzen
		if (fileInput) {
			fileInput.value = '';
		}
	}

	function openFileDialog() {
		fileInput?.click();
	}

	function dismissMessage() {
		message = null;
	}
</script>

<div
	class="dropzone"
	class:drag-over={isDragOver}
	class:loading={isLoading}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && openFileDialog()}
>
	<input
		bind:this={fileInput}
		type="file"
		accept=".json,.txt"
		multiple
		onchange={handleFileSelect}
		hidden
	/>

	{#if isLoading}
		<div class="loading-indicator">
			<span class="spinner"></span>
			<span>Importiere...</span>
		</div>
	{:else}
		<div class="dropzone-content">
			<svg
				class="upload-icon"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="17 8 12 3 7 8" />
				<line x1="12" y1="3" x2="12" y2="15" />
			</svg>
			<p class="dropzone-text">
				Trainingsdateien hierher ziehen
				<br />
				<span class="dropzone-subtext">oder <button type="button" onclick={openFileDialog}>Dateien auswählen</button></span>
			</p>
		</div>
	{/if}
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
	.dropzone {
		border: 2px dashed var(--color-border, #ddd);
		border-radius: 0.5rem;
		padding: 1.5rem;
		text-align: center;
		cursor: pointer;
		transition: border-color 0.2s, background-color 0.2s;
		margin-bottom: 1.5rem;
	}

	.dropzone:hover,
	.dropzone:focus {
		border-color: var(--color-primary, #1976d2);
		outline: none;
	}

	.dropzone.drag-over {
		border-color: var(--color-primary, #1976d2);
		background-color: #e3f2fd;
	}

	.dropzone.loading {
		pointer-events: none;
		opacity: 0.7;
	}

	.dropzone-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.upload-icon {
		color: #666;
	}

	.dropzone-text {
		margin: 0;
		color: #666;
		font-size: 0.9rem;
	}

	.dropzone-subtext {
		font-size: 0.8rem;
		color: #888;
	}

	.dropzone-subtext button {
		background: none;
		border: none;
		color: var(--color-primary, #1976d2);
		cursor: pointer;
		padding: 0;
		font: inherit;
		text-decoration: underline;
	}

	.dropzone-subtext button:hover {
		text-decoration: none;
	}

	.loading-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: #666;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid #ddd;
		border-top-color: var(--color-primary, #1976d2);
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
