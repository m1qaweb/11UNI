<script lang="ts">
	import type { GalleryProps, GalleryCategory } from '$lib/types';
	import { galleryImages, getImagesByCategory } from '$lib/data/gallery';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import Lightbox from './Lightbox.svelte';

	interface Props extends GalleryProps {
		images?: typeof galleryImages;
		columns?: number;
		showCategories?: boolean;
	}

	let {
		images = galleryImages,
		columns = 3,
		showCategories = true
	}: Props = $props();

	let activeCategory = $state<GalleryCategory>('all');

	let lightboxOpen = $state(false);
	let currentImageIndex = $state(0);

	let sectionVisible = $state(false);
	let sectionElement: HTMLElement;

	let filteredImages = $derived(getImagesByCategory(activeCategory));

	$effect(() => {
		if (typeof window !== 'undefined' && sectionElement) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							sectionVisible = true;
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: '0px 0px -100px 0px'
				}
			);

			observer.observe(sectionElement);

			return () => {
				observer.disconnect();
			};
		}
	});

	function handleCategoryClick(category: GalleryCategory) {
		activeCategory = category;
	}

	function handleImageClick(index: number) {
		currentImageIndex = index;
		lightboxOpen = true;
	}

	function handleLightboxClose() {
		lightboxOpen = false;
	}

	function handleNext() {
		if (currentImageIndex < filteredImages.length - 1) {
			currentImageIndex++;
		}
	}

	function handlePrevious() {
		if (currentImageIndex > 0) {
			currentImageIndex--;
		}
	}
</script>

<section id="gallery" class="gallery-section section" bind:this={sectionElement}>
	<div class="container-custom">
		<div class="gallery-content" class:visible={sectionVisible}>

			<div class="section-header">
				<h2 class="section-title">{UI_TEXT.gallery.title}</h2>
				<div class="title-underline"></div>
				<p class="section-subtitle">
					ჩვენი რესტორნის ატმოსფერო და კერძები
				</p>
			</div>

			{#if showCategories}
				<div class="category-filters">
					<button
						class="filter-button"
						class:active={activeCategory === 'all'}
						onclick={() => handleCategoryClick('all')}
						aria-label={UI_TEXT.gallery.categories.all}
					>
						{UI_TEXT.gallery.categories.all}
					</button>
					<button
						class="filter-button"
						class:active={activeCategory === 'food'}
						onclick={() => handleCategoryClick('food')}
						aria-label={UI_TEXT.gallery.categories.food}
					>
						{UI_TEXT.gallery.categories.food}
					</button>
					<button
						class="filter-button"
						class:active={activeCategory === 'interior'}
						onclick={() => handleCategoryClick('interior')}
						aria-label={UI_TEXT.gallery.categories.interior}
					>
						{UI_TEXT.gallery.categories.interior}
					</button>
					<button
						class="filter-button"
						class:active={activeCategory === 'atmosphere'}
						onclick={() => handleCategoryClick('atmosphere')}
						aria-label={UI_TEXT.gallery.categories.atmosphere}
					>
						{UI_TEXT.gallery.categories.atmosphere}
					</button>
				</div>
			{/if}

			<div class="gallery-grid" style="--columns: {columns}">
				{#each filteredImages as image, index (image.id)}
					<button
						class="gallery-item"
						onclick={() => handleImageClick(index)}
						aria-label={`${UI_TEXT.a11y.openLightbox}: ${image.alt}`}
						style="animation-delay: {index * 0.05}s"
					>
						<img
							src={image.thumbnail}
							alt={image.alt}
							loading="lazy"
							decoding="async"
							class="gallery-image"
						/>
						<div class="gallery-overlay">
							<span class="gallery-caption">{image.caption || image.alt}</span>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

{#if lightboxOpen}
	<Lightbox
		images={filteredImages}
		currentIndex={currentImageIndex}
		isOpen={lightboxOpen}
		onClose={handleLightboxClose}
		onNext={handleNext}
		onPrevious={handlePrevious}
	/>
{/if}

<style>
	.gallery-section {
		padding: var(--spacing-3xl) 0;
		background-color: white;
	}

	.gallery-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.gallery-content.visible {
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

	.category-filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
		margin-bottom: var(--spacing-3xl);
	}

	.filter-button {
		padding: var(--spacing-sm) var(--spacing-lg);
		background-color: white;
		border: 2px solid var(--color-bg-light);
		border-radius: var(--radius-full);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.filter-button:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: var(--shadow-sm);
	}

	.filter-button.active {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.filter-button:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(var(--columns, 3), 1fr);
		gap: var(--spacing-lg);
	}

	@media (max-width: 1024px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.gallery-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}
	}

	.gallery-item {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: var(--radius-lg);
		cursor: pointer;
		border: none;
		padding: 0;
		background: var(--color-bg-light);
		opacity: 0;
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.visible .gallery-item {
		animation-play-state: running;
	}

	.gallery-item:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.gallery-item:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.gallery-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.gallery-item:hover .gallery-image {
		transform: scale(1.05);
	}

	.gallery-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0) 50%
		);
		display: flex;
		align-items: flex-end;
		padding: var(--spacing-lg);
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.gallery-item:hover .gallery-overlay {
		opacity: 1;
	}

	.gallery-caption {
		color: white;
		font-size: 1rem;
		font-weight: 500;
		text-align: left;
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
		.gallery-section {
			padding: var(--spacing-2xl) 0;
		}

		.section-header {
			margin-bottom: var(--spacing-2xl);
		}

		.category-filters {
			margin-bottom: var(--spacing-2xl);
		}

		.filter-button {
			font-size: 0.875rem;
			padding: var(--spacing-xs) var(--spacing-md);
		}

		.gallery-caption {
			font-size: 0.875rem;
		}
	}
</style>
