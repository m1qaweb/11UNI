<script lang="ts">
	import type { AboutProps } from '$lib/types';
	import { aboutContent } from '$lib/data/restaurant-info';

	interface Props extends AboutProps {
		title?: string;
		content?: string;
		highlights?: string[];
		image?: string;
	}

	let {
		title = aboutContent.title,
		content = aboutContent.story,
		highlights,
		image,
	}: Props = $props();

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
</script>

<section id="about" class="about-section section" bind:this={sectionElement}>
	<div class="container-custom">
		<div class="about-content" class:visible={sectionVisible}>

			<div class="section-header">
				<h2 class="section-title">{title}</h2>
				<div class="title-underline"></div>
			</div>

			<div class="about-text-container">
				<p class="story-text">{content}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: var(--spacing-3xl) 0;
		background-color: var(--color-bg);
	}

	.about-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.about-content.visible {
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
		background: linear-gradient(
			90deg,
			var(--color-primary),
			var(--color-secondary)
		);
		margin: 0 auto;
		border-radius: 2px;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-3xl);
	}

	@media (min-width: 1024px) {
		.about-grid {
			grid-template-columns: 1fr 1fr;
			gap: var(--spacing-3xl);
		}
	}

	.story-column {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.story-text {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-text-light);
		margin-bottom: var(--spacing-lg);
	}

	.mission-box {
		padding: var(--spacing-xl);
		background: linear-gradient(135deg, var(--color-primary)/5, var(--color-secondary)/5);
		border-left: 4px solid var(--color-primary);
		border-radius: var(--radius-md);
	}

	.mission-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--spacing-md);
	}

	.mission-text {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-text-light);
	}

	.highlights-column {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2xl);
	}

	.highlights-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.highlight-item {
		display: flex;
		gap: var(--spacing-md);
		align-items: flex-start;
		opacity: 0;
		animation: slideInRight 0.6s ease-out forwards;
	}

	.visible .highlight-item {
		animation-play-state: running;
	}

	.highlight-icon {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
	}

	.highlight-text {
		flex: 1;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text);
		padding-top: 8px;
	}

	.values-section {
		padding: var(--spacing-xl);
		background-color: var(--color-bg-light);
		border-radius: var(--radius-lg);
	}

	.values-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: var(--spacing-md);
	}

	.values-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.value-item {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-text-light);
		padding-left: var(--spacing-lg);
		position: relative;
	}

	.value-item::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--color-primary);
		font-weight: bold;
		font-size: 1.5rem;
		line-height: 1;
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media (max-width: 768px) {
		.about-section {
			padding: var(--spacing-2xl) 0;
		}

		.section-header {
			margin-bottom: var(--spacing-2xl);
		}

		.story-text {
			font-size: 1rem;
		}

		.mission-box {
			padding: var(--spacing-lg);
		}

		.values-section {
			padding: var(--spacing-lg);
		}
	}
</style>
