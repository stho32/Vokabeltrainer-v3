<script lang="ts">
	import type { MatchingQuestion } from '$lib/types';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: MatchingQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	// Shuffle helper
	function shuffle<T>(array: T[]): T[] {
		const result = [...array];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}

	// State
	let shuffledRight = $state<{ text: string; originalIndex: number }[]>([]);
	let selectedLeft = $state<number | null>(null);
	let connections = $state<Map<number, number>>(new Map()); // leftIndex → shuffledRightIndex
	let wasCorrect = $state<boolean | null>(null);
	let leftButtonRefs = $state<(HTMLButtonElement | undefined)[]>([]);

	// Track question hash to detect question changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Reset when question changes
	$effect(() => {
		const currentHash = JSON.stringify(question.pairs);
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;
			shuffledRight = shuffle(
				question.pairs.map((p, i) => ({ text: p.right, originalIndex: i }))
			);
			selectedLeft = null;
			connections = new Map();
			wasCorrect = null;
			leftButtonRefs = question.pairs.map(() => undefined);
			logger.state('MatchingView', 'Neue Frage geladen', {
				pairCount: question.pairs.length
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			shuffledRight = shuffle(
				question.pairs.map((p, i) => ({ text: p.right, originalIndex: i }))
			);
			selectedLeft = null;
			connections = new Map();
			wasCorrect = null;
			logger.state('MatchingView', 'Frage zurückgesetzt (Wiederholung)');
		}
		wasEvaluated = evaluated;

		// Focus first left button when question is ready for answering
		if (!evaluated && leftButtonRefs[0]) {
			leftButtonRefs[0].focus();
		}
	});

	function handleLeftClick(index: number) {
		if (evaluated) return;
		selectedLeft = index;
		logger.action('MatchingView', 'Linker Begriff ausgewählt', {
			index,
			text: question.pairs[index].left
		});
	}

	function handleRightClick(shuffledIndex: number) {
		if (evaluated || selectedLeft === null) return;

		// Remove any existing connection to this right item
		for (const [left, right] of connections) {
			if (right === shuffledIndex) {
				connections.delete(left);
			}
		}

		connections.set(selectedLeft, shuffledIndex);
		connections = new Map(connections); // Trigger reactivity

		logger.action('MatchingView', 'Verbindung erstellt', {
			leftIndex: selectedLeft,
			leftText: question.pairs[selectedLeft].left,
			rightText: shuffledRight[shuffledIndex].text
		});

		selectedLeft = null;
	}

	function handleSubmit() {
		if (evaluated) return;

		// Check all connections
		let allCorrect = true;
		for (let i = 0; i < question.pairs.length; i++) {
			const connectedShuffledIndex = connections.get(i);
			if (connectedShuffledIndex === undefined) {
				allCorrect = false;
				break;
			}
			if (shuffledRight[connectedShuffledIndex].originalIndex !== i) {
				allCorrect = false;
			}
		}

		wasCorrect = allCorrect;
		logger.action('MatchingView', 'handleSubmit', {
			connectionCount: connections.size,
			pairCount: question.pairs.length,
			isCorrect: allCorrect
		});
		onSubmit(allCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (evaluated) return;

		// 1-9 for left column
		if (event.key >= '1' && event.key <= '9') {
			const index = parseInt(event.key) - 1;
			if (index < question.pairs.length) {
				event.preventDefault();
				logger.action('MatchingView', 'Keyboard: Zifferntaste', { key: event.key });
				handleLeftClick(index);
			}
		}

		// a-i for right column (when left is selected)
		if (event.key >= 'a' && event.key <= 'i' && selectedLeft !== null) {
			const index = event.key.charCodeAt(0) - 97;
			if (index < shuffledRight.length) {
				event.preventDefault();
				logger.action('MatchingView', 'Keyboard: Buchstabentaste', { key: event.key });
				handleRightClick(index);
			}
		}

		// Enter or Ctrl+Enter to submit
		if (event.key === 'Enter') {
			event.preventDefault();
			logger.action('MatchingView', 'Keyboard: Enter (Submit)');
			handleSubmit();
		}

		// Escape to deselect
		if (event.key === 'Escape' && selectedLeft !== null) {
			event.preventDefault();
			selectedLeft = null;
		}
	}

	// Listen for external submit trigger
	function handleTriggerSubmit() {
		if (!evaluated) {
			handleSubmit();
		}
	}

	$effect(() => {
		window.addEventListener('trigger-submit', handleTriggerSubmit);
		return () => window.removeEventListener('trigger-submit', handleTriggerSubmit);
	});

	function getLeftButtonClass(index: number): string {
		if (!evaluated) {
			const isSelected = selectedLeft === index;
			const isConnected = connections.has(index);
			if (isSelected) return 'selected';
			if (isConnected) return 'connected';
			return '';
		}

		// After evaluation
		const connectedShuffledIndex = connections.get(index);
		if (connectedShuffledIndex === undefined) return 'wrong';
		const isCorrect = shuffledRight[connectedShuffledIndex].originalIndex === index;
		return isCorrect ? 'correct' : 'wrong';
	}

	function getRightButtonClass(shuffledIndex: number): string {
		if (!evaluated) {
			// Check if this right item is connected
			for (const [, right] of connections) {
				if (right === shuffledIndex) return 'connected';
			}
			return '';
		}

		// After evaluation - find if this right item is connected
		for (const [leftIndex, right] of connections) {
			if (right === shuffledIndex) {
				const isCorrect = shuffledRight[shuffledIndex].originalIndex === leftIndex;
				return isCorrect ? 'correct' : 'wrong';
			}
		}
		return '';
	}

	// Get the connection marker for right column
	function getConnectionMarker(shuffledIndex: number): string | null {
		for (const [leftIndex, right] of connections) {
			if (right === shuffledIndex) {
				return String(leftIndex + 1);
			}
		}
		return null;
	}

	let allConnected = $derived(connections.size === question.pairs.length);
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="matching-question">
	<div class="question">
		{@html question.question}
	</div>

	<div class="hint">
		{#if selectedLeft !== null}
			Wähle einen Begriff rechts (a-{String.fromCharCode(96 + shuffledRight.length)})
		{:else}
			Wähle einen Begriff links (1-{question.pairs.length})
		{/if}
	</div>

	<div class="matching-container">
		<div class="column left-column">
			{#each question.pairs as pair, i}
				<button
					bind:this={leftButtonRefs[i]}
					class="match-button {getLeftButtonClass(i)}"
					onclick={() => handleLeftClick(i)}
					disabled={evaluated}
				>
					<span class="key-hint">{i + 1}</span>
					<span class="text">{pair.left}</span>
					{#if connections.has(i)}
						<span class="connection-indicator">→</span>
					{/if}
				</button>
			{/each}
		</div>

		<div class="column right-column">
			{#each shuffledRight as item, i}
				{@const marker = getConnectionMarker(i)}
				<button
					class="match-button {getRightButtonClass(i)}"
					onclick={() => handleRightClick(i)}
					disabled={evaluated || selectedLeft === null}
				>
					<span class="key-hint">{String.fromCharCode(97 + i)}</span>
					<span class="text">{item.text}</span>
					{#if marker}
						<span class="connection-marker">{marker}</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	{#if evaluated}
		<div class="result-banner" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			{#if wasCorrect}
				✓ Richtig – Alle Paare korrekt zugeordnet
			{:else}
				{@const correctCount = [...connections].filter(
					([left, right]) => shuffledRight[right].originalIndex === left
				).length}
				✗ Falsch – {correctCount} von {question.pairs.length} Paaren richtig
			{/if}
		</div>
	{/if}

	{#if revealed && !evaluated}
		<div class="revealed-answers">
			<strong>Richtige Zuordnungen:</strong>
			<ul>
				{#each question.pairs as pair}
					<li>{pair.left} → {pair.right}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.matching-question {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.question {
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.hint {
		font-size: 0.875rem;
		color: #666;
		padding: 0.5rem;
		background-color: #f0f7ff;
		border-radius: 0.25rem;
		text-align: center;
	}

	.matching-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.match-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		background: white;
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: left;
	}

	.match-button:hover:not(:disabled) {
		border-color: var(--color-primary);
		background-color: #f0f7ff;
	}

	.match-button:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.match-button.selected {
		border-color: var(--color-primary);
		background-color: #e0f2fe;
	}

	.match-button.connected {
		border-color: #9ca3af;
		background-color: #f3f4f6;
	}

	.match-button.correct {
		border-color: var(--color-success);
		background-color: #e8f5e9;
	}

	.match-button.wrong {
		border-color: var(--color-error);
		background-color: #ffebee;
	}

	.match-button:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}

	.key-hint {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5rem;
		height: 1.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		background-color: var(--color-border);
		border-radius: 0.25rem;
		color: #666;
		flex-shrink: 0;
	}

	.text {
		flex: 1;
	}

	.connection-indicator {
		color: var(--color-primary);
		font-weight: bold;
	}

	.connection-marker {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		background-color: var(--color-primary);
		border-radius: 50%;
		color: white;
		flex-shrink: 0;
	}

	.result-banner {
		padding: 1rem;
		border-radius: 0.5rem;
		font-weight: 600;
		text-align: center;
	}

	.result-banner.correct {
		background-color: #e8f5e9;
		color: var(--color-success);
	}

	.result-banner.wrong {
		background-color: #ffebee;
		color: var(--color-error);
	}

	.revealed-answers {
		padding: 1rem;
		background-color: #e8f5e9;
		border-left: 4px solid var(--color-success);
		border-radius: 0.25rem;
	}

	.revealed-answers ul {
		margin: 0.5rem 0 0 0;
		padding-left: 1.5rem;
	}
</style>
