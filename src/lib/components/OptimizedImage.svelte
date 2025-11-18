<script lang="ts">
	import { handleImageError } from '$lib/utils/image-optimizer';
	import type { OptimizedImageProps } from '$lib/types';

	interface Props extends OptimizedImageProps {
		src: string;
		alt: string;
		widths?: number[];
		loading?: 'lazy' | 'eager';
		className?: string;
		onError?: () => void;
	}

	let {
		src,
		alt,
		widths = [320, 640, 1024],
		loading = 'lazy',
		className = '',
		onError,
	}: Props = $props();

	let imageError = $state(false);

	const isViteImport = $derived(src.startsWith('/_app/') || src.startsWith('/src/'));

	function handleError(event: Event) {
		imageError = true;
		handleImageError(event);
		onError?.();
	}

	const fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="%23999"%3Eსურათი ვერ ჩაიტვირთა%3C/text%3E%3C/svg%3E';
</script>

{#if !imageError}

	<img
		{src}
		{alt}
		{loading}
		decoding="async"
		class={className}
		onerror={handleError}
	/>
{:else}

	<img
		src={fallbackSrc}
		alt="სურათი ვერ ჩაიტვირთა"
		loading="lazy"
		decoding="async"
		class={className}
	/>
{/if}

<style>
	img {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
