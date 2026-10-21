import { useState } from 'react';
import MagneticButton from '../components/MagneticButton';
import { siteConfig } from '../data/siteConfig';
import { socials } from '../data/socials';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !isValidEmail || !message) {
      setErrorMessage('Please provide a valid name, email, and message.');
      setStatus('error');
      return;
    }

    setErrorMessage('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        setErrorMessage('Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setForm({ name: '', email: '', message: '' });
      setErrorMessage('');
      setStatus('success');
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <h2 className="display-font text-[14vw] uppercase leading-[0.85] sm:text-[11vw] md:text-[7.5vw]">
          LET'S
          <br />
          BUILD
          <br />
          <span className="text-outline">SOMETHING</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12">
          <form onSubmit={onSubmit} className="md:col-span-7">
            <div className="mb-5">
              <label
                className="mono-font mb-2 block text-xs font-bold uppercase tracking-widest text-[var(--color-paper)]/60"
                htmlFor="name"
              >
                Name
              </label>

              <input
                id="name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="brutal-border w-full bg-transparent px-4 py-3 text-[var(--color-paper)] outline-none focus:border-[var(--color-green)]"
              />
            </div>

            <div className="mb-5">
              <label
                className="mono-font mb-2 block text-xs font-bold uppercase tracking-widest text-[var(--color-paper)]/60"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="brutal-border w-full bg-transparent px-4 py-3 text-[var(--color-paper)] outline-none focus:border-[var(--color-green)]"
              />
            </div>

            <div className="mb-6">
              <label
                className="mono-font mb-2 block text-xs font-bold uppercase tracking-widest text-[var(--color-paper)]/60"
                htmlFor="message"
              >
                Message
              </label>

              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="brutal-border w-full resize-none bg-transparent px-4 py-3 text-[var(--color-paper)] outline-none focus:border-[var(--color-green)]"
              />
            </div>

            <MagneticButton
              type="submit"
              disabled={status === 'submitting'}
              className="bg-[var(--color-orange)] text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting'
                ? 'SENDING...'
                : status === 'success'
                  ? 'MESSAGE SENT'
                  : 'Send message'}
            </MagneticButton>

            {status === 'success' && (
              <p className="mono-font mt-4 text-xs text-[var(--color-paper)]/60">
                Message sent successfully. I'll get back to you soon.
              </p>
            )}

            {status === 'error' && (
              <p className="mono-font mt-4 text-xs text-[var(--color-paper)]/60">
                {errorMessage}
              </p>
            )}
          </form>

          <div className="md:col-span-5">
            <p className="mono-font mb-4 text-xs font-bold uppercase tracking-widest text-[var(--color-paper)]/50">
              Or find me here
            </p>

            <ul className="space-y-3">
              {/* EMAIL */}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-baseline justify-between border-b-2 border-[var(--color-paper)]/20 py-3"
                  data-cursor-grow
                >
                  <span className="display-font text-xl uppercase md:text-2xl">
                    Email
                  </span>

                  <span className="mono-font text-sm text-[var(--color-paper)]/60 group-hover:text-[var(--color-green)]">
                    {siteConfig.email}
                  </span>
                </a>
              </li>

              {/* EXISTING SOCIALS */}
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-grow
                    className="group flex items-baseline justify-between border-b-2 border-[var(--color-paper)]/20 py-3"
                  >
                    <span className="display-font text-xl uppercase md:text-2xl">
                      {s.label}
                    </span>

                    {s.handle && (
                      <span className="mono-font text-sm text-[var(--color-paper)]/60 group-hover:text-[var(--color-green)]">
                        {s.handle}
                      </span>
                    )}
                  </a>
                </li>
              ))}

              {/* LINKEDIN */}
              <li>
                <a
                  href="https://www.linkedin.com/in/karthikvijayofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-grow
                  aria-label="Visit Karthik Vijay's LinkedIn profile"
                  className="group flex items-baseline justify-between border-b-2 border-[var(--color-paper)]/20 py-3"
                >
                  <span className="display-font text-xl uppercase md:text-2xl">
                    LinkedIn
                  </span>

                  <span className="mono-font text-sm text-[var(--color-paper)]/60 group-hover:text-[var(--color-green)]">
                    @karthikvijayofficial
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}