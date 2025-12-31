<script lang="ts">
	interface Props {
		percentage: number;
		label?: string;
	}

	let { percentage, label }: Props = $props();

	const isGood = $derived(percentage >= 90);
</script>

<span class="score-badge" class:good={isGood} class:bad={!isGood}>
	{#if label}
		<span class="label">{label}:</span>
	{/if}
	<span class="value">{percentage}%</span>
</span>

<style>
	.score-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.good {
		background-color: #e8f5e9;
		color: var(--color-success);
	}

	.bad {
		background-color: #ffebee;
		color: var(--color-error);
	}

	.label {
		opacity: 0.8;
	}

	.value {
		font-weight: 600;
	}
</style>
