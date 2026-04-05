'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '@/data/site';
import Button from '@/components/ui/Button';

// ── Step type ──────────────────────────────────────────────────────────────
type Step = 'q0' | 'q1' | 'q2' | 'q3' | 'contact' | 'result';
const STEPS: Step[] = ['q0', 'q1', 'q2', 'q3', 'contact', 'result'];
const PROGRESS_STEPS = 5; // q0–q3 + contact; result is 100%

// ── Result key ─────────────────────────────────────────────────────────────
function getResultKey(answers: Record<string, string | string[]>): string {
  const problems = (answers.q0 as string[]) || [];
  if (problems.includes('estate') || problems.includes('full-house')) return 'junk-removal';
  if (problems.includes('construction') || answers.q3 === 'demo-debris')
    return 'construction-debris-removal';
  if (problems.includes('yard')) return 'yard-waste-removal';
  if (problems.includes('garage')) return 'garage-cleanout';
  return 'junk-removal';
}

// ── Shared slide variants ──────────────────────────────────────────────────
function slideVariants(direction: number) {
  return {
    initial: { opacity: 0, x: direction * 48 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: direction * -48 },
  };
}

// ── Shared input style ─────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '1rem',
  background: 'var(--bg-card)',
  color: 'var(--text-primary)',
  border: '1.5px solid var(--primary-muted)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

// ── Option card — defined outside component so identity is stable ──────────
function OptionCard({
  label,
  detail,
  icon,
  selected,
  onClick,
}: {
  label: string;
  detail?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: '16px',
        borderRadius: '10px',
        textAlign: 'left',
        cursor: 'pointer',
        background: selected ? 'rgba(215,43,43,0.08)' : 'var(--bg-card)',
        border: selected ? '2px solid var(--primary)' : '2px solid var(--primary-muted)',
        transition: 'background 0.15s, border-color 0.15s',
        width: '100%',
      }}
    >
      {icon && (
        <span style={{ display: 'block', fontSize: '2rem', lineHeight: 1, marginBottom: '8px' }}>
          {icon}
        </span>
      )}
      <span
        className="font-body"
        style={{
          display: 'block',
          fontSize: '1rem',
          fontWeight: selected ? 700 : 400,
          color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
      {detail && (
        <span
          className="font-body"
          style={{
            display: 'block',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            marginTop: '4px',
            lineHeight: 1.4,
          }}
        >
          {detail}
        </span>
      )}
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function QuizPage() {
  const [step, setStep]             = useState<Step>('q0');
  const [direction, setDirection]   = useState(1);
  const [answers, setAnswers]       = useState<Record<string, string | string[]>>({});
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [email, setEmail]           = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const q = siteData.quiz;

  // ── Navigation helpers ───────────────────────────────────────────────────
  const advance = (toStep: Step) => {
    setDirection(1);
    setStep(toStep);
  };

  const goBack = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) {
      setDirection(-1);
      setStep(STEPS[idx - 1]);
    }
  };

  const resetAll = () => {
    setDirection(1);
    setStep('q0');
    setAnswers({});
    setName('');
    setPhone('');
    setEmail('');
    setPhoneError('');
    setSubmitError('');
  };

  // ── Multi-select toggle ──────────────────────────────────────────────────
  const toggleMulti = (key: string, value: string) => {
    setAnswers(prev => {
      const current = (prev[key] as string[]) || [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  // ── Single-select: set answer then advance after 200ms ───────────────────
  const pickSingle = (key: string, value: string, toStep: Step) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setTimeout(() => advance(toStep), 200);
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }
    setPhoneError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }
    setSubmitError('');
    setSubmitting(true);

    const resultKey = getResultKey(answers);

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, answers, resultKey }),
      });
      if (!res.ok) throw new Error('Submit failed');
      advance('result');
    } catch {
      setSubmitError('Something went wrong. Please call us at ' + siteData.meta.phone);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Progress bar ─────────────────────────────────────────────────────────
  const progressPct =
    step === 'result'
      ? 100
      : Math.round((STEPS.indexOf(step) / PROGRESS_STEPS) * 100);

  const stepIndex   = STEPS.indexOf(step);
  const stepLabel   = step === 'result' ? '' : `Step ${stepIndex + 1} of ${PROGRESS_STEPS}`;

  // ── Step content ─────────────────────────────────────────────────────────

  // q0 — multi-select
  const stepQ0 = q.steps[0];
  const q0Selected = (answers.q0 as string[]) || [];

  // q1 — single-select
  const stepQ1 = q.steps[1];

  // q2 — single-select
  const stepQ2 = q.steps[2];

  // q3 — single-select
  const stepQ3 = q.steps[3];

  // result
  const resultKey  = getResultKey(answers);
  const resultData = (q.results as unknown as Record<string, typeof q.results['junk-removal']>)[resultKey]
    ?? q.results['junk-removal'];

  // ── Content per step ──────────────────────────────────────────────────────
  const renderContent = () => {
    switch (step) {

      // ─── Q0: multi-select ─────────────────────────────────────────────────
      case 'q0':
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.375rem, 4vw, 1.875rem)', marginBottom: '24px', lineHeight: 1.1 }}
            >
              {stepQ0.question}
            </h2>
            <div
              className="grid gap-3 mb-6"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))' }}
            >
              {stepQ0.options.map(opt => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  detail={opt.detail}
                  icon={opt.icon}
                  selected={q0Selected.includes(opt.value)}
                  onClick={() => toggleMulti('q0', opt.value)}
                />
              ))}
            </div>
            <button
              type="button"
              disabled={q0Selected.length === 0}
              onClick={() => advance('q1')}
              className="font-display font-black uppercase"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                cursor: q0Selected.length > 0 ? 'pointer' : 'not-allowed',
                background: q0Selected.length > 0 ? 'var(--primary)' : 'var(--bg-card)',
                color: q0Selected.length > 0 ? '#fff' : 'var(--text-muted)',
                border: 'none',
                transition: 'all 0.2s',
              }}
            >
              Continue &rarr;
            </button>
          </div>
        );

      // ─── Q1: single-select ────────────────────────────────────────────────
      case 'q1':
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.375rem, 4vw, 1.875rem)', marginBottom: '24px', lineHeight: 1.1 }}
            >
              {stepQ1.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stepQ1.options.map(opt => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  detail={opt.detail}
                  icon={opt.icon}
                  selected={answers.q1 === opt.value}
                  onClick={() => pickSingle('q1', opt.value, 'q2')}
                />
              ))}
            </div>
          </div>
        );

      // ─── Q2: single-select ────────────────────────────────────────────────
      case 'q2':
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.375rem, 4vw, 1.875rem)', marginBottom: '24px', lineHeight: 1.1 }}
            >
              {stepQ2.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stepQ2.options.map(opt => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  detail={opt.detail}
                  icon={opt.icon}
                  selected={answers.q2 === opt.value}
                  onClick={() => pickSingle('q2', opt.value, 'q3')}
                />
              ))}
            </div>
          </div>
        );

      // ─── Q3: single-select ────────────────────────────────────────────────
      case 'q3':
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.375rem, 4vw, 1.875rem)', marginBottom: '24px', lineHeight: 1.1 }}
            >
              {stepQ3.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stepQ3.options.map(opt => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  detail={opt.detail}
                  icon={opt.icon}
                  selected={answers.q3 === opt.value}
                  onClick={() => pickSingle('q3', opt.value, 'contact')}
                />
              ))}
            </div>
          </div>
        );

      // ─── Contact: lead capture ────────────────────────────────────────────
      case 'contact':
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.25rem, 3.5vw, 1.625rem)', marginBottom: '8px', lineHeight: 1.15 }}
            >
              {q.leadCapture.headline}
            </h2>
            <p
              className="font-body"
              style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55, marginBottom: '28px' }}
            >
              {q.leadCapture.subheadline}
            </p>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Name */}
              <div>
                <label
                  htmlFor="quiz-name"
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '6px' }}
                >
                  Name
                </label>
                <input
                  id="quiz-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={q.leadCapture.namePlaceholder}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="font-body"
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--primary-muted)')}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="quiz-phone"
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '6px' }}
                >
                  Phone
                </label>
                <input
                  id="quiz-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder={q.leadCapture.phonePlaceholder}
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                  className="font-body"
                  style={{ ...inputStyle, borderColor: phoneError ? '#ef4444' : undefined }}
                  onFocus={e => (e.currentTarget.style.borderColor = phoneError ? '#ef4444' : 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = phoneError ? '#ef4444' : 'var(--primary-muted)')}
                />
                {phoneError && (
                  <p className="font-body" style={{ fontSize: '0.8125rem', color: '#ef4444', marginTop: '6px' }}>
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="quiz-email"
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '6px' }}
                >
                  Email
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={q.leadCapture.emailPlaceholder}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="font-body"
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--primary-muted)')}
                />
              </div>

              {/* Network error */}
              {submitError && (
                <div
                  className="font-body"
                  style={{ padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', background: 'rgba(220,38,38,0.12)', border: '1.5px solid rgba(220,38,38,0.4)', color: 'var(--text-primary)' }}
                >
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !name || !phone}
                className="font-display font-black uppercase"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  cursor: submitting || !name || !phone ? 'not-allowed' : 'pointer',
                  background: submitting || !name || !phone ? 'var(--bg-card)' : 'var(--primary)',
                  color: submitting || !name || !phone ? 'var(--text-muted)' : '#fff',
                  border: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {submitting ? 'Sending...' : q.leadCapture.submitLabel}
              </button>
            </form>
          </div>
        );

      // ─── Result ───────────────────────────────────────────────────────────
      case 'result':
        return (
          <div>
            {/* Checkmark */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '1.625rem',
                  fontWeight: 700,
                }}
              >
                &#10003;
              </motion.span>
            </div>

            <h2
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '24px', lineHeight: 1.1, textAlign: 'center' }}
            >
              {q.result.headline}
            </h2>

            {/* Service card */}
            <div
              style={{ background: 'var(--bg-card)', border: '2px solid var(--primary-muted)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}
            >
              <p
                className="font-mono"
                style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: '8px' }}
              >
                {resultData.eyebrow}
              </p>
              <h3
                className="font-display font-black uppercase"
                style={{ color: 'var(--text-primary)', fontSize: '1.375rem', marginBottom: '10px', lineHeight: 1.1 }}
              >
                {resultData.service}
              </h3>
              <p
                className="font-body"
                style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '12px' }}
              >
                {resultData.description}
              </p>
              <p
                className="font-mono"
                style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}
              >
                {resultData.priceRange}
              </p>
            </div>

            {/* Primary CTA */}
            <Button href={resultData.ctaHref} variant="primary" size="lg" className="w-full mb-3 rounded-lg">
              {resultData.ctaLabel}
            </Button>

            {/* Secondary CTA */}
            <Button href={q.result.secondaryCta.href} variant="ghost" size="lg" className="w-full mb-4 rounded-lg">
              {q.result.secondaryCta.label}
            </Button>

            {/* Start over */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={resetAll}
                className="font-body"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Start over
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const showBack = step !== 'q0' && step !== 'result';

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 'clamp(80px, 12vw, 120px)',
          paddingBottom: '96px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        {/* ── Max-width shell ── */}
        <div style={{ maxWidth: '600px', width: '100%' }}>

          {/* ── Eyebrow + headline ── */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p
              className="font-mono"
              style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: '12px' }}
            >
              Free Service Finder
            </p>
            <h1
              className="font-display font-black uppercase"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', lineHeight: 1.05, marginBottom: '12px' }}
            >
              {q.headline}
            </h1>
            <p
              className="font-body"
              style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto' }}
            >
              {q.subheadline}
            </p>
          </div>

          {/* ── Progress bar ── */}
          {step !== 'result' && (
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}
              >
                <span className="font-mono" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  {stepLabel}
                </span>
                <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.05em', color: 'var(--primary)' }}>
                  {progressPct}%
                </span>
              </div>
              <div style={{ height: '4px', background: 'var(--bg-card)', borderRadius: '9999px', overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
                  style={{ height: '100%', background: 'var(--primary)', borderRadius: '9999px' }}
                />
              </div>
            </div>
          )}

          {/* ── Step card ── */}
          <div
            style={{ background: 'var(--bg-elevated)', borderRadius: '16px', padding: 'clamp(24px, 5vw, 40px)', marginBottom: showBack ? '20px' : '0' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={slideVariants(direction)}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Back button ── */}
          {showBack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ textAlign: 'center', paddingTop: '4px' }}
            >
              <button
                type="button"
                onClick={goBack}
                className="font-body"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>&larr;</span> Back
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
