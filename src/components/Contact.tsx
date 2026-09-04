'use client';

import { useState } from 'react';
import { personalInfo } from '@/data/personalInfo';
import EmailProtected from './EmailProtected';
import SectionHeading from './SectionHeading';
import SocialLinks from './SocialLinks';
import Reveal from './Reveal';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const emptyForm: FormData = { name: '', email: '', message: '' };

function validate(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
  }

  return errors;
}

const MIN_MESSAGE_LENGTH = 10;

/**
 * Focus is shown with a neutral light border and halo rather than a coloured
 * ring, so the fields sit in the same white/5 + white/10 system as the cards
 * and chips instead of introducing a second accent.
 */
const fieldClassName = (hasError: boolean) =>
  `w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-colors focus:outline-none ${
    hasError
      ? 'border-red-400/60 focus:border-red-400/80 focus:ring-2 focus:ring-red-400/15'
      : 'border-white/10 hover:border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/15'
  }`;

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const trimmedMessage = formData.message.trim();
  const remainingCharacters = trimmedMessage.length
    ? MIN_MESSAGE_LENGTH - trimmedMessage.length
    : 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!accessKey) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmitStatus('success');
        setFormData(emptyForm);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field once the user starts fixing it.
    setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Have a project in mind or want to collaborate? Feel free to reach out!"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <Reveal className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Connect</h3>
              <p className="text-gray-300">
                I&apos;m always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to get in touch!
              </p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 ring-1 ring-blue-400/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <div className="text-white font-medium">
                  <EmailProtected />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 ring-1 ring-blue-400/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="text-white font-medium">{personalInfo.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-400 mb-4">Follow me on</p>
              <SocialLinks />
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={120}>
            <div className="rounded-xl bg-gray-800/50 p-6 shadow-lg ring-1 ring-white/10 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={fieldClassName(Boolean(errors.name))}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-2 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={fieldClassName(Boolean(errors.email))}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-2 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${fieldClassName(Boolean(errors.message))} resize-none`}
                    placeholder="Your message..."
                  />
                  {errors.message ? (
                    <p id="message-error" role="alert" className="mt-2 text-sm text-red-400">
                      {errors.message}
                    </p>
                  ) : (
                    remainingCharacters > 0 && (
                      <p className="mt-2 text-sm text-gray-500">
                        {remainingCharacters} more character{remainingCharacters === 1 ? '' : 's'} to go
                      </p>
                    )
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 disabled:shadow-none"
                >
                  {isSubmitting && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-500/10 text-green-300 ring-1 ring-green-400/20 rounded-lg flex items-center gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 text-red-300 ring-1 ring-red-400/20 rounded-lg flex items-center gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Failed to send message. Please try again or email me directly.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
