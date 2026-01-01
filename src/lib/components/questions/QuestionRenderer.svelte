<script lang="ts">
	import type { Question } from '$lib/types';
	import { logger } from '$lib/utils/logger';
	import TextQuestionView from './TextQuestionView.svelte';
	import MultipleChoiceView from './MultipleChoiceView.svelte';
	import TrueFalseView from './TrueFalseView.svelte';
	import DiceTextView from './DiceTextView.svelte';
	import MatchingView from './MatchingView.svelte';
	import CategorizationView from './CategorizationView.svelte';
	import WordSearchView from './WordSearchView.svelte';

	interface Props {
		question: Question;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	$effect(() => {
		logger.debug('QuestionRenderer', 'Rendering Frage', {
			type: question.type,
			revealed,
			evaluated
		});
	});
</script>

<div class="question-renderer">
	{#if question.type === 'text'}
		<TextQuestionView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'multiple-choice'}
		<MultipleChoiceView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'true-false'}
		<TrueFalseView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'dice-text'}
		<DiceTextView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'matching'}
		<MatchingView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'categorization'}
		<CategorizationView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'word-search'}
		<WordSearchView {question} {revealed} {evaluated} {onSubmit} />
	{/if}
</div>

<style>
	.question-renderer {
		width: 100%;
	}
</style>
