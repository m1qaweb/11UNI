<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import MenuPackageSection from '$lib/components/MenuPackageSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { breakfastPackages, businessLunchPackages, mainDishPackages, seafoodPackages, sushiPackages, soupPackages, burgerPackages, beveragePackages } from '$lib/data/menu-packages';

	let activeCategory = $state('all');

	onMount(() => {
		const category = $page.url.searchParams.get('category');
		if (category) {
			activeCategory = category;
			setTimeout(() => {
				const section = document.getElementById(category);
				if (section) {
					const headerOffset = 120;
					const elementPosition = section.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.scrollY - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				} else {
					console.warn(`Section with id "${category}" not found`);
				}
			}, 400);
		}
	});
</script>

<svelte:head>
	<title>მენიუ - სანადიმო</title>
	<meta name="description" content="სანადიმოს სრული მენიუ - საუზმე, ბიზნეს ლანჩი, ძირითადი კერძები, ზღვის პროდუქტები, სუში, წვნიანი, ბურგერები, სენდვიჩები და სასმელები" />
</svelte:head>

<Header />

<ToastContainer />

<main id="main-content" class="menu-page">
	<section class="page-header">
		<div class="container-custom">
			<h1 class="page-title">მენიუ</h1>
			<p class="page-subtitle">ავთენტური ქართული კერძები ტრადიციული რეცეპტებით</p>
		</div>
	</section>

	<div id="breakfast">
		<MenuPackageSection title="საუზმე" packages={breakfastPackages} columns={3} />
	</div>

	<div id="business-lunch">
		<MenuPackageSection title="ბიზნეს ლანჩი" packages={businessLunchPackages} columns={3} />
	</div>

	<div id="main-dishes">
		<MenuPackageSection title="ძირითადი კერძები" packages={mainDishPackages} columns={4} />
	</div>

	<div id="seafood">
		<MenuPackageSection title="ზღვის პროდუქტები" packages={seafoodPackages} columns={4} />
	</div>

	<div id="sushi">
		<MenuPackageSection title="სუში" packages={sushiPackages} columns={4} />
	</div>

	<div id="soups">
		<MenuPackageSection title="წვნიანი" packages={soupPackages} columns={3} />
	</div>

	<div id="burgers">
		<MenuPackageSection title="ბურგერები და სენდვიჩები" packages={burgerPackages} columns={3} />
	</div>

	<div id="beverages">
		<MenuPackageSection title="გამაგრილებელი სასმელები" packages={beveragePackages} columns={3} />
	</div>
</main>

<Footer />

<style>
	.menu-page {
		min-height: 100vh;
		padding-top: 80px;
		background: #fafbfc;
	}

	.page-header {
		padding: var(--spacing-3xl) 0 var(--spacing-2xl);
		background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
		border-bottom: 2px solid #e9ecef;
		position: relative;
		overflow: hidden;
	}

	.page-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--color-primary) 0%, #d32f2f 50%, var(--color-primary) 100%);
	}

	.page-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		color: var(--color-text);
		margin: 0 0 var(--spacing-sm) 0;
		text-align: center;
		letter-spacing: -0.5px;
	}

	.page-subtitle {
		font-size: clamp(1.125rem, 2vw, 1.375rem);
		color: var(--color-text-light);
		text-align: center;
		margin: 0;
		font-weight: 400;
	}

	.menu-page > div {
		background: white;
		border-radius: 16px;
		margin: 0 var(--spacing-lg) var(--spacing-xl);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.menu-page > div:first-of-type {
		margin-top: var(--spacing-xl);
	}

	@media (max-width: 768px) {
		.menu-page {
			padding-top: 60px;
		}

		.page-header {
			padding: var(--spacing-2xl) 0 var(--spacing-xl);
		}

		.menu-page > div {
			margin: 0 var(--spacing-md) var(--spacing-lg);
		}
	}
</style>
