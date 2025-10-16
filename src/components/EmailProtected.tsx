'use client';

import { useState, useEffect } from 'react';

interface EmailProtectedProps {
  className?: string;
  showCopyButton?: boolean;
}

export default function EmailProtected({ className = '', showCopyButton = true }: EmailProtectedProps) {
  const [displayEmail, setDisplayEmail] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Obfuscate email - stored as base64 encoded reversed string
    // Original: mpallareslara@gmail.com
    // Process: reverse -> encode base64 -> decode on client
    const obfuscated = 'bW9jLmxpYW1nQGFyYWxzZXJhbGxhcG0=';

    try {
      // Decode from base64
      const decoded = atob(obfuscated);
      // Reverse the string back
      const email = decoded.split('').reverse().join('');
      setDisplayEmail(email);
    } catch {
      console.error('Failed to decode email');
    }
  }, []);

  const handleCopy = async () => {
    if (displayEmail) {
      try {
        await navigator.clipboard.writeText(displayEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  };

  if (!displayEmail) {
    // Show placeholder while JS loads (no email in HTML source)
    return <span className={className}>Loading...</span>;
  }

  // Split email for additional obfuscation in rendered HTML
  const [localPart, domain] = displayEmail.split('@');

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Email rendered as separate spans to break up the pattern */}
      <span className="select-all">
        <span data-user={localPart.split('').reverse().join('')}></span>
        <span>{localPart}</span>
        <span>@</span>
        <span>{domain}</span>
      </span>

      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          title="Copy email"
          aria-label="Copy email to clipboard"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      )}
    </span>
  );
}
