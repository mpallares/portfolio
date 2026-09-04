'use client';

import { useEffect, useState } from 'react';

interface EmailProtectedProps {
  className?: string;
  showCopyButton?: boolean;
}

// Email kept out of the HTML source so scrapers do not pick it up:
// base64 of the reversed address, decoded on the client.
const OBFUSCATED_EMAIL = 'bW9jLmxpYW1nQGFyYWxzZXJhbGxhcG0=';

function decodeEmail(): string {
  try {
    return atob(OBFUSCATED_EMAIL).split('').reverse().join('');
  } catch {
    return '';
  }
}

export default function EmailProtected({
  className = '',
  showCopyButton = true,
}: EmailProtectedProps) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEmail(decodeEmail());
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; the address stays selectable either way.
    }
  };

  if (!email) {
    // Reserve the space while the address decodes so the layout does not jump.
    return (
      <span
        className={`inline-block h-5 w-44 max-w-full animate-pulse rounded bg-gray-700/60 align-middle ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={`mailto:${email}`}
        className="select-all hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
      >
        {email}
      </a>

      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-gray-700 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          title="Copy email"
          aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      )}
    </span>
  );
}
