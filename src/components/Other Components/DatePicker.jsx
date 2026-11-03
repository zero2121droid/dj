import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCalendarOutline, IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';

const MONTHS = ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'];
const DAYS = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
const DAY_NAMES = ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'];

const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
export const formatDate = (d) => `${DAY_NAMES[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}.`;

// Booking date picker in the site's style. Past days are disabled; Friday and Saturday,
// the usual gig nights, are marked red. Submits the readable date through a hidden input.
const DatePicker = ({ name, value, onChange, placeholder = 'Izaberi datum' }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => new Date((value || today).getFullYear(), (value || today).getMonth(), 1));
  const root = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first offset
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))];
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const pick = (d) => {
    onChange(d);
    setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value ? formatDate(value) : ''} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`w-full flex items-center gap-3 bg-neutral-950 border border-white/15 border-b-2 px-3 py-3 text-sm text-left transition-colors ${
          open ? 'border-b-brand bg-neutral-900' : 'border-b-white/35 hover:bg-neutral-900'
        }`}
      >
        <IoCalendarOutline className="text-brand text-lg shrink-0" />
        <span className={`flex-1 truncate ${value ? 'text-white' : 'text-white/40'}`}>
          {value ? formatDate(value) : placeholder}
        </span>
        {value && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Obriši datum"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onChange(null); } }}
            className="p-1 text-white/50 hover:text-white"
          >
            <IoClose />
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Izbor datuma"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 left-0 top-full mt-2 w-[19rem] max-w-[calc(100vw-2rem)] bg-black border border-white/15 shadow-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                disabled={atCurrentMonth}
                onClick={() => setView(new Date(year, month - 1, 1))}
                aria-label="Prethodni mesec"
                className="p-2 hover:text-brand disabled:opacity-25 disabled:hover:text-white"
              >
                <IoChevronBack />
              </button>
              <p className="font-display uppercase text-2xl leading-none">
                {MONTHS[month]} <span className="text-brand">{year}</span>
              </p>
              <button
                type="button"
                onClick={() => setView(new Date(year, month + 1, 1))}
                aria-label="Sledeći mesec"
                className="p-2 hover:text-brand"
              >
                <IoChevronForward />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {DAYS.map((d, i) => (
                <span key={d} className={`text-[0.65rem] font-bold uppercase tracking-wider pb-1 ${i === 4 || i === 5 ? 'text-brand' : 'text-white/40'}`}>
                  {d}
                </span>
              ))}
              {cells.map((d, i) => {
                if (!d) return <span key={`e${i}`} />;
                const past = d < today;
                const selected = sameDay(d, value);
                const weekendNight = d.getDay() === 5 || d.getDay() === 6;
                return (
                  <button
                    key={d.getDate()}
                    type="button"
                    disabled={past}
                    onClick={() => pick(d)}
                    aria-pressed={selected}
                    aria-label={formatDate(d)}
                    className={`aspect-square grid place-items-center text-sm font-bold transition-colors ${
                      selected
                        ? 'bg-brand text-white'
                        : past
                          ? 'text-white/15 cursor-not-allowed'
                          : `hover:bg-white/10 ${weekendNight ? 'text-brand-hi' : 'text-white'} ${
                              sameDay(d, today) ? 'ring-1 ring-inset ring-white/50' : ''
                            }`
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10 text-xs">
              <span className="text-white/40">
                <span className="text-brand-hi">■</span> petak i subota
              </span>
              <button
                type="button"
                onClick={() => { setView(new Date(today.getFullYear(), today.getMonth(), 1)); }}
                className="font-bold uppercase tracking-wider hover:text-brand"
              >
                Danas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
