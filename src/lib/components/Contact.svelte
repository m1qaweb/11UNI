<script lang="ts">
	import type { ContactProps } from '$lib/types';
	import { restaurantInfo, getPhoneLink, getEmailLink } from '$lib/data/restaurant-info';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import ContactForm from './ContactForm.svelte';
	import { MapPin, Phone, Mail, Clock } from 'lucide-svelte';

	interface Props extends ContactProps {
		info?: typeof restaurantInfo;
	}

	let { info = restaurantInfo }: Props = $props();

	let sectionVisible = $state(false);
	let sectionElement: HTMLElement;

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
</script>

<section id="contact" class="contact-section section" bind:this={sectionElement}>
	<div class="container-custom">
		<div class="contact-content" class:visible={sectionVisible}>

			<div class="section-header">
				<h2 class="section-title">{UI_TEXT.contact.title}</h2>
				<div class="title-underline"></div>
				<p class="section-subtitle">
					{UI_TEXT.contact.subtitle}
				</p>
			</div>

			<div class="contact-grid">

				<div class="contact-info">

					<div class="info-card">
						<div class="info-icon">
							<MapPin size={24} aria-hidden="true" />
						</div>
						<div class="info-content">
							<h3 class="info-title">{UI_TEXT.restaurantInfo.address}</h3>
							<p class="info-text">{info.address}</p>
							{#if info.addressLine2}
								<p class="info-text">{info.addressLine2}</p>
							{/if}
							<p class="info-text">{info.city}, {info.country}</p>
							{#if info.postalCode}
								<p class="info-text">{info.postalCode}</p>
							{/if}
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">
							<Phone size={24} aria-hidden="true" />
						</div>
						<div class="info-content">
							<h3 class="info-title">{UI_TEXT.restaurantInfo.phone}</h3>
							<a href={getPhoneLink()} class="info-link">
								{info.phoneFormatted || info.phone}
							</a>
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">
							<Mail size={24} aria-hidden="true" />
						</div>
						<div class="info-content">
							<h3 class="info-title">{UI_TEXT.restaurantInfo.email}</h3>
							<a href={getEmailLink()} class="info-link">
								{info.email}
							</a>
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">
							<Clock size={24} aria-hidden="true" />
						</div>
						<div class="info-content">
							<h3 class="info-title">{UI_TEXT.restaurantInfo.hours}</h3>
							<div class="hours-list">
								{#each info.hours as dayHours}
									<div class="hours-row">
										<span class="hours-day">{dayHours.day}</span>
										<span class="hours-time" class:closed={dayHours.isClosed}>
											{dayHours.isClosed ? UI_TEXT.time.closed : dayHours.hours}
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<div class="contact-form-wrapper">
					<ContactForm />
				</div>
			</div>

			{#if info.mapEmbedUrl}
				<div class="map-container">
					<iframe
						src={info.mapEmbedUrl}
						width="100%"
						height="450"
						style="border:0;"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title={`${info.name} - ${UI_TEXT.restaurantInfo.location}`}
					></iframe>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-section {
		padding: var(--spacing-3xl) 0;
		background-color: var(--color-bg-light);
	}

	.contact-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.contact-content.visible {
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

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
		margin-bottom: var(--spacing-3xl);
	}

	@media (max-width: 1024px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-2xl);
		}
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.info-card {
		display: flex;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		background-color: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition: all var(--transition-fast);
	}

	.info-card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.info-icon {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-primary);
		color: white;
		border-radius: var(--radius-md);
	}

	.info-content {
		flex: 1;
	}

	.info-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: var(--spacing-sm);
	}

	.info-text {
		font-size: 1rem;
		color: var(--color-text-light);
		margin: 0;
		line-height: 1.6;
	}

	.info-link {
		display: inline-block;
		font-size: 1rem;
		color: var(--color-primary);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.info-link:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}

	.info-link:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.hours-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.hours-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-xs) 0;
		border-bottom: 1px solid var(--color-bg-light);
	}

	.hours-row:last-child {
		border-bottom: none;
	}

	.hours-day {
		font-size: 0.95rem;
		color: var(--color-text);
		font-weight: 500;
	}

	.hours-time {
		font-size: 0.95rem;
		color: var(--color-text-light);
	}

	.hours-time.closed {
		color: var(--color-error);
	}

	.contact-form-wrapper {
		background-color: white;
		padding: var(--spacing-2xl);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.map-container {
		width: 100%;
		height: 450px;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.map-container iframe {
		display: block;
	}

	@media (max-width: 768px) {
		.contact-section {
			padding: var(--spacing-2xl) 0;
		}

		.section-header {
			margin-bottom: var(--spacing-2xl);
		}

		.contact-grid {
			margin-bottom: var(--spacing-2xl);
		}

		.info-card {
			padding: var(--spacing-md);
			gap: var(--spacing-md);
		}

		.info-icon {
			width: 40px;
			height: 40px;
		}

		.info-title {
			font-size: 1rem;
		}

		.info-text,
		.info-link {
			font-size: 0.9375rem;
		}

		.contact-form-wrapper {
			padding: var(--spacing-lg);
		}

		.map-container {
			height: 350px;
		}
	}
</style>
