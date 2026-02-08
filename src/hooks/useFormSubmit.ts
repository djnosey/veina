import { useState, useCallback } from 'react';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useFormSubmit() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (formspreeId: string, data: Record<string, string>) => {
      setStatus('submitting');
      setError(null);

      try {
        const response = await fetch(
          `https://formspree.io/f/${formspreeId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          const message =
            body?.errors?.[0]?.message ??
            `Form submission failed: ${response.status}`;
          throw new Error(message);
        }

        setStatus('success');
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
        setStatus('error');
      }
    },
    [],
  );

  return { submit, status, error } as const;
}
