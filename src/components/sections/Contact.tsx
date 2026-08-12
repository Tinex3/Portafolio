import { profile } from '../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="content-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Contacto</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Hablemos de tu próximo proyecto</h2>
          <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-300">
            Si necesitas una aplicación web, una integración IoT o una solución embebida, escríbeme. Te responderé directamente por email.
          </p>
          <a href={`mailto:${profile.email}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
            {profile.email} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
          <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Escríbeme un mensaje</h3>
          <form action={`mailto:${profile.email}`} method="post" encType="text/plain" className="space-y-5">
            <div>
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" id="name" name="name" required className="form-control" placeholder="Tu nombre" />
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" required className="form-control" placeholder="tu@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="form-label">Mensaje</label>
              <textarea id="message" name="message" required rows={5} className="form-control resize-none" placeholder="Cuéntame sobre tu proyecto..." />
            </div>
            <button type="submit" className="w-full cursor-pointer rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
              Abrir correo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
