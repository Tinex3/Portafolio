import { profile } from '../../data/profile';

const stats = [
  { value: '2+', label: 'Años: electrónica → firmware → full stack' },
  { value: '53', label: 'Dispositivos IoT en producción' },
  { value: '98%', label: 'Uptime de plataforma en Tekroy' },
];

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              {profile.availability}
              <span className="visually-hidden">(disponible para trabajar)</span>
            </span>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            {profile.role}
          </p>
          <h1 id="hero-title" className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Full Stack + IoT: del sensor al dashboard en producción.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Soy <strong className="font-semibold text-gray-900 dark:text-white">{profile.shortName}</strong>.{' '}
            {profile.headline}. En Tekroy mantengo una plataforma con 53 dispositivos, 100 usuarios y 98% uptime.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Busco roles: {profile.openTo.join(' · ')} — {profile.location}
          </p>

          {/* Ley de Hick: 1 acción primaria + 1 secundaria. LinkedIn y
              contacto directo como vía terciaria de bajo peso visual. */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#projects" className="rounded-xl bg-violet-600 px-7 py-3 text-center text-base font-semibold text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
              Ver proyectos en vivo
            </a>
            <a href={profile.cvUrl} download className="rounded-xl border border-gray-300 px-7 py-3 text-center text-base font-semibold text-gray-700 transition-colors hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-violet-500 dark:hover:bg-violet-900/20 dark:hover:text-violet-300">
              Descargar CV (PDF)
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            ¿Prefieres otro canal?{' '}
            <a className="font-medium text-violet-700 underline-offset-4 hover:underline dark:text-violet-300" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="visually-hidden">(se abre en pestaña nueva)</span>
            </a>
            {' · '}
            <a className="font-medium text-violet-700 underline-offset-4 hover:underline dark:text-violet-300" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {' · '}
            <a className="font-medium text-violet-700 underline-offset-4 hover:underline dark:text-violet-300" href={profile.github} target="_blank" rel="noreferrer">
              GitHub / Tinex3 <span aria-hidden="true">↗</span>
              <span className="visually-hidden">(se abre en pestaña nueva)</span>
            </a>
          </p>

          <ul aria-label="Logros destacados" className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className="reveal-item rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur dark:border-gray-700 dark:bg-gray-800/70"
                style={{ ['--reveal-delay' as string]: `${i * 40}ms` }}
              >
                <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-gray-600 dark:text-gray-300">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden lg:block">
          <div aria-hidden="true" className="absolute -inset-5 rounded-[2rem] bg-violet-500/10 blur-2xl" />
          <div className="relative rounded-[2rem] border border-gray-200 bg-white/80 p-6 shadow-2xl shadow-violet-950/10 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80">
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <span className="font-mono text-sm text-gray-500 dark:text-gray-400">benjamin.dev — producción</span>
              <span className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" /> online</span>
            </div>
            <pre className="overflow-x-auto font-mono text-sm leading-7 text-gray-600 dark:text-gray-300"><code>{`const impacto = {
  dispositivos: 53,
  usuarios: 100,
  uptime: "98%",
  stack: "FastAPI + Next.js + AWS",
  campo: "LoRaWAN + LTE + Modbus",
};`}</code></pre>
            <ul aria-label="Tecnologías principales" className="mt-6 flex flex-wrap gap-2">
              {['Python', 'React', 'AWS serverless', 'LoRaWAN'].map((t) => (
                <li key={t} className="rounded-md bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{t}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Reclutadores: todo lo listado está desplegado y es verificable (demos + repos + CV en PDF).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
