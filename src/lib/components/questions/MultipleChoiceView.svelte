<script lang="ts">
	import type { MultipleChoiceQuestion, MultipleChoiceOption } from '$lib/types';
	import { shuffle } from '$lib/utils/shuffle';
	import { checkMultipleChoice } from '$lib/utils/answer-check';

	interface Props {
		question: MultipleChoiceQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	interface ShuffledOption extends MultipleChoiceOption {
		originalIndex: number;
	}

	let shuffledOptions = $state<ShuffledOption[]>([]);
	let selected = $state<number[]>([]);

	// Shuffle options when question changes
	$effect(() => {
		shuffledOptions = shuffle(
			question.options.map((opt, i) => ({ ...opt, originalIndex: i }))
		);
		selected = [];
	});

	function toggleOption(index: number) {
		if (evaluated) return;
		const idx = selected.indexOf(index);
		if (idx === -1) {
			selected = [...selected, index];
		} else {
			selected = selected.filter((i) => i !== index);
		}
	}

	function handleSubmit() {
		if (evaluated) return;
		const correctIndices = shuffledOptions
			.map((opt, i) => (opt.correct ? i : -1))
			.filter((i) => i !== -1);
		const isCorrect = checkMultipleChoice(selected, correctIndices);
		onSubmit(isCorrect);
	}

	// Keyboard: 1-9 toggle options (R00007)
	function handleKeydown(event: KeyboardEvent) {
		if (event.key >= '1' && event.key <= '9') {
			const index = parseInt(event.key) - 1;
			if (index < shuffledOptions.length) {
				event.preventDefault();
				toggleOption(index);
			}
		}
		if (event.key === 'Enter' && !event.ctrlKey) {
			event.preventDefault();
			handleSubmit();
		}
	}

	function getOptionClass(option: ShuffledOption, index: number): string {
		if (!evaluated) return '';
		if (option.correct) return 'correct';
		if (selected.includes(index) && !option.correct) return 'incorrect';
		return '';
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="multiple-choice">
	<div class="question">
		{@html question.question}
	</div>

	<div class="options">
		{#each shuffledOptions as option, i}
			<label class="option {getOptionClass(option, i)}">
				<input
					type="checkbox"
					checked={selected.includes(i)}
					onchange={() => toggleOption(i)}
					disabled={evaluated}
				/>
				<span class="number">{i + 1}.</span>
				<span class="text">{option.text}</span>

				{#if evaluated && option.explanation}
					<span class="explanation">{option.explanation}</span>
				{/if}
			</label>
		{/each}
	</div>

	<p class="hint">Drücke 1-{shuffledOptions.length} um Optionen auszuwählen</p>
</div>

<style>
	.multiple-choice {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.question {
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.option {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.75rem;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		cursor: pointer;
		transition: border-color 0.2s, background-color 0.2s;
	}

	.option:hover:not(.correct):not(.incorrect) {
		border-color: var(--color-primary);
	}

	.option input[type='checkbox'] {
		margin-top: 0.25rem;
		width: 1.25rem;
		height: 1.25rem;
		cursor: pointer;
	}

	.option input[type='checkbox']:disabled {
		cursor: not-allowed;
	}

	.option .number {
		font-weight: bold;
		color: var(--color-primary);
		min-width: 1.5rem;
	}

	.option .text {
		flex: 1;
	}

	.option .explanation {
		display: block;
		width: 100%;
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--color-border);
		font-size: 0.9rem;
		font-style: italic;
		color: #666;
	}

	.option.correct {
		background-color: #e8f5e9;
		border-color: var(--color-success);
	}

	.option.incorrect {
		background-color: #ffebee;
		border-color: var(--color-error);
	}

	.hint {
		font-size: 0.85rem;
		color: #666;
		text-align: center;
	}
</style>
