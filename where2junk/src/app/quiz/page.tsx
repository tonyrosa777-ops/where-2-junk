'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '@/data/site';

type Step = 0 | 1 | 2 | 3 | 'result';

export default function QuizPage() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState({
    problem: [] as string[],
    timeline: '',
    volume: '',
  });
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quizData = siteData.quiz;
  const stepZero = quizData.steps[0];
  const stepOne = quizData.steps[1];
  const stepTwo = quizData.steps[2];

  // ---------- helpers ----------
  const toggleProblem = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      problem: prev.problem.includes(value)
        ? prev.problem.filter(v => v !== value)
        : [...prev.problem, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name || !lead.phone) return;
    setLoading(true);
    setError(null);
    try {
      const description = `Problem: ${answers.problem.join(', ')} | Timeline: ${answers.timeline} | Volume: ${answers.volume}`;
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          description,
        }),
      });
      if (!res.ok) throw new Error('Submit failed');
      setStep('result');
    } catch {
      setError('Something went wrong. Please call us at ' + siteData.meta.phone);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ problem: [], timeline: '', volume: '' });
    setLead({ name: '', phone: '', email: '' });
    setError(null);
  };

  // ---------- result screen data ----------
  const serviceSlugMap: Record<string, string> = {
    household: 'junk-removal',
    estate: 'junk-removal',
    garage: 'garage-cleanout',
    yard: 'yard-waste-removal',
    construction: 'construction-debris-removal',
  };
  const recommendedSlug = serviceSlugMap[answers.problem[0]] ?? 'junk-removal';
  const recommended =
    siteData.services.find(s => s.slug === recommendedSlug) ?? siteData.services[0];

  // ---------- progress dots ----------
  const ProgressDots = () => {
    if (step === 'result') return null;
    const currentStep = step as number;
    return (
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '32px',
        }}
      >
        {[0, 1, 2, 3].map(i => {
          const isFilled = i === currentStep;
          const isPast = i < currentStep;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isFilled ? 'var(--primary)' : 'transparent',
                border: isFilled
                  ? '2px solid var(--primary)'
                  : isPast
                  ? '2px solid var(--primary)'
                  : '2px solid var(--text-muted)',
                transition: 'all 0.2s',
              }}
            />
          );
        })}
      </div>
    );
  };

  // ---------- step renderers ----------
  const renderStep = () => {
    switch (step) {
      // ---- STEP 0: multi-select problem ----
      case 0:
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: '28px',
                lineHeight: 1.1,
              }}
            >
              {stepZero.question}
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '32px',
              }}
            >
              {stepZero.options.map(opt => {
                const selected = answers.problem.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleProblem(opt.value)}
                    className="font-body"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      fontSize: '0.9375rem',
                      fontWeight: selected ? 700 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      background: selected ? 'var(--primary)' : 'var(--bg-card)',
                      color: selected ? '#fff' : 'var(--text-secondary)',
                      border: selected
                        ? '2px solid var(--primary)'
                        : '2px solid var(--primary-muted)',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={answers.problem.length === 0}
              className="font-display font-black uppercase"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                cursor: answers.problem.length > 0 ? 'pointer' : 'not-allowed',
                background:
                  answers.problem.length > 0 ? 'var(--primary)' : 'var(--bg-card)',
                color: answers.problem.length > 0 ? '#fff' : 'var(--text-muted)',
                border: 'none',
                transition: 'all 0.2s',
              }}
            >
              Next &rarr;
            </button>
          </div>
        );

      // ---- STEP 1: single-select timeline ----
      case 1:
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: '28px',
                lineHeight: 1.1,
              }}
            >
              {stepOne.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stepOne.options.map(opt => {
                const selected = answers.timeline === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setAnswers(prev => ({ ...prev, timeline: opt.value }));
                      setStep(2);
                    }}
                    className="font-body"
                    style={{
                      minHeight: '60px',
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      background: 'var(--bg-card)',
                      color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                      border: selected
                        ? '2px solid var(--primary-muted)'
                        : '2px solid transparent',
                      borderLeft: selected
                        ? '4px solid var(--primary)'
                        : '4px solid transparent',
                      fontWeight: selected ? 600 : 400,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        );

      // ---- STEP 2: single-select volume ----
      case 2:
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: '28px',
                lineHeight: 1.1,
              }}
            >
              {stepTwo.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stepTwo.options.map(opt => {
                const selected = answers.volume === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setAnswers(prev => ({ ...prev, volume: opt.value }));
                      setStep(3);
                    }}
                    className="font-body"
                    style={{
                      minHeight: '60px',
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      background: 'var(--bg-card)',
                      color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                      border: selected
                        ? '2px solid var(--primary-muted)'
                        : '2px solid transparent',
                      borderLeft: selected
                        ? '4px solid var(--primary)'
                        : '4px solid transparent',
                      fontWeight: selected ? 600 : 400,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        );

      // ---- STEP 3: lead capture form ----
      case 3:
        return (
          <div>
            <h2
              className="font-display font-black uppercase"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
                marginBottom: '28px',
                lineHeight: 1.15,
              }}
            >
              {quizData.leadCapture.headline}
            </h2>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="quiz-name"
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                  }}
                >
                  Name
                </label>
                <input
                  id="quiz-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={lead.name}
                  onChange={e => setLead(prev => ({ ...prev, name: e.target.value }))}
                  className="font-body"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    border: '1.5px solid var(--primary-muted)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e =>
                    (e.currentTarget.style.borderColor = 'var(--primary-muted)')
                  }
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="quiz-phone"
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                  }}
                >
                  Phone
                </label>
                <input
                  id="quiz-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={lead.phone}
                  onChange={e => setLead(prev => ({ ...prev, phone: e.target.value }))}
                  className="font-body"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    border: '1.5px solid var(--primary-muted)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e =>
                    (e.currentTarget.style.borderColor = 'var(--primary-muted)')
                  }
                />
              </div>

              {/* Email (optional) */}
              <div>
                <label
                  htmlFor="quiz-email"
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                  }}
                >
                  Email{' '}
                  <span
                    style={{
                      fontWeight: 400,
                      textTransform: 'none',
                      letterSpacing: 0,
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  autoComplete="email"
                  value={lead.email}
                  onChange={e => setLead(prev => ({ ...prev, email: e.target.value }))}
                  className="font-body"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    border: '1.5px solid var(--primary-muted)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e =>
                    (e.currentTarget.style.borderColor = 'var(--primary-muted)')
                  }
                />
              </div>

              {/* Error */}
              {error !== null && (
                <div
                  className="font-body"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: 'rgba(220, 38, 38, 0.12)',
                    border: '1.5px solid rgba(220, 38, 38, 0.4)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !lead.name || !lead.phone}
                className="font-display font-black uppercase"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  cursor:
                    loading || !lead.name || !lead.phone ? 'not-allowed' : 'pointer',
                  background:
                    loading || !lead.name || !lead.phone
                      ? 'var(--bg-card)'
                      : 'var(--primary)',
                  color:
                    loading || !lead.name || !lead.phone
                      ? 'var(--text-muted)'
                      : '#fff',
                  border: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {loading ? 'Sending...' : quizData.leadCapture.submitLabel}
              </button>
            </form>
          </div>
        );

      // ---- RESULT ----
      case 'result':
        return (
          <div>
            {/* Success checkmark */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                &#10003;
              </span>
            </div>

            <h2
              className="font-display font-black uppercase"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: '28px',
                lineHeight: 1.1,
                textAlign: 'center',
              }}
            >
              {quizData.result.headline}
            </h2>

            {/* Recommended service card */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '2px solid var(--primary-muted)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <p
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--primary)',
                  marginBottom: '8px',
                }}
              >
                Recommended Service
              </p>
              <h3
                className="font-display font-black uppercase"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.375rem',
                  marginBottom: '12px',
                  lineHeight: 1.1,
                }}
              >
                {recommended.title}
              </h3>
              <p
                className="font-body"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                }}
              >
                {recommended.description}
              </p>
            </div>

            {/* Primary CTA */}
            <a
              href={quizData.result.ctaHref}
              className="font-display font-black uppercase"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                textAlign: 'center',
                textDecoration: 'none',
                background: 'var(--primary)',
                color: '#fff',
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}
            >
              {quizData.result.ctaLabel}
            </a>

            {/* Start over */}
            <button
              onClick={resetQuiz}
              className="font-body"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1.5px solid var(--text-muted)',
              }}
            >
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // ---------- render ----------
  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '96px',
          paddingBottom: '96px',
        }}
      >
        {/* Quiz container */}
        <div
          style={{
            maxWidth: '672px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 16px',
          }}
        >
          {/* Page heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--primary)',
                marginBottom: '12px',
              }}
            >
              Free Service Finder
            </p>
            <h1
              className="font-display font-black uppercase"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                lineHeight: 1.05,
                marginBottom: '12px',
              }}
            >
              {quizData.headline}
            </h1>
            <p
              className="font-body"
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              {quizData.subheadline}
            </p>
          </div>

          {/* Progress dots */}
          <ProgressDots />

          {/* Animated step card */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: '16px',
              padding: 'clamp(24px, 5vw, 40px)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={String(step)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] as const }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
