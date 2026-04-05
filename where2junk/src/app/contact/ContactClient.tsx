'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import { siteData } from '@/data/site';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const inputBase =
  'w-full rounded px-4 py-3 font-body text-base transition-colors duration-200 focus:outline-none focus:ring-2';

const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--primary-muted)',
  color: 'var(--text-primary)',
};

const labelStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
};

export default function ContactClient() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [serviceType, setServiceType] = useState('');
  const [timeline, setTimeline] = useState('');
  const [volume, setVolume] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const { contact } = siteData;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          message: form.message,
          serviceType: serviceType || undefined,
          timeline: timeline || undefined,
          volume: volume || undefined,
        }),
      });

      if (!res.ok) throw new Error('Non-2xx response');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <main>
      {/* Page hero */}
      <section
        className="pt-24 pb-12"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--primary)' }}
            >
              Manchester, NH
            </p>
            <h1
              className="font-display font-black uppercase text-4xl sm:text-5xl lg:text-6xl leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              Get in Touch
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Two-column layout */}
      <section
        className="pb-24"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start">
            {/* Left: Contact form */}
            <FadeUp delay={0.1}>
              {submitState === 'success' ? (
                <div
                  className="rounded p-6 font-body text-base"
                  style={{
                    backgroundColor: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {contact.formSuccessMessage}
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {submitState === 'error' && (
                    <div
                      className="rounded p-4 mb-6 font-body text-sm"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      Something went wrong. Please call us at{' '}
                      <a
                        href={`tel:+${contact.phoneRaw}`}
                        className="underline"
                        style={{ color: 'var(--primary)' }}
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}

                  {/* Name */}
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-widest mb-1"
                      style={labelStyle}
                    >
                      Name <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputBase}
                      style={{
                        ...inputStyle,
                        // @ts-expect-error CSS custom property for focus ring
                        '--tw-ring-color': 'var(--primary)',
                      }}
                      autoComplete="name"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="block font-mono text-xs uppercase tracking-widest mb-1"
                      style={labelStyle}
                    >
                      Phone <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className={inputBase}
                      style={inputStyle}
                      autoComplete="tel"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-widest mb-1"
                      style={labelStyle}
                    >
                      Email{' '}
                      <span className="normal-case" style={{ color: 'var(--text-muted)' }}>
                        (optional)
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputBase}
                      style={inputStyle}
                      autoComplete="email"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-5">
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs uppercase tracking-widest mb-1"
                      style={labelStyle}
                    >
                      Message{' '}
                      <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className={inputBase}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {/* Service Type */}
                  <div className="mb-5 flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Service Type <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-3 font-body text-base bg-transparent border outline-none transition-colors"
                      style={{
                        borderColor: 'rgba(245,245,245,0.15)',
                        color: serviceType ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(245,245,245,0.15)')}
                    >
                      <option value="">What do you need removed?</option>
                      <option value="junk-removal">Junk Removal</option>
                      <option value="garage-cleanout">Garage or Basement Cleanout</option>
                      <option value="yard-waste">Yard Waste Removal</option>
                      <option value="construction-debris">Construction Debris</option>
                      <option value="full-house">Full House Cleanout</option>
                      <option value="estate">Estate Cleanout</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className="mb-5 flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Timeline <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Today/Tomorrow', 'This Week', 'This Month', 'Just Exploring'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className="px-4 py-2 font-body text-sm transition-all duration-150"
                          style={{
                            border: '1px solid',
                            borderColor: timeline === opt ? 'var(--primary)' : 'rgba(245,245,245,0.15)',
                            background: timeline === opt ? 'rgba(215,43,43,0.12)' : 'transparent',
                            color: timeline === opt ? 'var(--text-primary)' : 'var(--text-muted)',
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="mb-7 flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Volume <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['A few items', 'About a truckload', 'Multiple loads', 'Not sure'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setVolume(opt)}
                          className="px-4 py-2 font-body text-sm transition-all duration-150"
                          style={{
                            border: '1px solid',
                            borderColor: volume === opt ? 'var(--primary)' : 'rgba(245,245,245,0.15)',
                            background: volume === opt ? 'rgba(215,43,43,0.12)' : 'transparent',
                            color: volume === opt ? 'var(--text-primary)' : 'var(--text-muted)',
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="w-full py-4 font-display font-black uppercase tracking-wide text-base transition-colors duration-200 rounded disabled:opacity-60"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                    }}
                  >
                    {submitState === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </FadeUp>

            {/* Right: Contact info panel */}
            <FadeUp delay={0.2}>
              <div
                className="rounded p-8"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {/* Phone */}
                <div className="flex items-start gap-4 mb-6">
                  <Phone
                    size={20}
                    className="mt-1 shrink-0"
                    style={{ color: 'var(--primary)' }}
                  />
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Phone
                    </p>
                    <a
                      href={`tel:+${contact.phoneRaw}`}
                      className="font-mono font-medium text-xl transition-colors duration-200"
                      style={{ color: 'var(--primary)' }}
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <Mail
                    size={20}
                    className="mt-1 shrink-0"
                    style={{ color: 'var(--primary)' }}
                  />
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-body text-base transition-colors duration-200"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0"
                    style={{ color: 'var(--primary)' }}
                  />
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Address
                    </p>
                    <p
                      className="font-body text-base"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {contact.address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <Clock
                    size={20}
                    className="mt-1 shrink-0"
                    style={{ color: 'var(--primary)' }}
                  />
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Hours
                    </p>
                    <p
                      className="font-body text-base mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {contact.hours.display}
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {contact.hours.note}
                    </p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div
                  className="h-48 mt-6 rounded flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--bg-base)',
                    border: '2px dashed var(--primary-muted)',
                  }}
                >
                  <p
                    className="font-mono text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Map coming soon
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="py-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display font-black uppercase text-3xl sm:text-4xl text-white mb-8">
              Ready to Schedule?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-black uppercase tracking-wide text-base rounded transition-colors duration-200"
                style={{
                  backgroundColor: 'white',
                  color: 'var(--primary)',
                }}
              >
                Book Online
              </a>
              <a
                href={`tel:+${contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-black uppercase tracking-wide text-base rounded transition-colors duration-200"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                }}
              >
                {contact.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
