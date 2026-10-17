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

const fieldClassName = (hasError: boolean) =>
  `w-full rounded-xl border bg-surface px-4 py-3 text-fg placeholder:text-faint transition-colors focus:outline-none ${
    hasError
      ? 'border-danger/60 focus:border-danger focus:ring-2 focus:ring-danger/20'
      : 'border-line hover:border-line-strong focus:border-accent/70 focus:ring-2 focus:ring-accent/15'
  }`;

const labelClassName = 'mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-faint';

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
    <section id="contact" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something <span className="em">together.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-[11rem_1fr] lg:gap-10">
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-muted">
                I&apos;m open to hearing about new roles, freelance work and interesting side projects.
                Whether you have a question or just want to say hi, my inbox is open.
              </p>

              <div className="mt-10">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-faint">Email</p>
                <EmailProtected className="text-xl font-medium text-fg sm:text-2xl" />
              </div>

              <div className="mt-8">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-faint">Based in</p>
                <p className="text-fg">{personalInfo.location}</p>
              </div>

              <div className="mt-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-faint">Elsewhere</p>
                <SocialLinks variant="text" />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
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
                      <p id="name-error" role="alert" className="mt-2 text-sm text-danger">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
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
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-2 text-sm text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClassName}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${fieldClassName(Boolean(errors.message))} resize-none`}
                    placeholder="What are you working on?"
                  />
                  {errors.message ? (
                    <p id="message-error" role="alert" className="mt-2 text-sm text-danger">
                      {errors.message}
                    </p>
                  ) : (
                    remainingCharacters > 0 && (
                      <p className="mt-2 font-mono text-xs text-faint">
                        {remainingCharacters} more character{remainingCharacters === 1 ? '' : 's'} to go
                      </p>
                    )
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:bg-surface-strong disabled:text-faint sm:w-auto"
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
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </button>

                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-3 rounded-xl bg-success/10 p-4 text-sm text-success ring-1 ring-success/20">
                      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Message sent. I&apos;ll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-3 rounded-xl bg-danger/10 p-4 text-sm text-danger ring-1 ring-danger/20">
                      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Something went wrong. Please try again or email me directly.</span>
                    </div>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
