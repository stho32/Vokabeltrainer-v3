<script lang="ts">
	import type { WordSearchQuestion } from '$lib/types';
	import {
		generateWordSearchGrid,
		checkWordSearchSelection,
		type GridResult
	} from '$lib/utils/word-search-grid';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: WordSearchQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	// State
	let gridData = $state<GridResult | null>(null);
	let selectedCells = $state<Set<string>>(new Set());
	let isDragging = $state(false);
	let dragStartRow = $state(0);
	let dragStartCol = $state(0);
	let wasCorrect = $state<boolean | null>(null);
	let cursorRow = $state(0);
	let cursorCol = $state(0);
	let gridRef: HTMLDivElement | undefined = $state();

	// Linien-Berechnung: Ermittelt die dominante Richtung (horizontal, vertikal, diagonal)
	function getSnappedDirection(dx: number, dy: number): { dRow: number; dCol: number } {
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);

		if (absDx === 0 && absDy === 0) {
			return { dRow: 0, dCol: 0 };
		} else if (absDx > 2 * absDy) {
			// Horizontal
			return { dRow: 0, dCol: Math.sign(dx) };
		} else if (absDy > 2 * absDx) {
			// Vertikal
			return { dRow: Math.sign(dy), dCol: 0 };
		} else {
			// Diagonal
			return { dRow: Math.sign(dy), dCol: Math.sign(dx) };
		}
	}

	// Berechnet alle Zellen auf einer eingerasteten Linie vom Start zum Endpunkt
	function calculateLineSelection(
		startRow: number,
		startCol: number,
		endRow: number,
		endCol: number
	): Set<string> {
		const dx = endCol - startCol;
		const dy = endRow - startRow;
		const { dRow, dCol } = getSnappedDirection(dx, dy);
		const length = Math.max(Math.abs(dx), Math.abs(dy));

		const cells = new Set<string>();
		for (let i = 0; i <= length; i++) {
			const row = startRow + i * dRow;
			const col = startCol + i * dCol;
			// Nur Zellen innerhalb des Grids hinzufügen
			if (gridData && row >= 0 && row < gridData.grid.length && col >= 0 && col < gridData.grid.length) {
				cells.add(`${row}-${col}`);
			}
		}
		return cells;
	}

	// Track question hash to detect question changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Reset when question changes
	$effect(() => {
		const currentHash = question.answer;
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;
			gridData = generateWordSearchGrid(question.answer);
			selectedCells = new Set();
			wasCorrect = null;
			cursorRow = 0;
			cursorCol = 0;
			logger.state('WordSearchView', 'Neue Frage geladen', {
				word: question.answer,
				direction: gridData.direction,
				gridSize: gridData.grid.length
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			gridData = generateWordSearchGrid(question.answer);
			selectedCells = new Set();
			wasCorrect = null;
			cursorRow = 0;
			cursorCol = 0;
			logger.state('WordSearchView', 'Frage zurückgesetzt (Wiederholung)');
		}
		wasEvaluated = evaluated;

		// Focus grid when question is ready for answering
		if (!evaluated && gridRef) {
			gridRef.focus();
		}
	});

	function toggleCell(row: number, col: number) {
		if (evaluated) return;
		const key = `${row}-${col}`;
		if (selectedCells.has(key)) {
			selectedCells.delete(key);
		} else {
			selectedCells.add(key);
		}
		selectedCells = new Set(selectedCells);
	}

	function handleCellMouseDown(row: number, col: number) {
		if (evaluated) return;
		isDragging = true;
		dragStartRow = row;
		dragStartCol = col;
		cursorRow = row;
		cursorCol = col;
		// Nur Startzelle auswählen
		selectedCells = new Set([`${row}-${col}`]);
	}

	function handleCellMouseEnter(row: number, col: number) {
		if (!isDragging || evaluated) return;
		// Linie vom Startpunkt zur aktuellen Position berechnen
		selectedCells = calculateLineSelection(dragStartRow, dragStartCol, row, col);
		cursorRow = row;
		cursorCol = col;
	}

	function handleMouseUp() {
		isDragging = false;
	}

	// Touch-Handler für mobile Geräte
	function handleTouchStart(row: number, col: number, event: TouchEvent) {
		if (evaluated) return;
		event.preventDefault(); // Verhindert Scrollen während der Auswahl
		isDragging = true;
		dragStartRow = row;
		dragStartCol = col;
		cursorRow = row;
		cursorCol = col;
		selectedCells = new Set([`${row}-${col}`]);
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDragging || evaluated || !gridRef) return;
		event.preventDefault();

		const touch = event.touches[0];
		const element = document.elementFromPoint(touch.clientX, touch.clientY);

		if (element?.classList.contains('grid-cell')) {
			// Finde die Zellposition aus dem Element
			const row = element.closest('.grid-row');
			if (row && gridRef) {
				const rows = Array.from(gridRef.querySelectorAll('.grid-row'));
				const rowIndex = rows.indexOf(row);
				const cells = Array.from(row.querySelectorAll('.grid-cell'));
				const colIndex = cells.indexOf(element as HTMLElement);

				if (rowIndex >= 0 && colIndex >= 0) {
					selectedCells = calculateLineSelection(dragStartRow, dragStartCol, rowIndex, colIndex);
					cursorRow = rowIndex;
					cursorCol = colIndex;
				}
			}
		}
	}

	function handleTouchEnd() {
		isDragging = false;
	}

	function handleSubmit() {
		if (evaluated || !gridData) return;

		const isCorrect = checkWordSearchSelection(selectedCells, gridData.wordPath);
		wasCorrect = isCorrect;

		logger.action('WordSearchView', 'handleSubmit', {
			selectedCount: selectedCells.size,
			wordLength: gridData.wordPath.length,
			isCorrect
		});

		onSubmit(isCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (evaluated || !gridData) return;

		const gridSize = gridData.grid.length;

		// Arrow keys to move cursor
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			cursorRow = Math.max(0, cursorRow - 1);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			cursorRow = Math.min(gridSize - 1, cursorRow + 1);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			cursorCol = Math.max(0, cursorCol - 1);
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			cursorCol = Math.min(gridSize - 1, cursorCol + 1);
		}

		// Space to toggle current cell
		if (event.key === ' ') {
			event.preventDefault();
			toggleCell(cursorRow, cursorCol);
		}

		// Enter or Ctrl+Enter to submit
		if (event.key === 'Enter') {
			event.preventDefault();
			logger.action('WordSearchView', 'Keyboard: Enter (Submit)');
			handleSubmit();
		}

		// Escape to clear selection
		if (event.key === 'Escape') {
			event.preventDefault();
			selectedCells.clear();
			selectedCells = new Set();
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
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('touchend', handleTouchEnd);
		return () => {
			window.removeEventListener('trigger-submit', handleTriggerSubmit);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	});

	function getCellClass(row: number, col: number): string {
		const key = `${row}-${col}`;
		const isSelected = selectedCells.has(key);
		const isCursor = row === cursorRow && col === cursorCol;
		const isWordPath = gridData?.wordPath.some((p) => p.row === row && p.col === col);

		if (!evaluated) {
			if (isCursor && isSelected) return 'cursor selected';
			if (isCursor) return 'cursor';
			if (isSelected) return 'selected';
			return '';
		}

		// After evaluation
		if (isWordPath && isSelected) return 'correct';
		if (isWordPath && !isSelected) return 'missed';
		if (!isWordPath && isSelected) return 'wrong';
		return '';
	}

	function getDirectionName(dir: string): string {
		switch (dir) {
			case 'horizontal':
				return 'waagerecht';
			case 'vertical':
				return 'senkrecht';
			case 'diagonal-down':
				return 'diagonal (↘)';
			case 'diagonal-up':
				return 'diagonal (↗)';
			default:
				return dir;
		}
	}
</script>

<div class="word-search-question">
	{#if question.title}
		<h3 class="title">{question.title}</h3>
	{/if}

	<div class="question">
		{@html question.question}
	</div>

	<div class="hint">
		Pfeiltasten zum Bewegen, Leertaste zum Auswählen, Enter zum Abschicken
	</div>

	{#if gridData}
		<div
			bind:this={gridRef}
			class="grid-container"
			tabindex="0"
			role="grid"
			aria-label="Buchstabengitter"
			onkeydown={handleKeydown}
			ontouchmove={handleTouchMove}
		>
			{#each gridData.grid as row, rowIndex}
				<div class="grid-row" role="row">
					{#each row as cell, colIndex}
						<button
							class="grid-cell {getCellClass(rowIndex, colIndex)}"
							role="gridcell"
							onmousedown={() => handleCellMouseDown(rowIndex, colIndex)}
							onmouseenter={() => handleCellMouseEnter(rowIndex, colIndex)}
							ontouchstart={(e) => handleTouchStart(rowIndex, colIndex, e)}
							disabled={evaluated}
						>
							{cell}
						</button>
					{/each}
				</div>
			{/each}
		</div>
	{/if}

	{#if evaluated}
		<div class="result-banner" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			{#if wasCorrect}
				✓ Richtig – Wort gefunden!
			{:else}
				✗ Falsch – Das Wort war {gridData?.direction
					? getDirectionName(gridData.direction)
					: ''} versteckt
			{/if}
		</div>
	{/if}

	{#if revealed && !evaluated}
		<div class="revealed-answers">
			<strong>Gesuchtes Wort:</strong>
			{question.answer}
			{#if gridData}
				<span class="direction-hint">
					({getDirectionName(gridData.direction)})
				</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.word-search-question {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.title {
		margin: 0;
		font-size: 1.125rem;
		color: #333;
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

	.grid-container {
		display: inline-flex;
		flex-direction: column;
		gap: 2px;
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
		align-self: center;
		user-select: none;
	}

	.grid-container:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.grid-row {
		display: flex;
		gap: 2px;
	}

	.grid-cell {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.125rem;
		font-weight: 600;
		font-family: monospace;
		background-color: white;
		border: 2px solid var(--color-border);
		border-radius: 0.25rem;
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.grid-cell:hover:not(:disabled) {
		background-color: #f0f7ff;
		border-color: var(--color-primary);
	}

	.grid-cell.cursor {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
	}

	.grid-cell.cursor.selected {
		background-color: var(--color-primary);
		border-color: white;
		color: white;
		font-weight: 700;
		transform: scale(1.05);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.6), 0 2px 8px rgba(59, 130, 246, 0.4);
	}

	.grid-cell.selected {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
		font-weight: 700;
		transform: scale(1.05);
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
	}

	.grid-cell.correct {
		background-color: #e8f5e9;
		border-color: var(--color-success);
		color: var(--color-success);
	}

	.grid-cell.wrong {
		background-color: #ffebee;
		border-color: var(--color-error);
		color: var(--color-error);
	}

	.grid-cell.missed {
		background-color: #fff3e0;
		border-color: #ff9800;
		border-style: dashed;
		color: #ff9800;
	}

	.grid-cell:disabled {
		cursor: not-allowed;
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

	.direction-hint {
		color: #666;
		font-size: 0.875rem;
	}
</style>
