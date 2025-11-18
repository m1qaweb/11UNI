<script lang="ts">
	import OptimizedImage from './OptimizedImage.svelte';
	import { ShoppingCart, ChevronDown, ChevronUp, Check } from 'lucide-svelte';
	import { cart } from '$lib/stores/cart';
	import { toast } from '$lib/stores/toast';

	interface Props {
		id: string;
		title: string;
		description: string;
		price: number;
		image: string;
	}

	let { id, title, description, price, image }: Props = $props();

	let isExpanded = $state(false);
	let descriptionElement: HTMLParagraphElement;
	let isTruncated = $state(false);

	function formatPrice(price: number): string {
		return `${price} ₾`;
	}

	$effect(() => {
		if (descriptionElement) {
			isTruncated = descriptionElement.scrollHeight > descriptionElement.clientHeight;
		}
	});

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}

	let isAdding = $state(false);
	let isAdded = $state(false);

	function handleAddToCart() {
		isAdding = true;

		cart.addItem({
			id,
			title,
			price,
			image
		});

		toast.show(`${title} დაემატა კალათაში`, 'success');

		setTimeout(() => {
			isAdding = false;
			isAdded = true;
			setTimeout(() => {
				isAdded = false;
			}, 1500);
		}, 300);
	}
</script>

<div class="package-card">
	<div class="package-image-container">
		<OptimizedImage
			src={image}
			alt={title}
			widths={[400, 600]}
			loading="lazy"
			className="package-image"
		/>
	</div>

	<div class="package-content">
		<h3 class="package-title">{title}</h3>

		<div class="description-container">
			<p class="package-description" class:expanded={isExpanded} bind:this={descriptionElement}>
				{description}
			</p>

			{#if isTruncated && !isExpanded}
				<div class="description-fade"></div>
			{/if}
		</div>

		{#if isTruncated}
			<button class="read-more-button" onclick={toggleExpanded}>
				ვრცლად
				{#if isExpanded}
					<ChevronUp size={16} />
				{:else}
					<ChevronDown size={16} />
				{/if}
			</button>
		{/if}

		<div class="package-footer">
			<span class="package-price">{formatPrice(price)}</span>
			<button 
				class="add-button" 
				class:adding={isAdding}
				class:added={isAdded}
				onclick={handleAddToCart}
				disabled={isAdding || isAdded}
				aria-label={`დამატება: ${title}`}
			>
				{#if isAdded}
					<Check size={18} aria-hidden="true" />
					დაემატა
				{:else}
					<ShoppingCart size={18} aria-hidden="true" />
					დამატება
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.package-card {
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		transition: all var(--transition-normal);
		height: 100%;
	}

	.package-card:hover {
		box-shadow: var(--shadow-xl);
		transform: translateY(-4px);
	}

	.package-image-container {
		position: relative;
		width: 100%;
		padding-top: 75%; 
		overflow: hidden;
		background-color: var(--color-bg-light);
	}

	:global(.package-image) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.package-card:hover :global(.package-image) {
		transform: scale(1.05);
	}

	.package-content {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-lg);
		flex: 1;
	}

	.package-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0 0 var(--spacing-sm) 0;
		line-height: 1.3;
	}

	.description-container {
		position: relative;
		margin-bottom: var(--spacing-sm);
		flex: 1;
	}

	.package-description {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--color-text-light);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.package-description.expanded {
		display: block;
		-webkit-line-clamp: unset;
		max-height: none;
	}

	.description-fade {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30px;
		background: linear-gradient(to bottom, transparent, white);
		pointer-events: none;
	}

	.package-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-md);
		margin-top: auto;
	}

	.package-price {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-text);
	}

	.add-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.add-button:hover {
		background: linear-gradient(135deg, var(--color-primary) 0%, #6b0000 100%);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.add-button:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.add-button:active {
		transform: translateY(0);
	}

	.add-button.adding {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.add-button.added {
		background: linear-gradient(135deg, #28a745 0%, #20863a 100%);
		cursor: default;
	}

	.add-button.added:hover {
		transform: translateY(0);
		background: linear-gradient(135deg, #28a745 0%, #20863a 100%);
	}

	.add-button:disabled {
		cursor: not-allowed;
	}

	.read-more-button {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 12px;
		background: transparent;
		color: var(--color-primary);
		border: none;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		margin-bottom: var(--spacing-sm);
		align-self: flex-start;
	}

	.read-more-button:hover {
		background: rgba(139, 0, 0, 0.05);
		gap: 6px;
	}

	.read-more-button:active {
		transform: scale(0.98);
	}

	@media (max-width: 768px) {
		.package-content {
			padding: var(--spacing-md);
		}

		.package-title {
			font-size: 1.125rem;
		}

		.package-description {
			font-size: 0.875rem;
		}

		.package-price {
			font-size: 1rem;
		}

		.add-button {
			font-size: 0.875rem;
			padding: var(--spacing-xs) var(--spacing-md);
		}

		.read-more-button {
			font-size: 0.8125rem;
		}
	}
</style>
