<script lang="ts">
	import type { MenuItemProps } from '$lib/types';
	import OptimizedImage from './OptimizedImage.svelte';

	interface Props extends MenuItemProps {
		item: MenuItemProps['item'];
		onClick?: () => void;
	}

	let { item, onClick }: Props = $props();

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}

	function formatPrice(price: number): string {
		return `${price} ₾`;
	}
</script>

<div class="menu-item-card" role="button" tabindex="0" onclick={onClick} onkeydown={(e) => e.key === 'Enter' && onClick?.()}>

	<div class="item-image-container">
		{#if !imageError}
			<OptimizedImage
				src={item.image}
				alt={item.name}
				widths={[320, 640]}
				loading="lazy"
				className="item-image"
				onError={handleImageError}
			/>
		{:else}
			<div class="image-placeholder">
				<svg
					width="64"
					height="64"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
					<circle cx="8.5" cy="8.5" r="1.5"></circle>
					<polyline points="21 15 16 10 5 21"></polyline>
				</svg>
			</div>
		{/if}

		<div class="item-badges">
			{#if item.isVegetarian}
				<span class="badge badge-vegetarian" title="ვეგეტარიანული">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"></path>
						<path d="M12 6v12"></path>
						<path d="M6 12h12"></path>
					</svg>
					<span class="sr-only">ვეგეტარიანული</span>
				</span>
			{/if}
			{#if item.isSpicy}
				<span class="badge badge-spicy" title="ცხარე">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
						/>
					</svg>
					<span class="sr-only">ცხარე</span>
				</span>
			{/if}
		</div>
	</div>

	<div class="item-content">
		<div class="item-header">
			<h3 class="item-name">{item.name}</h3>
			<span class="item-price">{formatPrice(item.price)}</span>
		</div>

		<p class="item-description">{item.description}</p>

		{#if item.allergens && item.allergens.length > 0}
			<div class="item-allergens">
				<span class="allergens-label">ალერგენები:</span>
				<span class="allergens-list">{item.allergens.join(', ')}</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.menu-item-card {
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
		transition: all var(--transition-base);
		cursor: pointer;
		height: 100%;
	}

	.menu-item-card:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-4px);
	}

	.menu-item-card:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.item-image-container {
		position: relative;
		width: 100%;
		padding-top: 66.67%; 
		overflow: hidden;
		background-color: var(--color-bg-light);
	}

	:global(.item-image) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-base);
	}

	.menu-item-card:hover :global(.item-image) {
		transform: scale(1.05);
	}

	.image-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-bg-light);
		color: var(--color-text-lighter);
	}

	.item-badges {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		display: flex;
		gap: var(--spacing-xs);
	}

	.badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: white;
		box-shadow: var(--shadow-sm);
	}

	.badge-vegetarian {
		color: #059669;
	}

	.badge-spicy {
		color: #dc2626;
	}

	.item-content {
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		flex: 1;
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xs);
	}

	.item-name {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text);
		line-height: 1.3;
		flex: 1;
	}

	.item-price {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		white-space: nowrap;
	}

	.item-description {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-text-light);
		flex: 1;
	}

	.item-allergens {
		font-size: 0.875rem;
		color: var(--color-text-lighter);
		padding-top: var(--spacing-sm);
		border-top: 1px solid var(--color-bg-light);
	}

	.allergens-label {
		font-weight: 600;
	}

	.allergens-list {
		font-style: italic;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	@media (max-width: 768px) {
		.item-content {
			padding: var(--spacing-md);
		}

		.item-name {
			font-size: 1.125rem;
		}

		.item-price {
			font-size: 1.125rem;
		}

		.item-description {
			font-size: 0.875rem;
		}
	}
</style>
