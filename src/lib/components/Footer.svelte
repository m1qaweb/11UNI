<script lang="ts">
	import type { FooterProps } from '$lib/types';
	import { restaurantInfo } from '$lib/data/restaurant-info';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import SocialLinks from './SocialLinks.svelte';
	import { MapPin, Phone, Mail, Clock } from 'lucide-svelte';

	interface Props extends FooterProps {
		restaurantName?: string;
		socialLinks?: FooterProps['socialLinks'];
		copyrightText?: string;
		showSocial?: boolean;
	}

	let {
		restaurantName = restaurantInfo.name,
		socialLinks = restaurantInfo.social,
		copyrightText,
		showSocial = true
	}: Props = $props();

	let currentYear = $derived(new Date().getFullYear());

	let copyright = $derived(
		copyrightText || `© ${currentYear} ${restaurantName}. ${UI_TEXT.footer.allRightsReserved}`
	);

	const quickLinks = [
		{ label: UI_TEXT.navigation.home, href: '/' },
		{ label: UI_TEXT.navigation.about, href: '/#about' },
		{ label: UI_TEXT.navigation.menu, href: '/menu' }
	];
</script>

<footer class="footer" role="contentinfo">
	<div class="footer-content">
		<div class="container-custom">
			<div class="footer-grid">

				<div class="footer-column">
					<h3 class="footer-heading">{restaurantName}</h3>
					<p class="footer-tagline">{restaurantInfo.tagline}</p>
					<p class="footer-description">
						{restaurantInfo.description}
					</p>
				</div>

				<div class="footer-column">
					<h3 class="footer-heading">{UI_TEXT.navigation.menu}</h3>
					<nav aria-label="ქვედა ნავიგაცია">
						<ul class="footer-links">
							{#each quickLinks as link}
								<li>
									<a href={link.href} class="footer-link">
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>

				<div class="footer-column">
					<h3 class="footer-heading">{UI_TEXT.restaurantInfo.contactUs}</h3>
					<ul class="footer-contact">
						<li class="contact-item">
							<MapPin size={18} aria-hidden="true" />
							<span>{restaurantInfo.address}, {restaurantInfo.city}</span>
						</li>
						<li class="contact-item">
							<Phone size={18} aria-hidden="true" />
							<a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`} class="contact-link">
								{restaurantInfo.phoneFormatted || restaurantInfo.phone}
							</a>
						</li>
						<li class="contact-item">
							<Mail size={18} aria-hidden="true" />
							<a href={`mailto:${restaurantInfo.email}`} class="contact-link">
								{restaurantInfo.email}
							</a>
						</li>
						<li class="contact-item">
							<Clock size={18} aria-hidden="true" />
							<span>{UI_TEXT.restaurantInfo.hours}</span>
						</li>
					</ul>
				</div>

				{#if showSocial && socialLinks.length > 0}
					<div class="footer-column">
						<h3 class="footer-heading">{UI_TEXT.restaurantInfo.followUs}</h3>
						<p class="footer-social-text">
							{UI_TEXT.social.followUsOn} {UI_TEXT.restaurantInfo.socialMedia}
						</p>
						<div class="footer-social">
							<SocialLinks links={socialLinks} variant="horizontal" size="medium" />
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="footer-bottom">
		<div class="container-custom">
			<div class="footer-bottom-content">
				<p class="copyright">{copyright}</p>
				<div class="footer-bottom-links">
					<a href="/privacy" class="footer-bottom-link">
						{UI_TEXT.footer.privacyPolicy}
					</a>
					<span class="separator">•</span>
					<a href="/terms" class="footer-bottom-link">
						{UI_TEXT.footer.termsOfService}
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(135deg, var(--color-primary) 0%, #6b0000 100%);
		color: white;
		margin-top: auto;
	}

	.footer-content {
		padding: var(--spacing-3xl) 0 var(--spacing-2xl);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-3xl);
	}

	@media (max-width: 1024px) {
		.footer-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-2xl);
		}
	}

	@media (max-width: 640px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
		}
	}

	.footer-column {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.footer-heading {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 var(--spacing-sm) 0;
		color: white;
	}

	.footer-tagline {
		font-size: 1rem;
		font-weight: 500;
		margin: 0;
		opacity: 0.9;
	}

	.footer-description {
		font-size: 0.9375rem;
		line-height: 1.6;
		margin: 0;
		opacity: 0.8;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.footer-link {
		color: white;
		text-decoration: none;
		font-size: 0.9375rem;
		opacity: 0.8;
		transition: all var(--transition-fast);
		display: inline-block;
	}

	.footer-link:hover {
		opacity: 1;
		color: var(--color-secondary);
		transform: translateX(4px);
	}

	.footer-link:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.footer-contact {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.contact-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-sm);
		font-size: 0.9375rem;
		opacity: 0.8;
	}

	.contact-item :global(svg) {
		flex-shrink: 0;
		margin-top: 2px;
		opacity: 0.7;
	}

	.contact-link {
		color: white;
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.contact-link:hover {
		color: var(--color-secondary);
		text-decoration: underline;
	}

	.contact-link:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.footer-social-text {
		font-size: 0.9375rem;
		margin: 0;
		opacity: 0.8;
	}

	.footer-social {
		margin-top: var(--spacing-sm);
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: var(--spacing-lg) 0;
	}

	.footer-bottom-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.copyright {
		font-size: 0.875rem;
		margin: 0;
		opacity: 0.7;
	}

	.footer-bottom-links {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: 0.875rem;
	}

	.footer-bottom-link {
		color: white;
		text-decoration: none;
		opacity: 0.7;
		transition: all var(--transition-fast);
	}

	.footer-bottom-link:hover {
		opacity: 1;
		color: var(--color-secondary);
	}

	.footer-bottom-link:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.separator {
		opacity: 0.5;
	}

	@media (max-width: 768px) {
		.footer-content {
			padding: var(--spacing-2xl) 0 var(--spacing-xl);
		}

		.footer-heading {
			font-size: 1.125rem;
		}

		.footer-description,
		.footer-link,
		.contact-item,
		.footer-social-text {
			font-size: 0.875rem;
		}

		.footer-bottom-content {
			flex-direction: column;
			text-align: center;
		}

		.copyright,
		.footer-bottom-link {
			font-size: 0.8125rem;
		}
	}
</style>
