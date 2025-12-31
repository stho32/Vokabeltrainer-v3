<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { configStore } from '$lib/stores/config.svelte';
	import { scoreStore } from '$lib/stores/scores.svelte';
	import { trainingSessionStore } from '$lib/stores/training-session.svelte';
	import { trainings, getTrainingsSorted, getSelectedTrainings } from '$lib/data/trainings';
	import { hashQuestion } from '$lib/utils/hash';
	import { logger } from '$lib/utils/logger';
	import ScoreBadge from '$lib/components/ScoreBadge.svelte';

	logger.info('HomePage', 'Seite geladen');

	const sortedTrainings = getTrainingsSorted();

	const questionCounts: (number | 'all')[] = [5, 30, 45, 100, 'all'];

	function isSelected(trainingId: string): boolean {
		return configStore.selectedTrainings.includes(trainingId);
	}

	function toggleTraining(trainingId: string) {
		logger.action('HomePage', 'Click: Training Toggle', { trainingId });
		configStore.toggleTraining(trainingId);
	}

	function getQuestionCount(trainingId: string): number {
		const training = trainings.find((t) => t.id === trainingId);
		return training?.questions.length ?? 0;
	}

	function getTrainingScore(trainingId: string): number {
		const training = trainings.find((t) => t.id === trainingId);
		if (!training || training.questions.length === 0) return 100;

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

	<section class="training-selection">
		<h2>Trainings auswählen</h2>

		<div class="training-list">
			{#each sortedTrainings as training}
				<label class="training-item" class:selected={isSelected(training.id)}>
					<input
						type="checkbox"
						checked={isSelected(training.id)}
						onchange={() => toggleTraining(training.id)}
					/>
					<span class="training-info">
						<span class="training-name">{training.name}</span>
						<span class="training-meta">
							<span class="question-count">{getQuestionCount(training.id)} Fragen</span>
							<ScoreBadge percentage={getTrainingScore(training.id)} />
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
		margin-bottom: 2rem;
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
