'use client';

// BookingCalendar — Where2 Junk interactive 3-step booking widget
// Pattern: Enchanted Madison BookingCalendar + AcuityModal (adapted for junk removal)
// Demo-ready: seeded availability, no backend required.
// Production: set NEXT_PUBLIC_CALENDLY_URL → "Book This Slot" opens Calendly inline.

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '@/data/site';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Avail = 'available' | 'limited' | 'booked' | 'past' | 'closed';
type Step = 'calendar' | 'time' | 'service';

interface TimeSlot {
  label: string;
  avail: 'open' | 'limited' | 'booked';
}

interface Service {
  id: string;
  name: string;
  sub: string;
  price: string;
}

// ─── Static data ────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  { id: 'few',      name: 'A Few Items',      sub: '1–5 pieces, quick load',   price: 'From $99'   },
  { id: 'half',     name: 'Half Truckload',   sub: 'One room or garage corner', price: 'From $199'  },
  { id: 'full',     name: 'Full Truckload',   sub: 'Multiple rooms, bulk haul', price: 'From $349'  },
  { id: 'cleanout', name: 'Full Cleanout',    sub: 'Whole property, every room', price: 'Get a Quote' },
];

const TIME_SLOTS: string[] = ['7:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const MONTH_NAMES = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];
const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

// ─── Helpers ────────────────────────────────────────────────────────────────────
function hash(d: Date): number {
  return (d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % 10;
}

function getAvail(d: Date): Avail {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cmp = new Date(d); cmp.setHours(0, 0, 0, 0);
  if (cmp < today) return 'past';
  if (d.getDay() === 0) return 'closed'; // closed Sundays
  const h = hash(d);
  const dow = d.getDay();
  if (dow === 6) return h < 3 ? 'booked' : h < 6 ? 'limited' : 'available'; // Saturday busiest
  return h < 2 ? 'booked' : h < 4 ? 'limited' : 'available';
}

function getTimeSlots(d: Date): TimeSlot[] {
  const h = hash(d);
  return TIME_SLOTS.map((label, i) => ({
    label,
    avail: (h + i) % 5 === 0 ? 'booked' : (h + i) % 3 === 0 ? 'limited' : 'open',
  }));
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDowOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// ─── Slide animation ────────────────────────────────────────────────────────────
const slide = {
  enter:  { x: 32, opacity: 0 },
  center: { x: 0,  opacity: 1, transition: { duration: 0.22, ease: 'easeOut' as const } },
  exit:   { x: -32, opacity: 0, transition: { duration: 0.16, ease: 'easeIn' as const } },
};

// ─── Confirmation Modal ─────────────────────────────────────────────────────────
function ConfirmModal({
  isOpen, onClose,
  selectedDate, selectedTime, selectedService,
}: {
  isOpen: boolean; onClose: () => void;
  selectedDate: Date | null; selectedTime: string | null; selectedService: Service | null;
}) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '';
  const hasCalendly = Boolean(calendlyUrl);
  const calendlySrc = hasCalendly && selectedDate
    ? `${calendlyUrl}?date=${selectedDate.toISOString().split('T')[0]}`
    : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.80)' }}
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden md:rounded-2xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--primary-muted)',
              maxHeight: '90vh',
              width: 'min(100vw, 640px)',
              // center on md+
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid rgba(215,43,43,0.2)' }}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--primary)' }}>
                  {hasCalendly ? 'Complete Your Booking' : 'Request Received'}
                </p>
                {selectedDate && (
                  <p className="font-body text-sm mt-0.5" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {fmtDate(selectedDate)}{selectedTime ? ` · ${selectedTime}` : ''}
                  </p>
                )}
              </div>
              <button onClick={onClose} aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 12 12">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 68px)' }}>
              {hasCalendly ? (
                <iframe src={calendlySrc} width="100%" height="600" frameBorder="0"
                  title="Book your pickup" style={{ display: 'block', minHeight: 500 }} />
              ) : (
                <div className="p-6 flex flex-col gap-5">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'var(--primary)' }}>
                    <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h3 className="font-display font-black uppercase text-2xl" style={{ color: 'var(--text-primary)' }}>
                      Josh Is On It.
                    </h3>
                    <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Your request is in. Josh reviews every lead personally and will confirm within the hour.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="rounded-xl p-4 space-y-3" style={{ background: 'var(--bg-elevated)' }}>
                    {[
                      { label: 'Date',    value: selectedDate ? fmtDate(selectedDate) : '' },
                      { label: 'Time',    value: selectedTime ?? '' },
                      { label: 'Service', value: selectedService ? `${selectedService.name} · ${selectedService.price}` : '' },
                    ].filter(r => r.value).map(row => (
                      <div key={row.label} className="flex justify-between items-start gap-4 text-sm">
                        <span className="font-mono text-[10px] uppercase tracking-widest flex-shrink-0 mt-0.5"
                          style={{ color: 'var(--text-muted)' }}>
                          {row.label}
                        </span>
                        <span className="font-body text-right" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Need faster? Call direct
                    </p>
                    <a href={`tel:+${siteData.meta.phoneRaw}`}
                      className="font-display font-black uppercase text-xl transition-colors"
                      style={{ color: 'var(--primary)' }}>
                      {siteData.meta.phone}
                    </a>
                  </div>

                  <button onClick={onClose}
                    className="font-mono text-xs uppercase tracking-widest underline mx-auto opacity-50 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--text-muted)' }}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export function BookingCalendar() {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,        setSelected]        = useState<Date | null>(null);
  const [selectedTime,    setSelectedTime]    = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [step,       setStep]       = useState<Step>('calendar');
  const [modalOpen,  setModalOpen]  = useState(false);

  // Build calendar grid
  const { grid, availCount } = useMemo(() => {
    const first = firstDowOfMonth(viewYear, viewMonth);
    const total = daysInMonth(viewYear, viewMonth);
    const cells: Array<{ date: Date; avail: Avail } | null> = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= total; d++) {
      const date = new Date(viewYear, viewMonth, d);
      cells.push({ date, avail: getAvail(date) });
    }
    const availCount = cells.filter(c => c && (c.avail === 'available' || c.avail === 'limited')).length;
    return { grid: cells, availCount };
  }, [viewYear, viewMonth]);

  const timeSlots = selected ? getTimeSlots(selected) : [];

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    reset();
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    reset();
  }

  function reset() {
    setSelected(null); setSelectedTime(null); setSelectedService(null);
    setStep('calendar');
  }

  function selectDate(date: Date, avail: Avail) {
    if (avail === 'past' || avail === 'booked' || avail === 'closed') return;
    setSelected(date); setSelectedTime(null); setSelectedService(null);
    setStep('time');
  }

  function selectTime(slot: TimeSlot) {
    if (slot.avail === 'booked') return;
    setSelectedTime(slot.label);
    setStep('service');
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid rgba(215,43,43,0.3)' }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_300px]">

          {/* ── Calendar column ── */}
          <div className="p-5 lg:p-7">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth} aria-label="Previous month"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 14 14">
                  <path d="M9 2L4 7l5 5" />
                </svg>
              </button>
              <span className="font-display font-black uppercase tracking-wide text-base"
                style={{ color: 'var(--text-primary)' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button onClick={nextMonth} aria-label="Next month"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 14 14">
                  <path d="M5 2l5 5-5 5" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES.map((d, i) => (
                <div key={d} className="text-center py-1.5 text-[10px] font-semibold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    color: i === 0 ? 'rgba(215,43,43,0.4)' : 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-0.5">
              {grid.map((cell, i) => {
                if (!cell) return <div key={`e${i}`} />;
                const { date, avail } = cell;
                const isToday    = date.toDateString() === today.toDateString();
                const isSelected = selected?.toDateString() === date.toDateString();
                const isClickable = avail === 'available' || avail === 'limited';
                const isSunday = date.getDay() === 0;

                const dotColor =
                  avail === 'booked'  ? 'var(--text-muted)' :
                  avail === 'limited' ? '#FF6B35' :
                  avail === 'available' ? 'var(--primary)' : 'transparent';

                return (
                  <button
                    key={date.toISOString()}
                    disabled={!isClickable}
                    onClick={() => selectDate(date, avail)}
                    className="relative flex flex-col items-center py-1.5 rounded-lg transition-all duration-150"
                    style={{
                      background: isSelected ? 'var(--primary)' : isToday ? 'var(--bg-elevated)' : 'transparent',
                      opacity: avail === 'past' || isSunday ? 0.25 : 1,
                      cursor: isClickable ? 'pointer' : 'default',
                      outline: isToday && !isSelected ? '1.5px solid rgba(215,43,43,0.4)' : 'none',
                    }}
                    onMouseEnter={e => { if (isClickable && !isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <span className="text-sm leading-none"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: isSelected || isToday ? 700 : 400,
                        color: isSelected ? '#fff' : avail === 'booked' ? 'var(--text-muted)' : 'var(--text-primary)',
                      }}>
                      {date.getDate()}
                    </span>
                    {!isSelected && avail !== 'past' && avail !== 'closed' && (
                      <span className="block mx-auto mt-0.5 rounded-full"
                        style={{ width: 4, height: 4, background: dotColor }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 pt-4"
              style={{ borderTop: '1px solid rgba(215,43,43,0.2)' }}>
              {[
                { color: 'var(--primary)', label: 'Available' },
                { color: '#FF6B35',        label: 'Limited'   },
                { color: 'var(--text-muted)', label: 'Booked' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="rounded-full" style={{ width: 6, height: 6, background: item.color, display: 'inline-block' }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'var(--primary)' }}>
                {availCount} slots this month
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block" style={{ background: 'rgba(215,43,43,0.2)' }} />

          {/* ── Detail column ── */}
          <div className="p-5 lg:p-7 flex flex-col border-t md:border-t-0"
            style={{ borderColor: 'rgba(215,43,43,0.2)' }}>
            <AnimatePresence mode="wait">

              {/* Step 0 — prompt */}
              {step === 'calendar' && (
                <motion.div key="prompt" variants={slide} initial="enter" animate="center" exit="exit"
                  className="flex flex-col items-center justify-center h-full text-center gap-4 py-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--bg-elevated)' }}>
                    <svg width="22" height="22" fill="none" stroke="var(--primary)" strokeWidth="1.75" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-black uppercase text-lg" style={{ color: 'var(--text-primary)' }}>
                      Pick a Date
                    </p>
                    <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Select any available day on the calendar. Mon–Sat, same-day slots most weeks.
                    </p>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                    Weekends book fast — grab a slot now
                  </p>
                </motion.div>
              )}

              {/* Step 1 — time slots */}
              {step === 'time' && selected && (
                <motion.div key="time" variants={slide} initial="enter" animate="center" exit="exit">
                  <button onClick={reset}
                    className="flex items-center gap-1.5 mb-4 text-[10px] uppercase tracking-widest transition-opacity opacity-50 hover:opacity-100"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 12 12">
                      <path d="M8 2L3 6l5 4" />
                    </svg>
                    Back
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--primary)' }}>
                    {fmtDate(selected)}
                  </p>
                  <p className="font-display font-black uppercase text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                    Choose a Window
                  </p>
                  <div className="flex flex-col gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.label}
                        disabled={slot.avail === 'booked'}
                        onClick={() => selectTime(slot)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-150"
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid rgba(215,43,43,0.25)',
                          opacity: slot.avail === 'booked' ? 0.35 : 1,
                          cursor: slot.avail === 'booked' ? 'default' : 'pointer',
                        }}
                        onMouseEnter={e => { if (slot.avail !== 'booked') (e.currentTarget as HTMLElement).style.background = 'var(--bg-base)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                      >
                        <span className="font-display font-black uppercase text-sm"
                          style={{ color: slot.avail === 'booked' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                          {slot.label}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest"
                          style={{
                            background:
                              slot.avail === 'booked'  ? 'var(--bg-card)' :
                              slot.avail === 'limited' ? 'rgba(255,107,53,0.15)' :
                              'rgba(215,43,43,0.12)',
                            color:
                              slot.avail === 'booked'  ? 'var(--text-muted)' :
                              slot.avail === 'limited' ? '#FF6B35' :
                              'var(--primary)',
                          }}>
                          {slot.avail === 'booked' ? 'Taken' : slot.avail === 'limited' ? '1 left' : 'Open'}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2 — service type */}
              {step === 'service' && selected && selectedTime && (
                <motion.div key="service" variants={slide} initial="enter" animate="center" exit="exit">
                  <button onClick={() => setStep('time')}
                    className="flex items-center gap-1.5 mb-4 text-[10px] uppercase tracking-widest transition-opacity opacity-50 hover:opacity-100"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 12 12">
                      <path d="M8 2L3 6l5 4" />
                    </svg>
                    Back
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--primary)' }}>
                    {fmtDate(selected)} · {selectedTime}
                  </p>
                  <p className="font-display font-black uppercase text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                    What Are We Hauling?
                  </p>
                  <div className="flex flex-col gap-2 mb-5">
                    {SERVICES.map(svc => {
                      const chosen = selectedService?.id === svc.id;
                      return (
                        <button
                          key={svc.id}
                          onClick={() => setSelectedService(svc)}
                          className="rounded-xl px-4 py-3 text-left transition-all duration-150"
                          style={{
                            background: chosen ? 'var(--primary)' : 'var(--bg-elevated)',
                            border: `1px solid ${chosen ? 'var(--primary)' : 'rgba(215,43,43,0.25)'}`,
                          }}
                          onMouseEnter={e => { if (!chosen) (e.currentTarget as HTMLElement).style.background = 'var(--bg-base)'; }}
                          onMouseLeave={e => { if (!chosen) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-black uppercase text-sm"
                              style={{ color: chosen ? '#fff' : 'var(--text-primary)' }}>
                              {svc.name}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest"
                              style={{ color: chosen ? 'rgba(255,255,255,0.75)' : 'var(--primary)' }}>
                              {svc.price}
                            </span>
                          </div>
                          <span className="font-body text-xs mt-0.5 block"
                            style={{ color: chosen ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)' }}>
                            {svc.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <motion.button
                    disabled={!selectedService}
                    onClick={() => { if (selectedService) setModalOpen(true); }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-xl py-3.5 font-display font-black uppercase text-sm tracking-widest transition-all duration-200"
                    style={{
                      background: selectedService ? 'var(--primary)' : 'var(--bg-elevated)',
                      color: selectedService ? '#fff' : 'var(--text-muted)',
                      cursor: selectedService ? 'pointer' : 'default',
                      border: `1px solid ${selectedService ? 'var(--primary)' : 'rgba(215,43,43,0.2)'}`,
                    }}
                  >
                    Book This Slot →
                  </motion.button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); reset(); }}
        selectedDate={selected}
        selectedTime={selectedTime}
        selectedService={selectedService}
      />
    </>
  );
}
