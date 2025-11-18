<script lang="ts">
	import type { HeroProps } from '$lib/types';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import { smoothScrollTo } from '$lib/utils/scroll';

	interface Props extends HeroProps {
		title: string;
		subtitle: string;
		backgroundImage?: string;
		ctaText?: string;
		ctaLink?: string;
	}

	import heroImage from '$assets/hero.png';

	let {
		title,
		subtitle,
		backgroundImage = heroImage,
		ctaText = UI_TEXT.common.viewMenu,
		ctaLink = '#menu',
	}: Props = $props();

	function handleCtaClick(event: MouseEvent, href: string) {
		event.preventDefault();
		const sectionId = href.replace('#', '');
		smoothScrollTo(sectionId, { offset: 80 });
		history.pushState(null, '', href);
	}
</script>

<section
	id="home"
	class="hero-section"
	style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('{backgroundImage}');"
>
	<div class="hero-content">
		<div class="container-custom">
			<div class="hero-text">
				<h1 class="hero-title animate-fade-in">
					{title}
				</h1>
				<p class="hero-subtitle animate-slide-up">
					{subtitle}
				</p>
				<div class="hero-actions animate-slide-up">
					<a
						href={ctaLink}
						class="btn btn-primary btn-lg"
						onclick={(e) => handleCtaClick(e, ctaLink)}
					>
						{ctaText}
					</a>
					<a
						href="#contact"
						class="btn btn-outline btn-lg"
						onclick={(e) => handleCtaClick(e, '#contact')}
					>
						{UI_TEXT.buttons.reserve}
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="scroll-indicator">
		<button
			class="scroll-button"
			onclick={(e) => handleCtaClick(e, '#about')}
			aria-label="გადასვლა შემდეგ სექციაზე"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</button>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		scroll-margin-top: 0;
	}

	@media (max-width: 768px) {
		.hero-section {
			background-attachment: scroll;
		}
	}

	.hero-content {
		position: relative;
		z-index: 2;
		width: 100%;
		padding: var(--spacing-3xl) 0;
	}

	.hero-text {
		text-align: center;
		color: white;
	}

	.hero-title {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 700;
		margin-bottom: var(--spacing-lg);
		line-height: 1.1;
		color: white !important;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
		animation: fadeIn 1s ease-out;
	}

	.hero-subtitle {
		font-size: clamp(1.25rem, 4vw, 2rem);
		font-weight: 400;
		margin-bottom: var(--spacing-2xl);
		line-height: 1.4;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
		animation: slideUp 1s ease-out 0.2s both;
	}

	.hero-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
		animation: slideUp 1s ease-out 0.4s both;
	}

	.btn-lg {
		padding: var(--spacing-md) var(--spacing-2xl);
		font-size: 1.125rem;
		min-width: 160px;
	}

	.scroll-indicator {
		position: absolute;
		bottom: calc(var(--spacing-2xl) + var(--spacing-xl));
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		animation: bounce 2s infinite;
	}

	.scroll-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.scroll-button:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(4px);
	}

	.scroll-button:focus-visible {
		outline: 3px solid white;
		outline-offset: 4px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		40% {
			transform: translateX(-50%) translateY(-10px);
		}
		60% {
			transform: translateX(-50%) translateY(-5px);
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			min-height: 100svh; 
		}

		.hero-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.btn-lg {
			width: 100%;
			max-width: 300px;
			margin: 0 auto;
		}

		.scroll-indicator {
			bottom: var(--spacing-xl);
		}
	}
</style>
