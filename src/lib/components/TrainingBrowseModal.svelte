<script lang="ts">
	import type { Training } from '$lib/types';
	import BrowseQuestionView from './BrowseQuestionView.svelte';

	interface Props {
		training: Training;
		onClose: () => void;
	}

	let { training, onClose }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
<div class="modal-backdrop" onclick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
	<div class="modal-content">
		<header class="modal-header">
			<h2 id="modal-title">{training.name}</h2>
			<button class="close-button" onclick={onClose} aria-label="Schließen">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 5L15 15M15 5L5 15" />
				</svg>
			</button>
		</header>

		<div class="modal-body">
			<p class="question-count">{training.questions.length} Fragen</p>

			<div class="questions-list">
				{#each training.questions as question, index}
					<BrowseQuestionView {question} {index} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1001;
		padding: 1rem;
	}

	.modal-content {
		background: var(--color-bg);
		border-radius: 0.75rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		width: 100%;
		max-width: 700px;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	.close-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		background: none;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		color: #666;
		transition: background-color 0.2s, color 0.2s;
	}

	.close-button:hover {
		background: #f0f0f0;
		color: #333;
	}

	.modal-body {
		padding: 1.25rem;
		overflow-y: auto;
		flex: 1;
	}

	.question-count {
		margin: 0 0 1rem 0;
		color: #666;
		font-size: 0.875rem;
	}

	.questions-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
