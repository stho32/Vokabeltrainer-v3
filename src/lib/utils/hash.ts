// Simple hash function for question identification
// Using a simplified version since we're client-side only

export function hashQuestion(question: string): string {
	let hash = 0;
	for (let i = 0; i < question.length; i++) {
		const char = question.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash).toString(16).padStart(8, '0');
}
