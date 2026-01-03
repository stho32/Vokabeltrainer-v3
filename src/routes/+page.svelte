<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { configStore } from '$lib/stores/config.svelte';
	import { scoreStore } from '$lib/stores/scores.svelte';
	import { trainingSessionStore } from '$lib/stores/training-session.svelte';
	import { importedTrainingsStore } from '$lib/stores/imported-trainings.svelte';
	import { getAllTrainings, getTrainingsSorted, getSelectedTrainings } from '$lib/data/trainings';
	import { fetchMultipleTrainings } from '$lib/utils/training-fetcher';
	import { hashQuestion } from '$lib/utils/hash';
	import { logger } from '$lib/utils/logger';
	import ScoreBadge from '$lib/components/ScoreBadge.svelte';
	import TrainingBrowseModal from '$lib/components/TrainingBrowseModal.svelte';
	import TrainingImportDropzone from '$lib/components/TrainingImportDropzone.svelte';
	import TrainingImportUrl from '$lib/components/TrainingImportUrl.svelte';
	import ImportedTrainingsList from '$lib/components/ImportedTrainingsList.svelte';
	import type { Training } from '$lib/types';

	logger.info('HomePage', 'Seite geladen');

	let browseTraining = $state<Training | null>(null);
	let showImport = $state(false);
	let urlImportMessage = $state<{ type: 'success' | 'error'; text: string } | null>(null);

	// URL-Parameter verarbeiten (import=<URL>)
	$effect(() => {
		const importUrls = $page.url.searchParams.getAll('import');
		if (importUrls.length > 0) {
			logger.action('HomePage', 'URL-Import erkannt', { urls: importUrls });
			handleUrlImport(importUrls);

			// URL-Parameter entfernen (ohne Reload)
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.delete('import');
			window.history.replaceState({}, '', newUrl.toString());
		}
	});

	async function handleUrlImport(urls: string[]) {
		urlImportMessage = null;
		const results = await fetchMultipleTrainings(urls);

		const imported: Training[] = [];
		const errors: string[] = [];

		for (const result of results) {
			if (result.success && result.training) {
				importedTrainingsStore.addOrUpdate(result.training);
				imported.push(result.training);
			} else {
				errors.push(result.error || 'Unbekannter Fehler');
			}
		}

		if (imported.length > 0 && errors.length === 0) {
			urlImportMessage = {
				type: 'success',
				text: `${imported.length} Training(s) erfolgreich importiert`
			};
		} else if (imported.length > 0 && errors.length > 0) {
			urlImportMessage = {
				type: 'success',
				text: `${imported.length} Training(s) importiert, ${errors.length} Fehler`
			};
		} else if (errors.length > 0) {
			urlImportMessage = {
				type: 'error',
				text: errors.join('\n')
			};
		}

		// Nachricht nach 5 Sekunden ausblenden
		if (urlImportMessage) {
			setTimeout(() => {
				urlImportMessage = null;
			}, 5000);
		}
	}

	function openBrowse(event: MouseEvent, training: Training) {
		event.preventDefault();
		event.stopPropagation();
		logger.action('HomePage', 'Click: Training Browse', { trainingId: training.id });
		browseTraining = training;
	}

	function closeBrowse() {
		browseTraining = null;
	}

	// Reaktive Trainings-Liste (aktualisiert sich bei Import)
	const sortedTrainings = $derived(getTrainingsSorted());

	const questionCounts: (number | 'all')[] = [5, 30, 45, 100, 'all'];

	function isSelected(trainingId: string): boolean {
		return configStore.selectedTrainings.includes(trainingId);
	}

	function toggleTraining(trainingId: string) {
		logger.action('HomePage', 'Click: Training Toggle', { trainingId });
		configStore.toggleTraining(trainingId);
	}

	function getQuestionCount(training: Training): number {
		return training.questions.length;
	}

	function getTrainingScore(training: Training): number {
		if (training.questions.length === 0) return 100;

		const MIN_SCORE = -20;
		const MAX_SCORE = 10;
		const SCORE_RANGE = MAX_SCORE - MIN_SCORE; // 30

		let totalNormalized = 0;

		for (const question of training.questions) {
			const questionText = question.type === 'word-search' ? question.title : question.question;
			const hash = hashQuestion(questionText);

			// Unbeantwortete Fragen zählen als 0%, nicht als 67%
			if (!scoreStore.hasScore(hash)) {
				totalNormalized += 0;
			} else {
				const score = scoreStore.getScore(hash);
				// Normalisiere Score von [-20, +10] auf [0, 1]
				const normalized = (score - MIN_SCORE) / SCORE_RANGE;
				totalNormalized += normalized;
			}
		}

		// Durchschnitt der normalisierten Werte als Prozent
		const percentage = (totalNormalized / training.questions.length) * 100;
		return Math.round(percentage);
	}

	function toggleImport() {
		showImport = !showImport;
		logger.action('HomePage', 'Click: Import Toggle', { showImport });
	}

	function canStart(): boolean {
		return configStore.selectedTrainings.length > 0;
	}

	function startTraining() {
		if (!canStart()) {
			logger.action('HomePage', 'Click: Training starten (blockiert - keine Auswahl)');
			return;
		}
		logger.action('HomePage', 'Click: Training starten', {
			selectedTrainings: configStore.selectedTrainings,
			questionCount: configStore.questionCount,
			order: configStore.order
		});
		const selected = getSelectedTrainings(configStore.selectedTrainings);
		trainingSessionStore.start(selected);
		goto(`${base}/training`);
	}

	function getCountLabel(count: number | 'all'): string {
		return count === 'all' ? 'Alle' : String(count);
	}
</script>

<main>
	<h1>Vokabeltrainer</h1>
	<p class="subtitle">Webbasierte Lernplattform mit Spaced Repetition</p>

	{#if urlImportMessage}
		<div class="url-import-message" class:success={urlImportMessage.type === 'success'} class:error={urlImportMessage.type === 'error'}>
			{urlImportMessage.text}
		</div>
	{/if}

	<section class="import-section">
		<button type="button" class="import-toggle" onclick={toggleImport}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="17 8 12 3 7 8" />
				<line x1="12" y1="3" x2="12" y2="15" />
			</svg>
			Training importieren
			<svg class="chevron" class:open={showImport} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</button>

		{#if showImport}
			<div class="import-content">
				<TrainingImportDropzone />
				<TrainingImportUrl />
			</div>
		{/if}
	</section>

	<ImportedTrainingsList />

	<section class="training-selection">
		<h2>Trainings auswählen</h2>

		<div class="training-list">
			{#each sortedTrainings as training (training.id)}
				<label class="training-item" class:selected={isSelected(training.id)} class:imported={training.source === 'imported'}>
					<input
						type="checkbox"
						checked={isSelected(training.id)}
						onchange={() => toggleTraining(training.id)}
					/>
					<span class="training-info">
						<span class="training-name">
							{#if training.source === 'imported'}
								<svg class="imported-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="17 8 12 3 7 8" />
									<line x1="12" y1="3" x2="12" y2="15" />
								</svg>
							{/if}
							{training.name}
						</span>
						<span class="training-meta">
							<span class="question-count">{getQuestionCount(training)} Fragen</span>
							<ScoreBadge percentage={getTrainingScore(training)} />
							<button
								class="browse-button"
								onclick={(e) => openBrowse(e, training)}
								title="Training durchstöbern"
								aria-label="Training durchstöbern"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
									<circle cx="12" cy="12" r="3"/>
								</svg>
							</button>
						</span>
					</span>
				</label>
			{/each}
		</div>
	</section>

	<section class="config-section">
		<div class="config-group">
			<h3>Anzahl</h3>
			<div class="radio-group">
				{#each questionCounts as count}
					<label class="radio-item">
						<input
							type="radio"
							name="questionCount"
							value={count}
							checked={configStore.questionCount === count}
							onchange={() => {
							logger.action('HomePage', 'Click: Anzahl geändert', { count });
							configStore.setQuestionCount(count);
						}}
						/>
						<span>{getCountLabel(count)}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="config-group">
			<h3>Reihenfolge</h3>
			<div class="radio-group">
				<label class="radio-item">
					<input
						type="radio"
						name="order"
						value="sequential"
						checked={configStore.order === 'sequential'}
						onchange={() => {
							logger.action('HomePage', 'Click: Reihenfolge geändert', { order: 'sequential' });
							configStore.setOrder('sequential');
						}}
					/>
					<span>Reihenfolge</span>
				</label>
				<label class="radio-item">
					<input
						type="radio"
						name="order"
						value="random"
						checked={configStore.order === 'random'}
						onchange={() => {
							logger.action('HomePage', 'Click: Reihenfolge geändert', { order: 'random' });
							configStore.setOrder('random');
						}}
					/>
					<span>Zufall</span>
				</label>
			</div>
		</div>
	</section>

	<button class="start-button" onclick={startTraining} disabled={!canStart()}>
		Training starten
	</button>
</main>

{#if browseTraining}
	<TrainingBrowseModal training={browseTraining} onClose={closeBrowse} />
{/if}

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.subtitle {
		color: #666;
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.url-import-message {
		padding: 0.75rem 1rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		text-align: center;
	}

	.url-import-message.success {
		background-color: #e8f5e9;
		color: #2e7d32;
		border: 1px solid #a5d6a7;
	}

	.url-import-message.error {
		background-color: #ffebee;
		color: #c62828;
		border: 1px solid #ef9a9a;
	}

	.import-section {
		margin-bottom: 1.5rem;
	}

	.import-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background-color: #f5f5f5;
		border: 1px solid var(--color-border, #ddd);
		border-radius: 0.5rem;
		cursor: pointer;
		font-size: 0.95rem;
		color: #555;
		transition: background-color 0.2s, border-color 0.2s;
	}

	.import-toggle:hover {
		background-color: #eeeeee;
		border-color: var(--color-primary, #1976d2);
	}

	.import-toggle .chevron {
		margin-left: auto;
		transition: transform 0.2s;
	}

	.import-toggle .chevron.open {
		transform: rotate(180deg);
	}

	.import-content {
		margin-top: 1rem;
		padding: 1rem;
		background-color: #fafafa;
		border: 1px solid var(--color-border, #ddd);
		border-radius: 0.5rem;
	}

	h2 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
		color: #555;
	}

	.training-selection {
		margin-bottom: 2rem;
	}

	.training-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.training-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		cursor: pointer;
		transition: border-color 0.2s, background-color 0.2s;
	}

	.training-item:hover {
		border-color: var(--color-primary);
	}

	.training-item.selected {
		border-color: var(--color-primary);
		background-color: #e3f2fd;
	}

	.training-item input[type='checkbox'] {
		width: 1.25rem;
		height: 1.25rem;
		cursor: pointer;
	}

	.training-info {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.training-name {
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.imported-icon {
		color: var(--color-primary, #1976d2);
		flex-shrink: 0;
	}

	.training-item.imported {
		border-style: dashed;
	}

	.training-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.875rem;
	}

	.question-count {
		color: #666;
	}

	.browse-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0;
		background: none;
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		cursor: pointer;
		color: #666;
		transition: border-color 0.2s, color 0.2s, background-color 0.2s;
	}

	.browse-button:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background-color: #f0f7ff;
	}

	.config-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding: 1rem;
		background-color: #f5f5f5;
		border-radius: 0.5rem;
	}

	.config-group {
		display: flex;
		flex-direction: column;
	}

	.radio-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.radio-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 2px solid var(--color-border);
		border-radius: 0.25rem;
		cursor: pointer;
		transition: border-color 0.2s, background-color 0.2s;
	}

	.radio-item:hover {
		border-color: var(--color-primary);
	}

	.radio-item:has(input:checked) {
		border-color: var(--color-primary);
		background-color: #e3f2fd;
	}

	.radio-item input[type='radio'] {
		width: 1rem;
		height: 1rem;
		cursor: pointer;
	}

	.start-button {
		width: 100%;
		padding: 1rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: white;
		background-color: var(--color-primary);
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s, opacity 0.2s;
	}

	.start-button:hover:not(:disabled) {
		opacity: 0.9;
	}

	.start-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
