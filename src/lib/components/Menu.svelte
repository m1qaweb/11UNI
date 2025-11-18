<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { MenuProps } from '$lib/types';
	import { menuData } from '$lib/data/menu';
	import MenuItem from './MenuItem.svelte';
	import OptimizedImage from './OptimizedImage.svelte';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import { ChevronLeft, ChevronRight, Grid2X2 } from 'lucide-svelte';

	interface Props extends MenuProps {
		categories?: typeof menuData;
		showFilters?: boolean;
		showItems?: boolean;
	}

	let { categories = menuData, showFilters = true, showItems = false }: Props = $props();

	const categoryToSectionMap: Record<string, string> = {

		'აპეტაიზერი': 'breakfast',
		'საუზმე': 'breakfast',
		'წასახემსებელი კერძები': 'breakfast',
		'ბიზნეს ლანჩი': 'business-lunch',
		'ძირითადი კერძები': 'main-dishes',
		'მწვადი': 'main-dishes',
		'ხინკალი': 'main-dishes',
		'ზღვის პროდუქტები': 'seafood',
		'თევზი': 'seafood',
		'სუში': 'sushi',
		'როლები': 'sushi',
		'სუპები': 'soups',
		'წვნიანი': 'soups',
		'ბურგერები და სენდვიჩები': 'burgers',
		'ბურგერები': 'burgers',
		'სენდვიჩები': 'burgers',
		'გამაგრილებელი სასმელები': 'beverages',
		'სასმელები': 'beverages',
		'ღვინო': 'beverages',

		'appetizers': 'breakfast',
		'breakfast': 'breakfast',
		'business-lunch': 'business-lunch',
		'main-courses': 'main-dishes',
		'khinkali': 'main-dishes',
		'seafood': 'seafood',
		'sushi': 'sushi',
		'soups': 'soups',
		'burgers': 'burgers',
		'soft-drinks': 'beverages',
		'beverages': 'beverages'
	};

	let activeCategory = $state<string>('all');

	let sectionVisible = $state(false);
	let sectionElement: HTMLElement;

	let categoryScrollContainer: HTMLElement | undefined = $state();
	let canScrollLeft = $state(false);
	let canScrollRight = $state(false);

	let filteredCategories = $derived(
		activeCategory === 'all'
			? categories
			: categories.filter((cat) => cat.id === activeCategory)
	);

	$effect(() => {
		if (typeof window !== 'undefined' && sectionElement) {

			const rect = sectionElement.getBoundingClientRect();
			const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

			if (isInViewport) {
				sectionVisible = true;
			}

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							sectionVisible = true;
						}
					});
				},
				{
					threshold: 0.01,
					rootMargin: '0px 0px 0px 0px',
				}
			);

			observer.observe(sectionElement);

			return () => {
				observer.disconnect();
			};
		}
	});

	$effect(() => {
		if (categoryScrollContainer) {
			updateScrollButtons();
			categoryScrollContainer.addEventListener('scroll', updateScrollButtons);
			window.addEventListener('resize', updateScrollButtons);

			return () => {
				categoryScrollContainer?.removeEventListener('scroll', updateScrollButtons);
				window.removeEventListener('resize', updateScrollButtons);
			};
		}
	});

	function updateScrollButtons() {
		if (!categoryScrollContainer) return;

		const { scrollLeft, scrollWidth, clientWidth } = categoryScrollContainer;
		canScrollLeft = scrollLeft > 0;
		canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
	}

	function handleCategoryClick(category: typeof categories[0]) {

		const sectionId = categoryToSectionMap[category.name] || categoryToSectionMap[category.id] || category.id;
		goto(`${base}/menu?category=${sectionId}`);
	}

	function viewAllMenu() {
		goto(`${base}/menu`);
	}

	function scrollCategories(direction: 'left' | 'right') {
		if (!categoryScrollContainer) return;

		const scrollAmount = 300;
		const newScrollLeft = direction === 'left' 
			? categoryScrollContainer.scrollLeft - scrollAmount
			: categoryScrollContainer.scrollLeft + scrollAmount;

		categoryScrollContainer.scrollTo({
			left: newScrollLeft,
			behavior: 'smooth'
		});
	}
</script>

<section id="menu" class="menu-section section" bind:this={sectionElement}>
	<div class="container-custom">
		<div class="menu-content" class:visible={sectionVisible}>

			<div class="section-header">
				<h2 class="section-title">{UI_TEXT.navigation.menu}</h2>
				<div class="title-underline"></div>
			</div>

			{#if showFilters && categories.length > 1}
				<div class="category-selector-wrapper">
					<div class="category-selector-header">
						<h3 class="category-selector-title">
							<Grid2X2 size={20} aria-hidden="true" />
							{UI_TEXT.navigation.menu}
						</h3>
						<button class="view-all-button" onclick={viewAllMenu}>
							{UI_TEXT.gallery.viewAll}
							<ChevronRight size={16} aria-hidden="true" />
						</button>
					</div>

					<div class="category-scroll-container">
						{#if canScrollLeft}
							<button
								class="scroll-button scroll-left"
								onclick={() => scrollCategories('left')}
								aria-label="წინა კატეგორიები"
							>
								<ChevronLeft size={24} aria-hidden="true" />
							</button>
						{/if}

						<div class="category-cards" bind:this={categoryScrollContainer}>

							{#each categories as category}
								<button
									class="category-card"
									class:active={activeCategory === category.id}
									onclick={() => handleCategoryClick(category)}
									aria-label={category.name}
								>
									{#if category.image}
										<div class="category-card-image">
											<OptimizedImage
												src={category.image}
												alt={category.name}
												loading="eager"
											/>
										</div>
									{/if}
									<span class="category-card-name">{category.name}</span>
								</button>
							{/each}
						</div>

						{#if canScrollRight}
							<button
								class="scroll-button scroll-right"
								onclick={() => scrollCategories('right')}
								aria-label="შემდეგი კატეგორიები"
							>
								<ChevronRight size={24} aria-hidden="true" />
							</button>
						{/if}
					</div>
				</div>
			{/if}

			{#if showItems}
				<div class="menu-categories">
					{#each filteredCategories as category, categoryIndex}
						<div
							class="menu-category"
							style="animation-delay: {categoryIndex * 0.1}s"
						>
							<div class="category-header">
								<h3 class="category-title">{category.name}</h3>
							</div>

							<div class="menu-items-grid">
								{#each category.items as item, itemIndex}
									<div style="animation-delay: {(categoryIndex * 0.1) + (itemIndex * 0.05)}s">
										<MenuItem {item} />
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.menu-section {
		padding: var(--spacing-3xl) 0;
		background-color: var(--color-bg-light);
	}

	.menu-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.menu-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-3xl);
	}

	.section-title {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: var(--spacing-md);
	}

	.title-underline {
		width: 80px;
		height: 4px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		margin: 0 auto var(--spacing-lg);
		border-radius: 2px;
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--color-text-light);
		max-width: 600px;
		margin: 0 auto;
	}

	.category-selector-wrapper {
		margin-bottom: var(--spacing-3xl);
	}

	.category-selector-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
		padding: 0 var(--spacing-md);
	}

	.category-selector-title {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0;
	}

	.view-all-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: transparent;
		border: none;
		color: var(--color-primary);
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
		border-radius: var(--radius-md);
	}

	.view-all-button:hover {
		background-color: rgba(139, 0, 0, 0.05);
		gap: var(--spacing-sm);
	}

	.view-all-button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.category-scroll-container {
		position: relative;
	}

	.category-cards {
		display: flex;
		gap: var(--spacing-md);
		overflow-x: auto;
		scroll-behavior: smooth;
		padding: var(--spacing-sm) var(--spacing-md);
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.category-cards::-webkit-scrollbar {
		display: none;
	}

	.category-card {
		position: relative;
		flex-shrink: 0;
		width: 350px;
		height: 260px;
		border-radius: var(--radius-lg);
		overflow: hidden;
		cursor: pointer;
		border: 3px solid transparent;
		transition: all var(--transition-normal);
		background: var(--color-bg-light);
	}

	.category-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary);
	}

	.category-card.active {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 4px rgba(139, 0, 0, 0.1);
	}

	.category-card:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.category-card-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.category-card-image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.category-card-name {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--spacing-lg);
		color: white;
		font-size: 1.4rem;
		font-weight: 600;
		text-align: center;
		z-index: 1;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.scroll-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: white;
		border: none;
		box-shadow: var(--shadow-md);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text);
		transition: all var(--transition-fast);
		z-index: 2;
	}

	.scroll-button:hover {
		background: var(--color-primary);
		color: white;
		box-shadow: var(--shadow-lg);
	}

	.scroll-button:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.scroll-left {
		left: 0;
	}

	.scroll-right {
		right: 0;
	}

	.menu-categories {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3xl);
	}

	.menu-category {
		opacity: 0;
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.visible .menu-category {
		animation-play-state: running;
	}

	.category-header {
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.category-title {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--spacing-sm);
	}

	.category-description {
		font-size: 1rem;
		color: var(--color-text-light);
	}

	.menu-items-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-lg);
	}

	@media (min-width: 768px) {
		.menu-items-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.menu-items-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.menu-items-grid > div {
		opacity: 0;
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.visible .menu-items-grid > div {
		animation-play-state: running;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.menu-section {
			padding: var(--spacing-2xl) 0;
		}

		.section-header {
			margin-bottom: var(--spacing-2xl);
		}

		.category-selector-wrapper {
			margin-bottom: var(--spacing-2xl);
		}

		.category-selector-header {
			padding: 0 var(--spacing-sm);
		}

		.category-selector-title {
			font-size: 1.1rem;
		}

		.view-all-button {
			font-size: 0.875rem;
		}

		.category-cards {
			padding: var(--spacing-sm);
			gap: var(--spacing-sm);
		}

		.category-card {
			width: 280px;
			height: 220px;
		}

		.category-card-name {
			font-size: 1.15rem;
		}

		.scroll-button {
			width: 36px;
			height: 36px;
		}
	}

	@media (max-width: 480px) {
		.category-card {
			width: 240px;
			height: 190px;
		}

		.category-card-name {
			font-size: 0.95rem;
		}

		.scroll-button {
			display: none;
		}
	}
</style>
