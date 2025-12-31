<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { trainingSessionStore } from '$lib/stores/training-session.svelte';
	import { scoreStore } from '$lib/stores/scores.svelte';
	import QuestionRenderer from '$lib/components/questions/QuestionRenderer.svelte';
	import FlashOverlay from '$lib/components/FlashOverlay.svelte';

	// Redirect to home if no active session
	$effect(() => {
		if (browser && !trainingSessionStore.isActive && !trainingSessionStore.isComplete) {
			goto('/');
		}
	});

	function handleSubmit(isCorrect: boolean) {
		trainingSessionStore.evaluate(isCorrect);

		// Auto-advance after 1s on correct answer
		if (isCorrect) {
			setTimeout(() => {
				trainingSessionStore.next();
			}, 1000);
		}
	}

	function handleReveal() {
		trainingSessionStore.revealAnswer();
	}

	function handleNext() {
		trainingSessionStore.next();
	}

	function handleBackToSelection() {
		trainingSessionStore.end();
		goto('/');
	}

	function getCurrentAPS(): number {
		return scoreStore.getScore(trainingSessionStore.currentHash);
	}

	// Keyboard handler for Ctrl+Enter to submit
	function handleKeydown(event: KeyboardEvent) {
		// Ctrl+Enter is handled by question components for text
		// Enter is handled by question components for MC
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<FlashOverlay type={trainingSessionStore.lastResult} />

<main>
	{#if trainingSessionStore.isComplete}
		<!-- Completion Screen -->
		<div class="completion">
			<h1>SEHR GUT!</h1>
			<div class="stats">
				<div class="stat correct">
					<span class="label">Richtig</span>
					<span class="value">{trainingSessionStore.correctCount}</span>
				</div>
				<div class="stat wrong">
					<span class="label">Falsch</span>
					<span class="value">{trainingSessionStore.wrongCount}</span>
				</div>
			</div>
			<button class="back-button" onclick={handleBackToSelection}>
				Zurück zur Auswahl
			</button>
		</div>
	{:else if trainingSessionStore.currentQuestion}
		<!-- Training Session -->
		<header class="training-header">
			<h1 class="training-name">{trainingSessionStore.name}</h1>
			<div class="training-meta">
				<span class="position">{trainingSessionStore.position} / {trainingSessionStore.total}</span>
				<span class="aps">[APS: {getCurrentAPS()}]</span>
			</div>
		</header>

		<div class="question-container">
			<QuestionRenderer
				question={trainingSessionStore.currentQuestion}
				revealed={trainingSessionStore.isRevealed}
				evaluated={trainingSessionStore.isEvaluated}
				onSubmit={handleSubmit}
			/>
		</div>

		<div class="controls">
			{#if !trainingSessionStore.isEvaluated}
				<button class="reveal-button" onclick={handleReveal} disabled={trainingSessionStore.isRevealed}>
					Antwort anzeigen
				</button>
				<button class="submit-button" onclick={() => handleSubmit(false)}>
					Antworten!
				</button>
			{:else if trainingSessionStore.lastResult === 'wrong'}
				<button class="next-button" onclick={handleNext}>
					Weiter
				</button>
			{/if}
		</div>

		<p class="hint">Drücke <kbd>Strg</kbd>+<kbd>Enter</kbd> zum Antworten</p>
	{:else}
		<!-- Loading or error state -->
		<div class="loading">
			<p>Lade Training...</p>
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 700px;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* Completion Screen */
	.completion {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 2rem;
	}

	.completion h1 {
		font-size: 3rem;
		color: var(--color-success);
	}

	.stats {
		display: flex;
		gap: 3rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.stat .label {
		font-size: 1.25rem;
		color: #666;
	}

	.stat .value {
		font-size: 3rem;
		font-weight: bold;
	}

	.stat.correct .value {
		color: var(--color-success);
	}

	.stat.wrong .value {
		color: var(--color-error);
	}

	.back-button {
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: white;
		background-color: var(--color-primary);
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.back-button:hover {
		opacity: 0.9;
	}

	/* Training Header */
	.training-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid var(--color-border);
	}

	.training-name {
		font-size: 1.5rem;
		margin: 0;
	}

	.training-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1rem;
	}

	.position {
		font-weight: 600;
	}

	.aps {
		padding: 0.25rem 0.5rem;
		background-color: #f5f5f5;
		border-radius: 0.25rem;
		font-family: monospace;
	}

	/* Question Container */
	.question-container {
		flex: 1;
		margin-bottom: 2rem;
	}

	/* Controls */
	.controls {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.controls button {
		flex: 1;
		padding: 1rem;
		font-size: 1rem;
		font-weight: 600;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.controls button:hover:not(:disabled) {
		opacity: 0.9;
	}

	.controls button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.reveal-button {
		background-color: #f5f5f5;
		color: #333;
		border: 2px solid var(--color-border) !important;
	}

	.submit-button {
		background-color: var(--color-primary);
		color: white;
	}

	.next-button {
		background-color: var(--color-success);
		color: white;
	}

	.hint {
		text-align: center;
		color: #666;
		font-size: 0.875rem;
	}

	.hint kbd {
		padding: 0.125rem 0.375rem;
		background-color: #eee;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		font-family: monospace;
		font-size: 0.8rem;
	}

	/* Loading */
	.loading {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
