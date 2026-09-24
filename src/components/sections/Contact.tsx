import { useState } from 'react';
import { profile } from '../../data/profile';

// Envío directo sin backend (gratis, sin registro).
// IMPORTANTE: el primer envío activa el formulario — FormSubmit te mandará
// un email de activación a b.riquelme.gomez@gmail.com; haz clic una vez y listo.
// Alternativa con API key (sin activación): https://web3forms.com
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/b.riquelme.gomez@gmail.com';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SendStatus>('idle');
  const sending = status === 'sending';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get('_honey') || '') !== '') return; // honeypot anti-spam
    const name = String(data.get('name') || '');
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email: String(data.get('email') || ''),
          message: String(data.get('message') || ''),
          _subject: `Contacto portafolio — ${name || 'sin nombre'}`,
          _template: 'table',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="content-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Contacto</p>
          <h2 id="contact-title" className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">¿Hablamos? Respondo en menos de 24h</h2>
          <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-300">
            Busco roles Full Stack, Backend Python e IoT (remoto o híbrido en Chile). Si tienes una posición o un proyecto, escríbeme con el asunto, modalidad y stack: te respondo con CV y disponibilidad.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className="min-h-[44px] rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-gray-600 dark:text-gray-300"
              >
                {copied ? '✓ Copiado en portapapeles' : 'Copiar email'}
              </button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Benjamin Riquelme (se abre en pestaña nueva)" className="inline-flex min-h-[44px] items-center rounded-xl bg-[#0A66C2] px-5 py-2.5 text-white hover:brightness-110">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub de Benjamin Riquelme (se abre en pestaña nueva)" className="inline-flex min-h-[44px] items-center rounded-xl border border-gray-300 px-5 py-2.5 text-gray-700 hover:border-violet-400 hover:text-violet-700 dark:border-gray-600 dark:text-gray-200">GitHub <span aria-hidden="true">↗</span></a>
              <a href={profile.cvUrl} download className="inline-flex min-h-[44px] items-center rounded-xl border border-gray-300 px-5 py-2.5 text-gray-700 hover:border-violet-400 hover:text-violet-700 dark:border-gray-600 dark:text-gray-200">CV en PDF</a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400"><span aria-hidden="true">⏱</span> Respuesta habitual: mismo día · <span aria-hidden="true">📍</span> Viña del Mar (GMT-4) · <span aria-hidden="true">🌐</span> Remoto / híbrido</p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Escríbeme un mensaje</h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Llega directo a mi correo. No necesitas abrir tu cliente de email.</p>
          {status === 'sent' ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-emerald-950/40" role="status">
              <p aria-hidden="true" className="text-3xl">✓</p>
              <p className="mt-2 font-semibold text-emerald-800 dark:text-emerald-200">Mensaje enviado</p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">Gracias por escribir. Te respondo en menos de 24h.</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 min-h-[44px] rounded-xl border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-300"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
          <form className="space-y-5" onSubmit={sendMessage} aria-busy={sending}>
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div>
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" id="name" name="name" required disabled={sending} className="form-control" placeholder="Tu nombre" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" required disabled={sending} className="form-control" placeholder="tu@email.com" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="message" className="form-label">Mensaje</label>
              <textarea id="message" name="message" required disabled={sending} rows={5} className="form-control resize-none" placeholder="Hola Benjamin, te contacto por [rol] en [empresa], modalidad [remoto/híbrido], stack [Python/React/AWS]..." />
            </div>
            {status === 'error' && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300" role="alert">
                No se pudo enviar. Escríbeme directo a <a className="font-semibold underline" href={`mailto:${profile.email}`}>{profile.email}</a> o por <a className="font-semibold underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              aria-live="polite"
              className="w-full min-h-[44px] cursor-pointer rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
