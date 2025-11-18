<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { restaurantInfo } from '$lib/data/restaurant-info';
</script>

<Header />

<ToastContainer />

<main id="main-content">
	<Hero title={restaurantInfo.name} subtitle={restaurantInfo.tagline} />

	<About />

	<Menu />
</main>

<Footer />

<style>
	.section {
		scroll-margin-top: 80px;
	}
</style>
