<script lang="ts">
	import '../app.css';
	import { trainingSessionStore } from '$lib/stores/training-session.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Vokabeltrainer</title>
	<meta name="description" content="Webbasierte Lernplattform für Vokabeln und Wissensfragen" />
</svelte:head>

{#if trainingSessionStore.isActive && !trainingSessionStore.isComplete}
	<nav class="navbar">
		<a href="/" class="logo">Vokabeltrainer</a>
		<div class="bilanz">
			<span class="correct">Richtig: {trainingSessionStore.correctCount}</span>
			<span class="divider">|</span>
			<span class="wrong">Falsch: {trainingSessionStore.wrongCount}</span>
		</div>
	</nav>
{/if}

{@render children()}

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: #f5f5f5;
		border-bottom: 1px solid var(--color-border);
	}

	.logo {
		font-weight: 600;
		font-size: 1.125rem;
		color: var(--color-primary);
		text-decoration: none;
	}

	.logo:hover {
		opacity: 0.8;
	}

	.bilanz {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.875rem;
	}

	.correct {
		color: var(--color-success);
		font-weight: 500;
	}

	.wrong {
		color: var(--color-error);
		font-weight: 500;
	}

	.divider {
		color: #ccc;
	}
</style>
