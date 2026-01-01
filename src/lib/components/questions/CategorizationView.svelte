<script lang="ts">
	import type { CategorizationQuestion } from '$lib/types';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: CategorizationQuestion;
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

	// Build items with their correct category
	interface ShuffledItem {
		text: string;
		correctCategoryIndex: number;
	}

	// State
	let shuffledItems = $state<ShuffledItem[]>([]);
	let selectedItem = $state<number | null>(null);
	let assignments = $state<Map<number, number>>(new Map()); // itemIndex → categoryIndex
	let wasCorrect = $state<boolean | null>(null);
	let itemButtonRefs = $state<(HTMLButtonElement | undefined)[]>([]);

	// Track question hash to detect question changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Reset when question changes
	$effect(() => {
		const currentHash = JSON.stringify(question.categories);
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;

			// Build shuffled items array
			const items: ShuffledItem[] = [];
			question.categories.forEach((cat, catIndex) => {
				cat.items.forEach((item) => {
					items.push({ text: item, correctCategoryIndex: catIndex });
				});
			});
			shuffledItems = shuffle(items);
			selectedItem = null;
			assignments = new Map();
			wasCorrect = null;
			itemButtonRefs = items.map(() => undefined);

			logger.state('CategorizationView', 'Neue Frage geladen', {
				categoryCount: question.categories.length,
				itemCount: items.length
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			const items: ShuffledItem[] = [];
			question.categories.forEach((cat, catIndex) => {
				cat.items.forEach((item) => {
					items.push({ text: item, correctCategoryIndex: catIndex });
				});
			});
			shuffledItems = shuffle(items);
			selectedItem = null;
			assignments = new Map();
			wasCorrect = null;
			logger.state('CategorizationView', 'Frage zurückgesetzt (Wiederholung)');
		}
		wasEvaluated = evaluated;

		// Focus first unassigned item when question is ready for answering
		if (!evaluated) {
			const firstUnassignedIndex = shuffledItems.findIndex((_, i) => !assignments.has(i));
			if (firstUnassignedIndex >= 0 && itemButtonRefs[firstUnassignedIndex]) {
				itemButtonRefs[firstUnassignedIndex].focus();
			}
		}
	});

	function handleItemClick(index: number) {
		if (evaluated) return;
		if (assignments.has(index)) {
			// Remove assignment if clicking on already assigned item
			assignments.delete(index);
			assignments = new Map(assignments);
			selectedItem = null;
			logger.action('CategorizationView', 'Zuordnung entfernt', {
				item: shuffledItems[index].text
			});
		} else {
			selectedItem = selectedItem === index ? null : index;
			logger.action('CategorizationView', 'Item ausgewählt', {
				item: shuffledItems[index].text
			});
		}
	}

	function handleCategoryClick(categoryIndex: number) {
		if (evaluated || selectedItem === null) return;

		assignments.set(selectedItem, categoryIndex);
		assignments = new Map(assignments);

		logger.action('CategorizationView', 'Item kategorisiert', {
			item: shuffledItems[selectedItem].text,
			category: question.categories[categoryIndex].name
		});

		selectedItem = null;
	}

	function handleSubmit() {
		if (evaluated) return;

		// Check all assignments
		let allCorrect = true;
		for (let i = 0; i < shuffledItems.length; i++) {
			const assignedCategory = assignments.get(i);
			if (assignedCategory === undefined) {
				allCorrect = false;
				break;
			}
			if (assignedCategory !== shuffledItems[i].correctCategoryIndex) {
				allCorrect = false;
			}
		}

		wasCorrect = allCorrect;
		logger.action('CategorizationView', 'handleSubmit', {
			assignmentCount: assignments.size,
			itemCount: shuffledItems.length,
			isCorrect: allCorrect
		});
		onSubmit(allCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (evaluated) return;

		// 1-9 for items in pool
		if (event.key >= '1' && event.key <= '9') {
			const index = parseInt(event.key) - 1;
			// Find the nth unassigned item
			const unassignedItems = shuffledItems
				.map((_, i) => i)
				.filter((i) => !assignments.has(i));
			if (index < unassignedItems.length) {
				event.preventDefault();
				logger.action('CategorizationView', 'Keyboard: Zifferntaste', { key: event.key });
				handleItemClick(unassignedItems[index]);
			}
		}

		// a-d for categories (when item is selected)
		if (event.key >= 'a' && event.key <= 'd' && selectedItem !== null) {
			const index = event.key.charCodeAt(0) - 97;
			if (index < question.categories.length) {
				event.preventDefault();
				logger.action('CategorizationView', 'Keyboard: Buchstabentaste', { key: event.key });
				handleCategoryClick(index);
			}
		}

		// Enter or Ctrl+Enter to submit
		if (event.key === 'Enter') {
			event.preventDefault();
			logger.action('CategorizationView', 'Keyboard: Enter (Submit)');
			handleSubmit();
		}

		// Escape to deselect
		if (event.key === 'Escape' && selectedItem !== null) {
			event.preventDefault();
			selectedItem = null;
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

	function getItemClass(index: number): string {
		if (assignments.has(index)) return 'assigned';
		if (selectedItem === index) return 'selected';
		return '';
	}

	function getAssignedItemClass(itemIndex: number): string {
		if (!evaluated) return '';
		const assignedCategory = assignments.get(itemIndex);
		const correctCategory = shuffledItems[itemIndex].correctCategoryIndex;
		return assignedCategory === correctCategory ? 'correct' : 'wrong';
	}

	// Get items assigned to a category
	function getAssignedItems(categoryIndex: number): number[] {
		return [...assignments]
			.filter(([, cat]) => cat === categoryIndex)
			.map(([itemIndex]) => itemIndex);
	}

	// Get unassigned items with their pool index
	let unassignedItems = $derived(
		shuffledItems.map((_, i) => i).filter((i) => !assignments.has(i))
	);

	let allAssigned = $derived(assignments.size === shuffledItems.length);
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="categorization-question">
	<div class="question">
		{@html question.question}
	</div>

	<div class="hint">
		{#if selectedItem !== null}
			Wähle eine Kategorie (a-{String.fromCharCode(96 + question.categories.length)})
		{:else if unassignedItems.length > 0}
			Wähle einen Begriff (1-{Math.min(9, unassignedItems.length)})
		{:else}
			Alle Begriffe zugeordnet – Enter zum Abschicken
		{/if}
	</div>

	{#if unassignedItems.length > 0}
		<div class="items-pool">
			<h4>Begriffe:</h4>
			<div class="items">
				{#each unassignedItems as itemIndex, poolIndex}
					<button
						bind:this={itemButtonRefs[itemIndex]}
						class="item-button {getItemClass(itemIndex)}"
						onclick={() => handleItemClick(itemIndex)}
						disabled={evaluated}
					>
						<span class="key-hint">{poolIndex + 1}</span>
						{shuffledItems[itemIndex].text}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<div class="categories">
		{#each question.categories as category, catIndex}
			<div
				class="category"
				class:active={selectedItem !== null}
				role="button"
				tabindex={selectedItem !== null ? 0 : -1}
				onclick={() => handleCategoryClick(catIndex)}
				onkeydown={(e) => e.key === 'Enter' && handleCategoryClick(catIndex)}
			>
				<h4 class="category-header">
					<span class="key-hint">{String.fromCharCode(97 + catIndex)}</span>
					{category.name}
				</h4>
				<div class="assigned-items">
					{#each getAssignedItems(catIndex) as itemIndex}
						<span
							class="chip {getAssignedItemClass(itemIndex)}"
							role="button"
							tabindex="0"
							onclick={(e) => {
								e.stopPropagation();
								if (!evaluated) handleItemClick(itemIndex);
							}}
							onkeydown={(e: KeyboardEvent) => {
								e.stopPropagation();
								if (e.key === 'Enter' && !evaluated) handleItemClick(itemIndex);
							}}
						>
							{shuffledItems[itemIndex].text}
							{#if !evaluated}
								<span class="remove">×</span>
							{/if}
							{#if evaluated && getAssignedItemClass(itemIndex) === 'wrong'}
								<span class="correct-category">
									→ {question.categories[shuffledItems[itemIndex].correctCategoryIndex].name}
								</span>
							{/if}
						</span>
					{/each}
					{#if getAssignedItems(catIndex).length === 0}
						<span class="placeholder">Ziehe Begriffe hierher</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if evaluated}
		<div class="result-banner" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			{#if wasCorrect}
				✓ Richtig – Alle Begriffe korrekt kategorisiert
			{:else}
				{@const correctCount = [...assignments].filter(
					([itemIndex, catIndex]) => shuffledItems[itemIndex].correctCategoryIndex === catIndex
				).length}
				✗ Falsch – {correctCount} von {shuffledItems.length} Begriffen richtig
			{/if}
		</div>
	{/if}

	{#if revealed && !evaluated}
		<div class="revealed-answers">
			<strong>Richtige Zuordnungen:</strong>
			{#each question.categories as category}
				<div class="category-answer">
					<strong>{category.name}:</strong>
					{category.items.join(', ')}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.categorization-question {
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

	.items-pool {
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
	}

	.items-pool h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.875rem;
		color: #666;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.item-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		background: white;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.item-button:hover:not(:disabled) {
		border-color: var(--color-primary);
		background-color: #f0f7ff;
	}

	.item-button:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.item-button.selected {
		border-color: var(--color-primary);
		background-color: #e0f2fe;
	}

	.item-button:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}

	.categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.category {
		padding: 1rem;
		border: 2px dashed var(--color-border);
		border-radius: 0.5rem;
		min-height: 100px;
		transition: all 0.15s ease;
	}

	.category.active {
		border-color: var(--color-primary);
		background-color: #f0f7ff;
		cursor: pointer;
	}

	.category.active:hover {
		background-color: #e0f2fe;
	}

	.category-header {
		margin: 0 0 0.5rem 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
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

	.assigned-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.375rem 0.75rem;
		background-color: #e0f2fe;
		border-radius: 1rem;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.chip:hover {
		background-color: #bae6fd;
	}

	.chip.correct {
		background-color: #e8f5e9;
		color: var(--color-success);
	}

	.chip.wrong {
		background-color: #ffebee;
		color: var(--color-error);
	}

	.chip .remove {
		font-size: 1rem;
		font-weight: bold;
		color: #666;
		margin-left: 0.25rem;
	}

	.chip .correct-category {
		font-size: 0.75rem;
		margin-left: 0.25rem;
		color: var(--color-success);
	}

	.placeholder {
		font-size: 0.875rem;
		color: #999;
		font-style: italic;
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

	.category-answer {
		margin-top: 0.5rem;
	}
</style>
