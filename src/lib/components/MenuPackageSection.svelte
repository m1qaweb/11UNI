<script lang="ts">
	import MenuPackageCard from './MenuPackageCard.svelte';

	interface Package {
		id: string;
		title: string;
		description: string;
		price: number;
		image: string;
	}

	interface Props {
		title: string;
		packages: Package[];
		columns?: 3 | 4;
	}

	let { title, packages, columns = 3 }: Props = $props();

	let sectionVisible = $state(false);
	let sectionElement: HTMLElement;

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

	function handleAddToCart(pkg: Package) {
		console.log('Add to cart:', pkg);

	}
</script>

<section class="package-section" bind:this={sectionElement}>
	<div class="container-custom">
		<div class="package-content" class:visible={sectionVisible}>
			<h2 class="section-title">{title}</h2>

			<div class="packages-grid" class:grid-4={columns === 4}>
				{#each packages as pkg, index}
					<div 
						class="package-item"
						style="animation-delay: {index * 0.1}s"
					>
						<MenuPackageCard
							id={pkg.id}
							title={pkg.title}
							description={pkg.description}
							price={pkg.price}
							image={pkg.image}
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.package-section {
		padding: var(--spacing-3xl) 0;
		background-color: white;
	}

	.package-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.package-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-title {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: var(--spacing-2xl);
	}

	.packages-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--spacing-2xl);
		align-items: stretch;
	}

	.packages-grid.grid-4 {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--spacing-xl);
	}

	@media (min-width: 1200px) {
		.packages-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.packages-grid.grid-4 {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 768px) and (max-width: 1199px) {
		.packages-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.packages-grid.grid-4 {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 767px) {
		.packages-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}
	}

	.package-item {
		opacity: 0;
		animation: fadeInUp 0.6s ease-out forwards;
		display: flex;
		height: 100%;
	}

	.package-item :global(.package-card) {
		width: 100%;
	}

	.visible .package-item {
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
		.package-section {
			padding: var(--spacing-2xl) 0;
		}

		.section-title {
			margin-bottom: var(--spacing-xl);
		}
	}
</style>
