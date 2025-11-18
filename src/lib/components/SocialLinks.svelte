<script lang="ts">
	import type { SocialLinksProps, SocialPlatform } from '$lib/types';
	import { Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-svelte';

	interface Props extends SocialLinksProps {
		links: SocialLinksProps['links'];
		variant?: 'horizontal' | 'vertical';
		size?: 'small' | 'medium' | 'large';
	}

	let { links, variant = 'horizontal', size = 'medium' }: Props = $props();

	const iconSizes = {
		small: 18,
		medium: 24,
		large: 32
	};

	let iconSize = $derived(iconSizes[size]);

	function getIconComponent(platform: SocialPlatform) {
		switch (platform) {
			case 'facebook':
				return Facebook;
			case 'instagram':
				return Instagram;
			case 'youtube':
				return Youtube;
			case 'twitter':
				return Twitter;
			case 'linkedin':
				return Linkedin;
			default:
				return Facebook;
		}
	}
</script>

<div class="social-links" class:horizontal={variant === 'horizontal'} class:vertical={variant === 'vertical'}>
	{#each links as link}
		{@const IconComponent = getIconComponent(link.platform)}
		<a
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			class="social-link"
			class:small={size === 'small'}
			class:medium={size === 'medium'}
			class:large={size === 'large'}
			aria-label={link.label}
			title={link.label}
		>
			<svelte:component this={IconComponent} size={iconSize} aria-hidden="true" />
			<span class="sr-only">{link.label}</span>
		</a>
	{/each}
</div>

<style>
	.social-links {
		display: flex;
		gap: var(--spacing-md);
	}

	.social-links.horizontal {
		flex-direction: row;
		align-items: center;
	}

	.social-links.vertical {
		flex-direction: column;
		align-items: flex-start;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
		text-decoration: none;
		transition: all var(--transition-fast);
		position: relative;
	}

	.social-link.small {
		width: 36px;
		height: 36px;
	}

	.social-link.medium {
		width: 44px;
		height: 44px;
	}

	.social-link.large {
		width: 52px;
		height: 52px;
	}

	.social-link:hover {
		background-color: var(--color-secondary);
		color: var(--color-text);
		transform: translateY(-3px);
		box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
	}

	.social-link:focus-visible {
		outline: 3px solid var(--color-secondary);
		outline-offset: 2px;
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
		.social-links {
			gap: var(--spacing-sm);
		}

		.social-link {
			width: 40px;
			height: 40px;
		}

		.social-link.small {
			width: 32px;
			height: 32px;
		}

		.social-link.large {
			width: 48px;
			height: 48px;
		}
	}
</style>
