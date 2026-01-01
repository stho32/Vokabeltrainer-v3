<script lang="ts">
	import type { Question } from '$lib/types';

	interface Props {
		question: Question;
		index: number;
	}

	let { question, index }: Props = $props();

	function getAnswerDisplay(answer: string | string[]): string {
		if (Array.isArray(answer)) {
			return answer.join(' / ');
		}
		return answer;
	}

	function renderDiceText(text: string, hiddenWords: number[]): { word: string; hidden: boolean }[] {
		const words = text.split(/\s+/);
		return words.map((word, i) => ({
			word,
			hidden: hiddenWords.includes(i)
		}));
	}
</script>

<article class="question-card">
	<header class="question-header">
		<span class="question-number">{index + 1}</span>
		<span class="question-type">
			{#if question.type === 'text'}
				Textfrage
			{:else if question.type === 'multiple-choice'}
				Multiple Choice
			{:else if question.type === 'dice-text'}
				Würfeltext
			{:else if question.type === 'word-search'}
				Wortsuchrätsel
			{:else if question.type === 'true-false'}
				Wahr/Falsch
			{:else if question.type === 'matching'}
				Zuordnung
			{:else if question.type === 'categorization'}
				Kategorisierung
			{/if}
		</span>
	</header>

	<div class="question-content">
		{#if question.type === 'text'}
			<p class="question-text">{question.question}</p>
			<div class="answer-section">
				<span class="answer-label">Antwort:</span>
				<span class="answer-value">{getAnswerDisplay(question.answer)}</span>
			</div>
		{:else if question.type === 'multiple-choice'}
			<p class="question-text">{question.question}</p>
			<ul class="options-list">
				{#each question.options as option, i}
					<li class="option-item" class:correct={option.correct}>
						<span class="option-marker">{String.fromCharCode(65 + i)}</span>
						<span class="option-text">{option.text}</span>
						{#if option.correct}
							<span class="correct-badge">Richtig</span>
						{/if}
						{#if option.explanation}
							<p class="option-explanation">{option.explanation}</p>
						{/if}
					</li>
				{/each}
			</ul>
		{:else if question.type === 'dice-text'}
			<p class="question-text">{question.question}</p>
			<div class="dice-text">
				{#each renderDiceText(question.text, question.hiddenWords) as { word, hidden }}
					<span class:hidden-word={hidden}>{word}</span>{' '}
				{/each}
			</div>
		{:else if question.type === 'word-search'}
			<p class="question-title">{question.title}</p>
			<p class="question-text">{question.question}</p>
			<div class="answer-section">
				<span class="answer-label">Antwort:</span>
				<span class="answer-value">{question.answer}</span>
			</div>
		{:else if question.type === 'true-false'}
			<p class="question-text">{question.question}</p>
			<div class="statement-section">
				<span class="statement-text">{question.statement}</span>
			</div>
			<div class="answer-section">
				<span class="answer-label">Antwort:</span>
				<span class="answer-value">{question.correct ? 'Wahr' : 'Falsch'}</span>
			</div>
			{#if question.explanation}
				<div class="explanation-section">
					<span class="explanation-label">Erklärung:</span>
					<span class="explanation-text">{question.explanation}</span>
				</div>
			{/if}
		{:else if question.type === 'matching'}
			<p class="question-text">{question.question}</p>
			<div class="pairs-list">
				{#each question.pairs as pair, i}
					<div class="pair-item">
						<span class="pair-left">{pair.left}</span>
						<span class="pair-arrow">→</span>
						<span class="pair-right">{pair.right}</span>
					</div>
				{/each}
			</div>
		{:else if question.type === 'categorization'}
			<p class="question-text">{question.question}</p>
			<div class="categories-list">
				{#each question.categories as category}
					<div class="category-item">
						<span class="category-name">{category.name}:</span>
						<span class="category-items">{category.items.join(', ')}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</article>

<style>
	.question-card {
		background: white;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.question-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.question-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.question-type {
		font-size: 0.75rem;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.question-content {
		font-size: 0.9375rem;
	}

	.question-text {
		margin: 0 0 0.75rem 0;
		line-height: 1.5;
	}

	.question-title {
		margin: 0 0 0.25rem 0;
		font-weight: 600;
	}

	.answer-section {
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem;
		background: #f0f7f0;
		border-radius: 0.25rem;
		border-left: 3px solid var(--color-success);
	}

	.answer-label {
		font-weight: 500;
		color: #666;
	}

	.answer-value {
		color: var(--color-success);
		font-weight: 500;
	}

	.options-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.option-item {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.5rem;
		background: #f8f9fa;
		border-radius: 0.25rem;
		border: 1px solid var(--color-border);
	}

	.option-item.correct {
		background: #f0f7f0;
		border-color: var(--color-success);
	}

	.option-marker {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		background: var(--color-border);
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.option-item.correct .option-marker {
		background: var(--color-success);
		color: white;
	}

	.option-text {
		flex: 1;
		min-width: 0;
	}

	.correct-badge {
		font-size: 0.75rem;
		padding: 0.125rem 0.375rem;
		background: var(--color-success);
		color: white;
		border-radius: 0.25rem;
		flex-shrink: 0;
	}

	.option-explanation {
		width: 100%;
		margin: 0.25rem 0 0 0;
		padding-left: 2rem;
		font-size: 0.875rem;
		color: #666;
		font-style: italic;
	}

	.dice-text {
		padding: 0.75rem;
		background: #f8f9fa;
		border-radius: 0.25rem;
		line-height: 1.8;
	}

	.hidden-word {
		background: var(--color-primary);
		color: white;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	.statement-section {
		padding: 0.75rem;
		background: #f8f9fa;
		border-left: 3px solid var(--color-primary);
		border-radius: 0.25rem;
		margin-bottom: 0.75rem;
		font-style: italic;
	}

	.explanation-section {
		margin-top: 0.5rem;
		padding: 0.5rem;
		background: #fff3e0;
		border-left: 3px solid #ff9800;
		border-radius: 0.25rem;
	}

	.explanation-label {
		font-weight: 500;
		color: #666;
		margin-right: 0.5rem;
	}

	.explanation-text {
		color: #555;
	}

	.pairs-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.pair-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: #f0f7f0;
		border-radius: 0.25rem;
		border-left: 3px solid var(--color-success);
	}

	.pair-left {
		font-weight: 500;
	}

	.pair-arrow {
		color: var(--color-success);
		font-weight: bold;
	}

	.pair-right {
		color: var(--color-success);
		font-weight: 500;
	}

	.categories-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.category-item {
		padding: 0.5rem;
		background: #f0f7f0;
		border-radius: 0.25rem;
		border-left: 3px solid var(--color-success);
	}

	.category-name {
		font-weight: 600;
		color: var(--color-success);
		margin-right: 0.5rem;
	}

	.category-items {
		color: #333;
	}
</style>
