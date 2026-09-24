import { profile } from '../../data/profile';

const highlights = [
  { value: '53 / 100 / 98%', label: 'Dispositivos, usuarios y uptime en producción (Tekroy)' },
  { value: 'Full Stack + campo', label: 'Python/React/AWS + STM32, ESP32, LoRaWAN, LTE, Modbus' },
  { value: 'Deploys reales', label: 'Docker, versionado con rollback y monitoreo' },
  { value: 'Remoto / híbrido', label: 'Base en Viña del Mar, disponible para Chile y remoto' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Perfil</p>
        <h2 id="about-title" className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Sobre mí</h2>
        <div aria-hidden="true" className="w-20 h-1 bg-violet-600 dark:bg-violet-400 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-500 to-slate-900 shadow-xl sm:h-72 sm:w-72" role="img" aria-label={`Foto profesional de ${profile.shortName}`}>
              <span aria-hidden="true" className="text-7xl font-bold text-white/95">BR</span>
              <span className="absolute bottom-4 rounded-full bg-black/40 px-4 py-1 text-xs font-medium text-white backdrop-blur">
                Foto profesional pendiente — agrega tu foto en src/assets/
              </span>
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Idiomas</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {profile.languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-2"><span>{l.name}</span><span className="text-gray-600 dark:text-gray-400">{l.level}</span></li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">Contacto directo</p>
              <div className="mt-2 flex flex-col gap-2 text-sm">
                <a className="font-medium text-violet-600 hover:underline dark:text-violet-400" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="visually-hidden">(se abre en pestaña nueva)</span></a>
                <a className="font-medium text-violet-600 hover:underline dark:text-violet-400" href={profile.github} target="_blank" rel="noreferrer">GitHub / Tinex3 <span aria-hidden="true">↗</span><span className="visually-hidden">(se abre en pestaña nueva)</span></a>
                <a className="break-all text-gray-600 hover:text-violet-600 dark:text-gray-300" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              Soy {profile.name}, desarrollador Full Stack e IoT con formación en electrónica (UTFSM). Pasé de laboratorio y firmware a producto web completo: hoy construyo APIs, interfaces en tiempo real y la infraestructura que las sostiene.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              Mi diferencia: hablo los dos idiomas del sistema. Desde UART, Modbus RTU, LoRaWAN y LTE hasta FastAPI, React/Next.js, PostgreSQL y AWS serverless con colas, ETL y observabilidad. Si el dato nace en un sensor, sé llevarlo hasta el usuario.
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h.label} className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <p className="text-base font-bold text-violet-600 dark:text-violet-400">{h.value}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{h.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
