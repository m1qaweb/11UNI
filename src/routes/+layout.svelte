<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>სანადიმო - ქართული რესტორანი</title>
	<meta name="description" content="ქართული რესტორანის ვებგვერდი - სანადიმო" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#8b0000" />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

<a href="#main-content" class="skip-link">
	გადასვლა შინაარსზე
</a>

<div id="app">
	{@render children()}
</div>

<style>
	.skip-link {
		position: absolute;
		top: -40px;
		left: 0;
		background: var(--color-primary);
		color: white;
		padding: 8px 16px;
		text-decoration: none;
		z-index: var(--z-tooltip);
		border-radius: 0 0 var(--radius-sm) 0;
		transition: top var(--transition-fast);
		font-weight: 600;
	}

	.skip-link:focus {
		top: 0;
	}

	#app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
