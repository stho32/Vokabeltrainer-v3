<script lang="ts">
	import { importedTrainingsStore } from '$lib/stores/imported-trainings.svelte';
	import { logger } from '$lib/utils/logger';
	import { base } from '$app/paths';

	let copiedId = $state<string | null>(null);

	const trainings = $derived(importedTrainingsStore.getAll());

	function removeTraining(id: string, name: string) {
		if (confirm(`Training "${name}" wirklich entfernen?`)) {
			importedTrainingsStore.remove(id);
			logger.action('ImportedTrainingsList', 'Training entfernt', { id, name });
		}
	}

	function clearAll() {
		if (confirm(`Alle ${trainings.length} importierten Trainings entfernen?`)) {
			importedTrainingsStore.clear();
			logger.action('ImportedTrainingsList', 'Alle Trainings entfernt');
		}
	}

	async function copyImportLink(training: { id: string; sourceUrl?: string }) {
		// URL generieren
		let importUrl: string;

		if (training.sourceUrl) {
			// Wenn sourceUrl vorhanden, diese verwenden
			const currentUrl = new URL(window.location.href);
			currentUrl.searchParams.set('import', training.sourceUrl);
			importUrl = currentUrl.toString();
		} else {
			// Fallback: Hinweis dass keine URL verfügbar
			copiedId = null;
			alert('Keine Quell-URL verfügbar. Dieses Training wurde per Datei-Upload importiert.');
			return;
		}

		try {
			await navigator.clipboard.writeText(importUrl);
			copiedId = training.id;
			logger.action('ImportedTrainingsList', 'Link kopiert', { id: training.id });

			// Nach 2 Sekunden zurücksetzen
			setTimeout(() => {
				if (copiedId === training.id) {
					copiedId = null;
				}
			}, 2000);
		} catch {
			logger.event('ImportedTrainingsList', 'Kopieren fehlgeschlagen');
			alert('Kopieren fehlgeschlagen');
		}
	}
</script>

{#if trainings.length > 0}
	<section class="imported-trainings">
		<div class="header">
			<h3>Importierte Trainings ({trainings.length})</h3>
			<button type="button" class="clear-button" onclick={clearAll}>Alle entfernen</button>
		</div>

		<ul class="training-list">
			{#each trainings as training (training.id)}
				<li class="training-item">
					<div class="training-info">
						<span class="training-name">{training.name}</span>
						<span class="training-meta">{training.questions.length} Fragen</span>
					</div>
					<div class="training-actions">
						{#if training.sourceUrl}
							<button
								type="button"
								class="action-button"
								onclick={() => copyImportLink(training)}
								title="Import-Link kopieren"
							>
								{#if copiedId === training.id}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								{:else}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
										<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
									</svg>
								{/if}
							</button>
						{/if}
						<button
							type="button"
							class="action-button delete"
							onclick={() => removeTraining(training.id, training.name)}
							title="Training entfernen"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="3 6 5 6 21 6" />
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
							</svg>
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	.imported-trainings {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background-color: #fafafa;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border, #ddd);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	h3 {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: #555;
	}

	.clear-button {
		background: none;
		border: none;
		color: #c62828;
		font-size: 0.8rem;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
	}

	.clear-button:hover {
		text-decoration: underline;
	}

	.training-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.training-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.75rem;
		background-color: white;
		border-radius: 0.25rem;
		border: 1px solid #eee;
	}

	.training-info {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.training-name {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.training-meta {
		font-size: 0.8rem;
		color: #888;
	}

	.training-actions {
		display: flex;
		gap: 0.25rem;
	}

	.action-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		background: none;
		border: 1px solid #ddd;
		border-radius: 0.25rem;
		cursor: pointer;
		color: #666;
		transition: border-color 0.2s, color 0.2s, background-color 0.2s;
	}

	.action-button:hover {
		border-color: var(--color-primary, #1976d2);
		color: var(--color-primary, #1976d2);
		background-color: #f0f7ff;
	}

	.action-button.delete:hover {
		border-color: #c62828;
		color: #c62828;
		background-color: #ffebee;
	}
</style>
