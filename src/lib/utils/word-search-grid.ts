// Word Search Grid Generator

export type Direction = 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up';

export interface GridCell {
	row: number;
	col: number;
}

export interface GridResult {
	grid: string[][];
	wordPath: GridCell[];
	direction: Direction;
}

const DIRECTIONS: { [key in Direction]: { dRow: number; dCol: number } } = {
	horizontal: { dRow: 0, dCol: 1 },
	vertical: { dRow: 1, dCol: 0 },
	'diagonal-down': { dRow: 1, dCol: 1 },
	'diagonal-up': { dRow: -1, dCol: 1 }
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getRandomLetter(): string {
	return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function getRandomDirection(): Direction {
	const dirs: Direction[] = ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up'];
	return dirs[Math.floor(Math.random() * dirs.length)];
}

/**
 * Generates a word search grid with the given word hidden in it.
 * @param word The word to hide in the grid
 * @param size The size of the grid (default: auto-calculated based on word length)
 * @returns GridResult with grid, wordPath, and direction
 */
export function generateWordSearchGrid(word: string, size?: number): GridResult {
	const upperWord = word.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '');
	const wordLength = upperWord.length;

	// Calculate grid size (at least word length + 2, minimum 6)
	const gridSize = size ?? Math.max(6, wordLength + 2);

	// Initialize empty grid
	const grid: string[][] = Array(gridSize)
		.fill(null)
		.map(() => Array(gridSize).fill(''));

	// Try to place the word
	const direction = getRandomDirection();
	const { dRow, dCol } = DIRECTIONS[direction];

	// Calculate valid starting positions
	let maxStartRow: number, maxStartCol: number, minStartRow: number;

	if (direction === 'horizontal') {
		minStartRow = 0;
		maxStartRow = gridSize - 1;
		maxStartCol = gridSize - wordLength;
	} else if (direction === 'vertical') {
		minStartRow = 0;
		maxStartRow = gridSize - wordLength;
		maxStartCol = gridSize - 1;
	} else if (direction === 'diagonal-down') {
		minStartRow = 0;
		maxStartRow = gridSize - wordLength;
		maxStartCol = gridSize - wordLength;
	} else {
		// diagonal-up
		minStartRow = wordLength - 1;
		maxStartRow = gridSize - 1;
		maxStartCol = gridSize - wordLength;
	}

	// Random starting position
	const startRow = minStartRow + Math.floor(Math.random() * (maxStartRow - minStartRow + 1));
	const startCol = Math.floor(Math.random() * (maxStartCol + 1));

	// Place the word
	const wordPath: GridCell[] = [];
	for (let i = 0; i < wordLength; i++) {
		const row = startRow + i * dRow;
		const col = startCol + i * dCol;
		grid[row][col] = upperWord[i];
		wordPath.push({ row, col });
	}

	// Fill remaining cells with random letters
	for (let row = 0; row < gridSize; row++) {
		for (let col = 0; col < gridSize; col++) {
			if (grid[row][col] === '') {
				grid[row][col] = getRandomLetter();
			}
		}
	}

	return { grid, wordPath, direction };
}

/**
 * Checks if the selected cells match the word path (in order).
 */
export function checkWordSearchSelection(
	selected: Set<string>,
	wordPath: GridCell[]
): boolean {
	if (selected.size !== wordPath.length) return false;

	return wordPath.every((cell) => selected.has(`${cell.row}-${cell.col}`));
}

/**
 * Converts a Set of cell keys to an array of GridCells.
 */
export function parseCellKeys(keys: Set<string>): GridCell[] {
	return [...keys].map((key) => {
		const [row, col] = key.split('-').map(Number);
		return { row, col };
	});
}
