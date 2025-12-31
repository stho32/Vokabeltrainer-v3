<script lang="ts">
	interface Props {
		type: 'correct' | 'wrong' | null;
	}

	let { type }: Props = $props();

	let visible = $state(false);
	let currentType = $state<'correct' | 'wrong' | null>(null);

	$effect(() => {
		if (type) {
			currentType = type;
			visible = true;
			// Hide after animation completes
			const timer = setTimeout(() => {
				visible = false;
			}, 500);
			return () => clearTimeout(timer);
		}
	});
</script>

{#if visible && currentType}
	<div class="flash" class:correct={currentType === 'correct'} class:wrong={currentType === 'wrong'}></div>
{/if}

<style>
	.flash {
		position: fixed;
		inset: 0;
		pointer-events: none;
		animation: flash 0.5s ease-out forwards;
		z-index: 1000;
	}

	.correct {
		background: var(--color-success);
	}

	.wrong {
		background: var(--color-error);
	}

	@keyframes flash {
		0% {
			opacity: 0.4;
		}
		100% {
			opacity: 0;
		}
	}
</style>
