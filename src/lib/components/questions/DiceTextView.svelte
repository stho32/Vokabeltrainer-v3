<script lang="ts">
	import type { DiceTextQuestion } from '$lib/types';
	import { normalizeAnswer } from '$lib/utils/answer-check';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: DiceTextQuestion;
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
	let placements = $state<Map<number, string>>(new Map()); // slotIndex → word
	let selectedWord = $state<string | null>(null);
	let selectedSource = $state<'pool' | number | null>(null); // 'pool' or slotIndex
	let wasCorrect = $state<boolean | null>(null);
	let shuffledPool = $state<string[]>([]);
	let slotRefs = $state<(HTMLButtonElement | undefined)[]>([]);
	let wordButtonRefs = $state<(HTMLButtonElement | undefined)[]>([]);

	// Track question hash to detect changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Parse text into words
	let words = $derived(question.text.split(/\s+/));

	// Get correct answers for hidden words (without punctuation)
	let correctAnswers = $derived(
		question.hiddenWords.map((i) => words[i]?.replace(/[.,!?;:]/g, '') || '')
	);

	// Build word pool: correct words + distractors, shuffled
	function buildWordPool(): string[] {
		const correct = question.hiddenWords.map((i) => words[i]?.replace(/[.,!?;:]/g, '') || '');
		const distractors = question.distractors || [];
		return shuffle([...correct, ...distractors]);
	}

	// Reset when question changes
	$effect(() => {
		const currentHash = question.text;
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;
			placements = new Map();
			selectedWord = null;
			selectedSource = null;
			wasCorrect = null;
			shuffledPool = buildWordPool();
			slotRefs = question.hiddenWords.map(() => undefined);
			wordButtonRefs = [];

			logger.state('DiceTextView', 'Neue Frage geladen', {
				hiddenWordCount: question.hiddenWords.length,
				distractorCount: question.distractors?.length || 0
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			placements = new Map();
			selectedWord = null;
			selectedSource = null;
			wasCorrect = null;
			shuffledPool = buildWordPool();
			logger.state('DiceTextView', 'Frage zurückgesetzt (Wiederholung)');
		}
		wasEvaluated = evaluated;

		// Focus first word button when ready
		if (!evaluated && wordButtonRefs.length > 0) {
			setTimeout(() => {
				const firstAvailable = availableWords[0];
				const idx = shuffledPool.indexOf(firstAvailable);
				if (idx >= 0 && wordButtonRefs[idx]) {
					wordButtonRefs[idx]?.focus();
				}
			}, 50);
		}
	});

	// Words still available in pool (not placed)
	let availableWords = $derived.by(() => {
		const placedWords = new Set(placements.values());
		return shuffledPool.filter((w) => !placedWords.has(w));
	});

	// All slots filled?
	let allSlotsFilled = $derived(placements.size === question.hiddenWords.length);

	function handleWordClick(word: string) {
		if (evaluated) return;

		if (selectedWord === word && selectedSource === 'pool') {
			// Deselect if clicking same word
			selectedWord = null;
			selectedSource = null;
			logger.action('DiceTextView', 'Wort abgewählt', { word });
		} else {
			// Select word from pool
			selectedWord = word;
			selectedSource = 'pool';
			logger.action('DiceTextView', 'Wort ausgewählt', { word });
		}
	}

	function handleSlotClick(slotIndex: number) {
		if (evaluated) return;

		const currentWord = placements.get(slotIndex);

		if (selectedWord !== null) {
			// We have a word selected
			if (selectedSource === 'pool') {
				// Place word from pool into slot
				if (currentWord) {
					// Slot already has a word - it goes back to pool (implicitly via availableWords)
				}
				placements.set(slotIndex, selectedWord);
				placements = new Map(placements);
				logger.action('DiceTextView', 'Wort platziert', {
					word: selectedWord,
					slotIndex
				});
				selectedWord = null;
				selectedSource = null;
			} else if (typeof selectedSource === 'number') {
				// Moving word from another slot
				if (currentWord) {
					// Swap words between slots
					placements.set(selectedSource, currentWord);
				} else {
					// Move word to empty slot
					placements.delete(selectedSource);
				}
				placements.set(slotIndex, selectedWord);
				placements = new Map(placements);
				logger.action('DiceTextView', 'Wort verschoben', {
					word: selectedWord,
					fromSlot: selectedSource,
					toSlot: slotIndex
				});
				selectedWord = null;
				selectedSource = null;
			}
		} else {
			// No word selected
			if (currentWord) {
				// Select word from this slot
				selectedWord = currentWord;
				selectedSource = slotIndex;
				logger.action('DiceTextView', 'Wort in Lücke ausgewählt', {
					word: currentWord,
					slotIndex
				});
			}
		}
	}

	function handleRemoveFromSlot(slotIndex: number) {
		if (evaluated) return;

		const word = placements.get(slotIndex);
		if (word) {
			placements.delete(slotIndex);
			placements = new Map(placements);
			selectedWord = null;
			selectedSource = null;
			logger.action('DiceTextView', 'Wort entfernt', { word, slotIndex });
		}
	}

	function checkSlot(slotIndex: number): boolean {
		const placed = placements.get(slotIndex);
		const correct = correctAnswers[slotIndex];
		if (!placed || !correct) return false;
		return normalizeAnswer(placed) === normalizeAnswer(correct);
	}

	function handleSubmit() {
		if (evaluated) return;

		// Check all slots
		let allCorrect = true;
		for (let i = 0; i < question.hiddenWords.length; i++) {
			if (!checkSlot(i)) {
				allCorrect = false;
			}
		}

		wasCorrect = allCorrect;

		const correctCount = question.hiddenWords.filter((_, i) => checkSlot(i)).length;
		logger.action('DiceTextView', 'handleSubmit', {
			correctCount,
			totalCount: question.hiddenWords.length,
			isCorrect: allCorrect
		});

		onSubmit(allCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (evaluated) return;

		// 1-9 for words in pool
		if (event.key >= '1' && event.key <= '9') {
			const index = parseInt(event.key) - 1;
			if (index < availableWords.length) {
				event.preventDefault();
				logger.action('DiceTextView', 'Keyboard: Zifferntaste', { key: event.key });
				handleWordClick(availableWords[index]);
			}
		}

		// a-z for slots (when word is selected)
		if (event.key >= 'a' && event.key <= 'z' && selectedWord !== null) {
			const index = event.key.charCodeAt(0) - 97;
			if (index < question.hiddenWords.length) {
				event.preventDefault();
				logger.action('DiceTextView', 'Keyboard: Buchstabentaste', { key: event.key });
				handleSlotClick(index);
			}
		}

		// Enter to submit
		if (event.key === 'Enter') {
			event.preventDefault();
			logger.action('DiceTextView', 'Keyboard: Enter (Submit)');
			handleSubmit();
		}

		// Escape to deselect
		if (event.key === 'Escape' && selectedWord !== null) {
			event.preventDefault();
			selectedWord = null;
			selectedSource = null;
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

	// Get the hidden index for a word position
	function getHiddenIndex(wordIndex: number): number {
		return question.hiddenWords.indexOf(wordIndex);
	}

	function getPunctuation(word: string): string {
		const cleanWord = word.replace(/[.,!?;:]/g, '');
		return word.slice(cleanWord.length);
	}

	function getSlotClass(slotIndex: number): string {
		const placed = placements.get(slotIndex);
		const isSelected = selectedSource === slotIndex;
		const isTargetable = selectedWord !== null && selectedSource !== slotIndex;

		if (evaluated) {
			return placed ? (checkSlot(slotIndex) ? 'correct' : 'wrong') : 'empty';
		}

		let classes = placed ? 'filled' : 'empty';
		if (isSelected) classes += ' selected';
		if (isTargetable) classes += ' targetable';
		return classes;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="dice-text-question">
	<div class="question">
		{@html question.question}
	</div>

	<div class="hint">
		{#if selectedWord !== null}
			Wähle eine Lücke ({#if question.hiddenWords.length <= 26}a-{String.fromCharCode(
					96 + question.hiddenWords.length
				)}{:else}klicken{/if})
		{:else if availableWords.length > 0}
			Wähle ein Wort (1-{Math.min(9, availableWords.length)})
		{:else if allSlotsFilled}
			Alle Lücken gefüllt – Enter zum Abschicken
		{:else}
			Wähle ein Wort aus der Box
		{/if}
	</div>

	<div class="dice-text">
		{#each words as word, i}
			{#if question.hiddenWords.includes(i)}
				{@const slotIndex = getHiddenIndex(i)}
				{@const punctuation = getPunctuation(word)}
				{@const placedWord = placements.get(slotIndex)}
				<button
					bind:this={slotRefs[slotIndex]}
					class="slot {getSlotClass(slotIndex)}"
					onclick={() => handleSlotClick(slotIndex)}
					disabled={evaluated}
					title={evaluated && !checkSlot(slotIndex)
						? `Richtig: ${correctAnswers[slotIndex]}`
						: ''}
				>
					{#if placedWord}
						{placedWord}
						{#if !evaluated && selectedSource !== slotIndex}
							<span
								class="remove-btn"
								role="button"
								tabindex="-1"
								onclick={(e) => {
									e.stopPropagation();
									handleRemoveFromSlot(slotIndex);
								}}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.stopPropagation();
										handleRemoveFromSlot(slotIndex);
									}
								}}
							>
								×
							</span>
						{/if}
					{:else}
						<span class="slot-key">{String.fromCharCode(97 + slotIndex)}</span>
						<span class="placeholder">___</span>
					{/if}
				</button>{#if punctuation}<span class="punctuation">{punctuation}</span>{/if}
				{#if evaluated && !checkSlot(slotIndex)}
					<span class="correct-word">({correctAnswers[slotIndex]})</span>
				{/if}
			{:else}
				<span class="visible-word">{word}</span>
			{/if}
			{' '}
		{/each}
	</div>

	{#if availableWords.length > 0 || !evaluated}
		<div class="word-pool">
			<h4>Wörter:</h4>
			<div class="words">
				{#each shuffledPool as word, poolIndex}
					{@const isAvailable = availableWords.includes(word)}
					{@const isSelected = selectedWord === word && selectedSource === 'pool'}
					{@const poolPosition = availableWords.indexOf(word)}
					{#if isAvailable}
						<button
							bind:this={wordButtonRefs[poolIndex]}
							class="word-chip"
							class:selected={isSelected}
							onclick={() => handleWordClick(word)}
							disabled={evaluated}
						>
							{#if poolPosition < 9}
								<span class="key-hint">{poolPosition + 1}</span>
							{/if}
							{word}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if evaluated}
		<div class="result-banner" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			{#if wasCorrect}
				✓ Richtig – Alle Wörter korrekt platziert
			{:else}
				{@const correctCount = question.hiddenWords.filter((_, i) => checkSlot(i)).length}
				✗ Falsch – {correctCount} von {question.hiddenWords.length} Wörtern richtig
			{/if}
		</div>
	{/if}

	{#if revealed && !evaluated}
		<div class="revealed-answers">
			<strong>Richtige Antworten:</strong>
			{correctAnswers.join(', ')}
		</div>
	{/if}
</div>

<style>
	.dice-text-question {
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

	.dice-text {
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
		line-height: 2.8;
		font-size: 1.125rem;
	}

	.visible-word {
		display: inline;
	}

	.punctuation {
		font-family: inherit;
	}

	.slot {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		min-width: 4rem;
		font-size: 1rem;
		font-family: inherit;
		border: 2px dashed var(--color-border);
		border-radius: 0.375rem;
		background: white;
		cursor: pointer;
		transition: all 0.15s ease;
		vertical-align: middle;
	}

	.slot:hover:not(:disabled) {
		border-color: var(--color-primary);
		background-color: #f0f7ff;
	}

	.slot:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.slot.filled {
		border-style: solid;
		background-color: #e0f2fe;
	}

	.slot.selected {
		border-color: var(--color-primary);
		background-color: #bae6fd;
		border-style: solid;
	}

	.slot.targetable {
		border-color: var(--color-primary);
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			background-color: white;
		}
		50% {
			background-color: #f0f7ff;
		}
	}

	.slot.correct {
		background-color: #e8f5e9;
		border-color: var(--color-success);
		border-style: solid;
		color: var(--color-success);
	}

	.slot.wrong {
		background-color: #ffebee;
		border-color: var(--color-error);
		border-style: solid;
		color: var(--color-error);
	}

	.slot:disabled {
		cursor: default;
	}

	.slot-key {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		height: 1.25rem;
		font-size: 0.7rem;
		font-weight: 600;
		background-color: var(--color-border);
		border-radius: 0.25rem;
		color: #666;
	}

	.placeholder {
		color: #999;
	}

	.remove-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		font-size: 1rem;
		font-weight: bold;
		color: #666;
		cursor: pointer;
		border-radius: 50%;
		margin-left: 0.25rem;
	}

	.remove-btn:hover {
		background-color: rgba(0, 0, 0, 0.1);
		color: var(--color-error);
	}

	.correct-word {
		font-size: 0.85rem;
		color: var(--color-success);
		font-weight: 600;
		margin-left: 0.25rem;
	}

	.word-pool {
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
	}

	.word-pool h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.875rem;
		color: #666;
	}

	.words {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.word-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		font-family: inherit;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		background: white;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.word-chip:hover:not(:disabled) {
		border-color: var(--color-primary);
		background-color: #f0f7ff;
	}

	.word-chip:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.word-chip.selected {
		border-color: var(--color-primary);
		background-color: #e0f2fe;
	}

	.word-chip:disabled {
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
</style>
