import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import heroImage from '../assets/resized/promo/ISP_0659.jpg';
import sideImage from '../assets/resized/promo/ISP_0690.jpg';
import Toast from '../components/Other Components/Toast';
import DatePicker from '../components/Other Components/DatePicker';
import { PageHero, Reveal } from '../components/Other Components/Motion';
import { CONTACT } from '../data/site';

const EVENT_TYPES = ['Klub', 'Festival', 'Privatna žurka', 'Venčanje', 'Korporativno'];

const inputClass =
  'w-full bg-neutral-950 border border-white/15 border-b-2 border-b-white/35 px-3 py-3 text-sm focus:outline-none focus:border-b-brand focus:bg-neutral-900 [color-scheme:dark]';

const Field = ({ label, children, full = false }) => (
  <label className={`flex flex-col gap-1.5 min-w-0 ${full ? 'sm:col-span-2' : ''}`}>
    <span className="text-xs uppercase tracking-[.12em] text-white/60">{label}</span>
    {children}
  </label>
);

const Booking = () => {
  const [type, setType] = useState(EVENT_TYPES[0]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [date, setDate] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    const f = Object.fromEntries(new FormData(form));
    // The existing EmailJS template only knows name, email and message,
    // so the extra booking details are folded into the message as well.
    const details = [
      `Tip događaja: ${type}`,
      f.date && `Datum: ${f.date}`,
      f.city && `Grad i mesto: ${f.city}`,
      f.phone && `Telefon: ${f.phone}`,
    ].filter(Boolean);
    const message = `${details.join('\n')}\n\n${f.message}`;

    setSending(true);
    setError('');
    emailjs
      .send(
        'service_9d0y8dw', // Service ID from EmailJS
        'template_rwgg14t', // Template ID from EmailJS
        { ...f, event_type: type, message },
        '5PBfDkeFBYXq3Po_j', // User ID from EmailJS
      )
      .then(
        () => {
          setShowToast(true);
          form.reset();
          setType(EVENT_TYPES[0]);
          setDate(null);
        },
        (err) => {
          console.log(err.text);
          setError(`Upit nije poslat. Pokušaj ponovo ili piši direktno na ${CONTACT.email}.`);
        },
      )
      .finally(() => setSending(false));
  };

  return (
    <div>
      <PageHero image={heroImage} eyebrow="Booking" title="Rezerviši" outline="datum" position="center 20%" />

      <Reveal className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <form onSubmit={sendEmail} className="grid sm:grid-cols-2 gap-4">
          <Field label="Ime i prezime *">
            <input name="name" required placeholder="Marko Marković" className={inputClass} />
          </Field>
          <Field label="Email *">
            <input name="email" type="email" required placeholder="ime@primer.com" className={inputClass} />
          </Field>
          <Field label="Telefon">
            <input name="phone" type="tel" placeholder="+381 6x xxx xxxx" className={inputClass} />
          </Field>
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="text-xs uppercase tracking-[.12em] text-white/60">Datum događaja</span>
            <DatePicker name="date" value={date} onChange={setDate} />
          </div>
          <fieldset className="sm:col-span-2 flex flex-col gap-1.5">
            <legend className="text-xs uppercase tracking-[.12em] text-white/60 mb-1.5">Tip događaja</legend>
            <div className="flex flex-wrap gap-1.5">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={`border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    type === t ? 'bg-brand border-brand text-white' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <Field label="Grad i mesto" full>
            <input name="city" placeholder="npr. Leskovac, La Casa" className={inputClass} />
          </Field>
          <Field label="Poruka *" full>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Broj gostiju, trajanje seta, muzika koju želite…"
              className={`${inputClass} resize-y`}
            />
          </Field>
          <button
            type="submit"
            disabled={sending}
            className="sm:col-span-2 justify-self-start bg-brand hover:bg-brand-hi disabled:opacity-60 transition-colors px-7 py-4 text-sm font-bold uppercase tracking-widest"
          >
            {sending ? 'Šaljem…' : 'Pošalji upit →'}
          </button>
          {error && <p className="sm:col-span-2 border-l-4 border-brand bg-brand/10 px-4 py-3 text-sm">{error}</p>}
        </form>

        <aside className="border border-white/15 p-5 md:p-6 flex flex-col gap-4 text-sm font-bold">
          <img src={sideImage} alt="Dejan Jorgaćević" className="w-full aspect-[4/5] object-cover object-[center_20%]" />
          {[
            ['Email', CONTACT.email],
            ['Instagram', `@${CONTACT.instagram}`],
            ['TikTok', `@${CONTACT.tiktok}`],
            ['Rezident', 'La Casa · Safari ABC'],
            ['Zvuk', 'House · Balkan · Afro house'],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="block text-xs font-normal uppercase tracking-wider text-brand">{k}</span>
              {v}
            </div>
          ))}
        </aside>
      </Reveal>

      {showToast && <Toast
          message="Upit je poslat"
          detail={`Odgovor stiže na email koji si upisao. Za hitno: ${CONTACT.email}`}
          onClose={() => setShowToast(false)}
        />}
    </div>
  );
};

export default Booking;
