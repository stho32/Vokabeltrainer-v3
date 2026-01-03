// Training-Validator für importierte Trainingsdateien
import type { Training, Question } from '$lib/types';

export interface ValidationError {
	field: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	training?: Training;
	errors: ValidationError[];
}

const ID_PATTERN = /^[a-z0-9-]+$/;

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

function isNonEmptyString(value: unknown): value is string {
	return isString(value) && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every(isString);
}

function isNumberArray(value: unknown): value is number[] {
	return Array.isArray(value) && value.every(isNumber);
}

function validateTextQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (q.answer === undefined) {
		errors.push({ field: `${prefix}.answer`, message: 'Pflichtfeld fehlt' });
	} else if (!isNonEmptyString(q.answer) && !isStringArray(q.answer)) {
		errors.push({ field: `${prefix}.answer`, message: 'Muss String oder String-Array sein' });
	} else if (isStringArray(q.answer) && q.answer.length === 0) {
		errors.push({ field: `${prefix}.answer`, message: 'Array darf nicht leer sein' });
	}

	return errors;
}

function validateMultipleChoiceQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!Array.isArray(q.options)) {
		errors.push({ field: `${prefix}.options`, message: 'Pflichtfeld fehlt oder ist kein Array' });
	} else if (q.options.length < 2) {
		errors.push({ field: `${prefix}.options`, message: 'Mindestens 2 Optionen erforderlich' });
	} else {
		q.options.forEach((opt, i) => {
			if (!isObject(opt)) {
				errors.push({ field: `${prefix}.options[${i}]`, message: 'Muss ein Objekt sein' });
			} else {
				if (!isNonEmptyString(opt.text)) {
					errors.push({ field: `${prefix}.options[${i}].text`, message: 'Pflichtfeld fehlt oder ist leer' });
				}
				if (!isBoolean(opt.correct)) {
					errors.push({ field: `${prefix}.options[${i}].correct`, message: 'Muss boolean sein' });
				}
			}
		});
	}

	return errors;
}

function validateDiceTextQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!isNonEmptyString(q.text)) {
		errors.push({ field: `${prefix}.text`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!isNumberArray(q.hiddenWords)) {
		errors.push({ field: `${prefix}.hiddenWords`, message: 'Muss ein Array von Zahlen sein' });
	} else if (q.hiddenWords.length === 0) {
		errors.push({ field: `${prefix}.hiddenWords`, message: 'Array darf nicht leer sein' });
	}

	if (q.distractors !== undefined && !isStringArray(q.distractors)) {
		errors.push({ field: `${prefix}.distractors`, message: 'Muss ein String-Array sein' });
	}

	return errors;
}

function validateWordSearchQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.title)) {
		errors.push({ field: `${prefix}.title`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!isNonEmptyString(q.answer)) {
		errors.push({ field: `${prefix}.answer`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	return errors;
}

function validateTrueFalseQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!isNonEmptyString(q.statement)) {
		errors.push({ field: `${prefix}.statement`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!isBoolean(q.correct)) {
		errors.push({ field: `${prefix}.correct`, message: 'Muss boolean sein' });
	}

	return errors;
}

function validateMatchingQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!Array.isArray(q.pairs)) {
		errors.push({ field: `${prefix}.pairs`, message: 'Pflichtfeld fehlt oder ist kein Array' });
	} else if (q.pairs.length < 2) {
		errors.push({ field: `${prefix}.pairs`, message: 'Mindestens 2 Paare erforderlich' });
	} else {
		q.pairs.forEach((pair, i) => {
			if (!isObject(pair)) {
				errors.push({ field: `${prefix}.pairs[${i}]`, message: 'Muss ein Objekt sein' });
			} else {
				if (!isNonEmptyString(pair.left)) {
					errors.push({ field: `${prefix}.pairs[${i}].left`, message: 'Pflichtfeld fehlt oder ist leer' });
				}
				if (!isNonEmptyString(pair.right)) {
					errors.push({ field: `${prefix}.pairs[${i}].right`, message: 'Pflichtfeld fehlt oder ist leer' });
				}
			}
		});
	}

	return errors;
}

function validateCategorizationQuestion(q: Record<string, unknown>, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isNonEmptyString(q.question)) {
		errors.push({ field: `${prefix}.question`, message: 'Pflichtfeld fehlt oder ist leer' });
	}

	if (!Array.isArray(q.categories)) {
		errors.push({ field: `${prefix}.categories`, message: 'Pflichtfeld fehlt oder ist kein Array' });
	} else if (q.categories.length < 2) {
		errors.push({ field: `${prefix}.categories`, message: 'Mindestens 2 Kategorien erforderlich' });
	} else {
		q.categories.forEach((cat, i) => {
			if (!isObject(cat)) {
				errors.push({ field: `${prefix}.categories[${i}]`, message: 'Muss ein Objekt sein' });
			} else {
				if (!isNonEmptyString(cat.name)) {
					errors.push({ field: `${prefix}.categories[${i}].name`, message: 'Pflichtfeld fehlt oder ist leer' });
				}
				if (!isStringArray(cat.items)) {
					errors.push({ field: `${prefix}.categories[${i}].items`, message: 'Muss ein String-Array sein' });
				} else if ((cat.items as string[]).length === 0) {
					errors.push({ field: `${prefix}.categories[${i}].items`, message: 'Array darf nicht leer sein' });
				}
			}
		});
	}

	return errors;
}

function validateQuestion(q: unknown, index: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = `questions[${index}]`;

	if (!isObject(q)) {
		errors.push({ field: prefix, message: 'Muss ein Objekt sein' });
		return errors;
	}

	if (!isString(q.type)) {
		errors.push({ field: `${prefix}.type`, message: 'Pflichtfeld fehlt' });
		return errors;
	}

	switch (q.type) {
		case 'text':
			return validateTextQuestion(q, index);
		case 'multiple-choice':
			return validateMultipleChoiceQuestion(q, index);
		case 'dice-text':
			return validateDiceTextQuestion(q, index);
		case 'word-search':
			return validateWordSearchQuestion(q, index);
		case 'true-false':
			return validateTrueFalseQuestion(q, index);
		case 'matching':
			return validateMatchingQuestion(q, index);
		case 'categorization':
			return validateCategorizationQuestion(q, index);
		default:
			errors.push({
				field: `${prefix}.type`,
				message: `Unbekannter Fragentyp: "${q.type}". Erlaubt: text, multiple-choice, dice-text, word-search, true-false, matching, categorization`
			});
	}

	return errors;
}

export function validateTraining(data: unknown): ValidationResult {
	const errors: ValidationError[] = [];

	if (!isObject(data)) {
		return {
			valid: false,
			errors: [{ field: 'root', message: 'Training muss ein Objekt sein' }]
		};
	}

	// ID validieren
	if (!isNonEmptyString(data.id)) {
		errors.push({ field: 'id', message: 'Pflichtfeld fehlt oder ist leer' });
	} else if (!ID_PATTERN.test(data.id)) {
		errors.push({ field: 'id', message: 'Muss kebab-case sein (nur Kleinbuchstaben, Zahlen, Bindestriche)' });
	}

	// Name validieren
	if (!isNonEmptyString(data.name)) {
		errors.push({ field: 'name', message: 'Pflichtfeld fehlt oder ist leer' });
	}

	// Questions validieren
	if (!Array.isArray(data.questions)) {
		errors.push({ field: 'questions', message: 'Pflichtfeld fehlt oder ist kein Array' });
	} else if (data.questions.length === 0) {
		errors.push({ field: 'questions', message: 'Mindestens eine Frage erforderlich' });
	} else {
		data.questions.forEach((q, i) => {
			errors.push(...validateQuestion(q, i));
		});
	}

	// Optionale Felder validieren
	if (data.version !== undefined && !isString(data.version)) {
		errors.push({ field: 'version', message: 'Muss ein String sein' });
	}
	if (data.author !== undefined && !isString(data.author)) {
		errors.push({ field: 'author', message: 'Muss ein String sein' });
	}
	if (data.description !== undefined && !isString(data.description)) {
		errors.push({ field: 'description', message: 'Muss ein String sein' });
	}

	if (errors.length > 0) {
		return { valid: false, errors };
	}

	// Training-Objekt erstellen
	const training: Training = {
		id: data.id as string,
		name: data.name as string,
		questions: data.questions as Question[],
		source: 'imported'
	};

	// Optionale Felder übernehmen
	if (isString(data.version)) training.version = data.version;
	if (isString(data.author)) training.author = data.author;
	if (isString(data.description)) training.description = data.description;

	return { valid: true, training, errors: [] };
}

export function formatValidationErrors(errors: ValidationError[]): string {
	if (errors.length === 0) return '';
	if (errors.length === 1) return `${errors[0].field}: ${errors[0].message}`;
	return errors.map((e) => `• ${e.field}: ${e.message}`).join('\n');
}
