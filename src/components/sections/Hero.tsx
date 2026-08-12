import { profile } from '../../data/profile';

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Disponible para trabajar
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{profile.location}</span>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Software · Hardware · Cloud
          </p>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-7xl">
            Construyo productos que conectan el mundo físico con el digital.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
            Soy <strong className="font-semibold text-gray-900 dark:text-white">{profile.shortName}</strong>, {profile.role.toLowerCase()} con formación en electrónica. Desarrollo APIs, interfaces web, firmware e infraestructura para soluciones IoT.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row">
            <a href="#projects" className="rounded-xl bg-violet-600 px-8 py-3 text-center text-base font-semibold text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:w-auto">
              Ver proyectos
            </a>
            <a href={profile.cvUrl} download className="rounded-xl border border-gray-300 px-8 py-3 text-center text-base font-semibold text-gray-700 transition-colors hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-violet-500 dark:hover:bg-violet-900/20 dark:hover:text-violet-300 sm:w-auto">
              Descargar CV
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <a className="hover:text-violet-600 dark:hover:text-violet-400" href={profile.github} target="_blank" rel="noreferrer">GitHub / Tinex3</a>
            <a className="hover:text-violet-600 dark:hover:text-violet-400" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-5 rounded-[2rem] bg-violet-500/10 blur-2xl" />
          <div className="relative rounded-[2rem] border border-gray-200 bg-white/80 p-6 shadow-2xl shadow-violet-950/10 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80">
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <span className="font-mono text-sm text-gray-500 dark:text-gray-400">benjamin.dev</span>
              <span className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-500" /> online</span>
            </div>
            <pre className="overflow-x-auto font-mono text-sm leading-7 text-gray-600 dark:text-gray-300"><code>{`const solution = {
  frontend: "Next.js + TypeScript",
  backend: "Python + FastAPI",
  embedded: "STM32 + ESP32",
  infrastructure: "AWS serverless + Docker",
};`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
