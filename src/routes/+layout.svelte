<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Vokabeltrainer</title>
	<meta name="description" content="Webbasierte Lernplattform für Vokabeln und Wissensfragen" />
</svelte:head>

{@render children()}
