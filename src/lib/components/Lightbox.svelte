<script lang="ts">
	import type { LightboxProps } from '$lib/types';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props extends LightboxProps {
		images: LightboxProps['images'];
		currentIndex: number;
		isOpen: boolean;
		onClose: () => void;
		onNext?: () => void;
		onPrevious?: () => void;
	}

	let { images, currentIndex, isOpen, onClose, onNext, onPrevious }: Props = $props();

	let currentImage = $derived(images[currentIndex]);
	let hasNext = $derived(currentIndex < images.length - 1);
	let hasPrevious = $derived(currentIndex > 0);

	$effect(() => {
		if (!isOpen) return;

		function handleKeydown(e: KeyboardEvent) {
			switch (e.key) {
				case 'Escape':
					onClose();
					break;
				case 'ArrowLeft':
					if (hasPrevious && onPrevious) {
						onPrevious();
					}
					break;
				case 'ArrowRight':
					if (hasNext && onNext) {
						onNext();
					}
					break;
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	let touchStartX = $state(0);
	let touchEndX = $state(0);

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].clientX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartX - touchEndX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0 && hasNext && onNext) {

				onNext();
			} else if (diff < 0 && hasPrevious && onPrevious) {

				onPrevious();
			}
		}
	}
</script>

{#if isOpen && currentImage}
	<div
		class="lightbox-overlay"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="lightbox-caption"
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<div class="lightbox-container">

			<button
				class="lightbox-close"
				onclick={onClose}
				aria-label={UI_TEXT.a11y.closeLightbox}
			>
				<X size={32} aria-hidden="true" />
			</button>

			{#if hasPrevious && onPrevious}
				<button
					class="lightbox-nav lightbox-prev"
					onclick={onPrevious}
					aria-label={UI_TEXT.a11y.previousImage}
				>
					<ChevronLeft size={48} aria-hidden="true" />
				</button>
			{/if}

			<div class="lightbox-image-wrapper">
				<img
					src={currentImage.src}
					alt={currentImage.alt}
					class="lightbox-image"
					loading="eager"
				/>
			</div>

			{#if hasNext && onNext}
				<button
					class="lightbox-nav lightbox-next"
					onclick={onNext}
					aria-label={UI_TEXT.a11y.nextImage}
				>
					<ChevronRight size={48} aria-hidden="true" />
				</button>
			{/if}

			{#if currentImage.caption || currentImage.alt}
				<div class="lightbox-caption" id="lightbox-caption">
					<p>{currentImage.caption || currentImage.alt}</p>
					<span class="lightbox-counter">
						{currentIndex + 1} / {images.length}
					</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.95);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.lightbox-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-3xl);
	}

	@media (max-width: 768px) {
		.lightbox-container {
			padding: var(--spacing-xl);
		}
	}

	.lightbox-close {
		position: absolute;
		top: var(--spacing-lg);
		right: var(--spacing-lg);
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
		z-index: 10;
	}

	.lightbox-close:hover {
		background-color: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}

	.lightbox-close:focus-visible {
		outline: 3px solid white;
		outline-offset: 2px;
	}

	@media (max-width: 768px) {
		.lightbox-close {
			top: var(--spacing-sm);
			right: var(--spacing-sm);
			width: 40px;
			height: 40px;
		}
	}

	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
		z-index: 10;
	}

	.lightbox-nav:hover {
		background-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-50%) scale(1.1);
	}

	.lightbox-nav:focus-visible {
		outline: 3px solid white;
		outline-offset: 2px;
	}

	.lightbox-prev {
		left: var(--spacing-lg);
	}

	.lightbox-next {
		right: var(--spacing-lg);
	}

	@media (max-width: 768px) {
		.lightbox-nav {
			width: 48px;
			height: 48px;
		}

		.lightbox-prev {
			left: var(--spacing-sm);
		}

		.lightbox-next {
			right: var(--spacing-sm);
		}
	}

	.lightbox-image-wrapper {
		max-width: 90%;
		max-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 80vh;
		width: auto;
		height: auto;
		object-fit: contain;
		animation: zoomIn 0.3s ease-out;
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (max-width: 768px) {
		.lightbox-image-wrapper {
			max-width: 100%;
			max-height: 70vh;
		}

		.lightbox-image {
			max-height: 70vh;
		}
	}

	.lightbox-caption {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		padding: var(--spacing-3xl) var(--spacing-lg) var(--spacing-lg);
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.lightbox-caption p {
		font-size: 1.125rem;
		margin: 0;
	}

	.lightbox-counter {
		font-size: 0.875rem;
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		.lightbox-caption {
			padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-md);
		}

		.lightbox-caption p {
			font-size: 1rem;
		}

		.lightbox-counter {
			font-size: 0.8125rem;
		}
	}
</style>
