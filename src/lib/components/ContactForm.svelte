<script lang="ts">
	import type { ContactFormProps, FormData, FormErrors, MessageType } from '$lib/types';
	import { UI_TEXT } from '$lib/constants/georgian-text';
	import { validateForm, validateField, sanitizeInput } from '$lib/utils/validation';
	import { Send, Loader2 } from 'lucide-svelte';

	interface Props extends ContactFormProps {
		onSubmit?: (data: FormData) => Promise<void>;
		initialMessageType?: MessageType;
	}

	let { onSubmit, initialMessageType = 'inquiry' }: Props = $props();

	let formData = $state<FormData>({
		name: '',
		phone: '',
		email: '',
		messageType: initialMessageType,
		message: ''
	});

	let errors = $state<FormErrors>({});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	let lastSubmitTime = $state(0);
	const RATE_LIMIT_MS = 30000; // 30 seconds

	function handleInputChange(field: keyof FormData, value: string) {
		formData[field] = sanitizeInput(value) as any;

		if (errors[field]) {
			const newErrors = { ...errors };
			delete newErrors[field];
			errors = newErrors;
		}
	}

	function handleBlur(field: keyof FormData) {
		const error = validateField(field, formData[field]);
		if (error) {
			errors = { ...errors, [field]: error };
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		submitSuccess = false;
		submitError = '';

		const validation = validateForm(formData);
		if (!validation.isValid) {
			errors = validation.errors;
			return;
		}

		const now = Date.now();
		if (now - lastSubmitTime < RATE_LIMIT_MS) {
			const remainingSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
			submitError = `გთხოვთ დაელოდოთ ${remainingSeconds} წამი შემდეგი გაგზავნამდე`;
			return;
		}

		isSubmitting = true;

		try {
			if (onSubmit) {
				await onSubmit(formData);
			} else {

				await submitToFormSubmit(formData);
			}

			submitSuccess = true;
			lastSubmitTime = Date.now();

			setTimeout(() => {
				formData = {
					name: '',
					phone: '',
					email: '',
					messageType: 'inquiry',
					message: ''
				};
				submitSuccess = false;
			}, 5000);
		} catch (error) {
			console.error('Form submission error:', error);
			submitError = UI_TEXT.errors.serverError;
		} finally {
			isSubmitting = false;
		}
	}

	async function submitToFormSubmit(data: FormData) {

		const formSubmitUrl = 'https://formsubmit.co/your-email@example.com';

		const response = await fetch(formSubmitUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				phone: data.phone,
				email: data.email,
				messageType: data.messageType,
				message: data.message,
				_subject: `ახალი შეტყობინება: ${data.messageType}`,
				_template: 'table'
			})
		});

		if (!response.ok) {
			throw new Error('Form submission failed');
		}
	}
</script>

<form class="contact-form" onsubmit={handleSubmit} novalidate>
	<h3 class="form-title">{UI_TEXT.contact.sendMessage}</h3>

	<div class="form-group">
		<label for="name" class="form-label">
			{UI_TEXT.form.name}
			<span class="required" aria-label={UI_TEXT.form.required}>*</span>
		</label>
		<input
			id="name"
			type="text"
			class="form-input"
			class:error={errors.name}
			value={formData.name}
			oninput={(e) => handleInputChange('name', e.currentTarget.value)}
			onblur={() => handleBlur('name')}
			placeholder={UI_TEXT.form.placeholders.name}
			required
			aria-required="true"
			aria-invalid={!!errors.name}
			aria-describedby={errors.name ? 'name-error' : undefined}
			disabled={isSubmitting}
		/>
		{#if errors.name}
			<span id="name-error" class="error-message" role="alert">
				{errors.name}
			</span>
		{/if}
	</div>

	<div class="form-group">
		<label for="phone" class="form-label">
			{UI_TEXT.form.phone}
			<span class="required" aria-label={UI_TEXT.form.required}>*</span>
		</label>
		<input
			id="phone"
			type="tel"
			class="form-input"
			class:error={errors.phone}
			value={formData.phone}
			oninput={(e) => handleInputChange('phone', e.currentTarget.value)}
			onblur={() => handleBlur('phone')}
			placeholder={UI_TEXT.form.placeholders.phone}
			required
			aria-required="true"
			aria-invalid={!!errors.phone}
			aria-describedby={errors.phone ? 'phone-error' : undefined}
			disabled={isSubmitting}
		/>
		{#if errors.phone}
			<span id="phone-error" class="error-message" role="alert">
				{errors.phone}
			</span>
		{/if}
	</div>

	<div class="form-group">
		<label for="email" class="form-label">
			{UI_TEXT.form.email}
			<span class="required" aria-label={UI_TEXT.form.required}>*</span>
		</label>
		<input
			id="email"
			type="email"
			class="form-input"
			class:error={errors.email}
			value={formData.email}
			oninput={(e) => handleInputChange('email', e.currentTarget.value)}
			onblur={() => handleBlur('email')}
			placeholder={UI_TEXT.form.placeholders.email}
			required
			aria-required="true"
			aria-invalid={!!errors.email}
			aria-describedby={errors.email ? 'email-error' : undefined}
			disabled={isSubmitting}
		/>
		{#if errors.email}
			<span id="email-error" class="error-message" role="alert">
				{errors.email}
			</span>
		{/if}
	</div>

	<div class="form-group">
		<label for="messageType" class="form-label">
			{UI_TEXT.form.messageType}
			<span class="required" aria-label={UI_TEXT.form.required}>*</span>
		</label>
		<select
			id="messageType"
			class="form-select"
			class:error={errors.messageType}
			value={formData.messageType}
			onchange={(e) => handleInputChange('messageType', e.currentTarget.value)}
			required
			aria-required="true"
			aria-invalid={!!errors.messageType}
			disabled={isSubmitting}
		>
			<option value="reservation">{UI_TEXT.form.messageTypes.reservation}</option>
			<option value="inquiry">{UI_TEXT.form.messageTypes.inquiry}</option>
			<option value="feedback">{UI_TEXT.form.messageTypes.feedback}</option>
		</select>
		{#if errors.messageType}
			<span id="messageType-error" class="error-message" role="alert">
				{errors.messageType}
			</span>
		{/if}
	</div>

	<div class="form-group">
		<label for="message" class="form-label">
			{UI_TEXT.form.message}
			<span class="required" aria-label={UI_TEXT.form.required}>*</span>
		</label>
		<textarea
			id="message"
			class="form-textarea"
			class:error={errors.message}
			value={formData.message}
			oninput={(e) => handleInputChange('message', e.currentTarget.value)}
			onblur={() => handleBlur('message')}
			placeholder={UI_TEXT.form.placeholders.message}
			rows="5"
			required
			aria-required="true"
			aria-invalid={!!errors.message}
			aria-describedby={errors.message ? 'message-error' : undefined}
			disabled={isSubmitting}
		></textarea>
		{#if errors.message}
			<span id="message-error" class="error-message" role="alert">
				{errors.message}
			</span>
		{/if}
	</div>

	<button
		type="submit"
		class="submit-button"
		disabled={isSubmitting}
		aria-busy={isSubmitting}
	>
		{#if isSubmitting}
			<Loader2 size={20} class="spinner" aria-hidden="true" />
			{UI_TEXT.messages.sending}
		{:else}
			<Send size={20} aria-hidden="true" />
			{UI_TEXT.buttons.send}
		{/if}
	</button>

	{#if submitSuccess}
		<div class="success-message" role="status" aria-live="polite">
			{UI_TEXT.messages.success}
		</div>
	{/if}

	{#if submitError}
		<div class="error-message-box" role="alert" aria-live="assertive">
			{submitError}
		</div>
	{/if}
</form>

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0 0 var(--spacing-md) 0;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-label {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.required {
		color: var(--color-error);
		margin-left: 2px;
	}

	.form-input,
	.form-select,
	.form-textarea {
		padding: var(--spacing-sm) var(--spacing-md);
		border: 2px solid var(--color-bg-light);
		border-radius: var(--radius-md);
		font-size: 1rem;
		font-family: var(--font-georgian);
		color: var(--color-text);
		background-color: white;
		transition: all var(--transition-fast);
	}

	.form-input:focus,
	.form-select:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1);
	}

	.form-input.error,
	.form-select.error,
	.form-textarea.error {
		border-color: var(--color-error);
	}

	.form-input:disabled,
	.form-select:disabled,
	.form-textarea:disabled {
		background-color: var(--color-bg-light);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.error-message {
		font-size: 0.875rem;
		color: var(--color-error);
		margin-top: var(--spacing-xs);
	}

	.submit-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-xl);
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		margin-top: var(--spacing-sm);
	}

	.submit-button:hover:not(:disabled) {
		background-color: var(--color-primary-dark);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.submit-button:disabled {
		background-color: var(--color-text-light);
		cursor: not-allowed;
		transform: none;
	}

	.submit-button:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	.spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.success-message {
		padding: var(--spacing-md);
		background-color: var(--color-success-bg);
		color: var(--color-success);
		border-radius: var(--radius-md);
		text-align: center;
		font-weight: 500;
	}

	.error-message-box {
		padding: var(--spacing-md);
		background-color: var(--color-error-bg);
		color: var(--color-error);
		border-radius: var(--radius-md);
		text-align: center;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.form-title {
			font-size: 1.25rem;
		}

		.form-input,
		.form-select,
		.form-textarea {
			font-size: 0.9375rem;
		}

		.submit-button {
			padding: var(--spacing-sm) var(--spacing-lg);
		}
	}
</style>
