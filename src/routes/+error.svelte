<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<main>
	<h1>{$page.status}</h1>
	<p>{$page.error?.message ?? 'Ein Fehler ist aufgetreten'}</p>
	<a href="{base}/">Zurück zur Startseite</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 1rem;
		text-align: center;
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 1rem;
		color: var(--color-error);
	}

	p {
		color: #666;
		font-size: 1.25rem;
		margin-bottom: 2rem;
	}

	a {
		color: var(--color-primary);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
