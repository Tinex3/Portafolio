import { cloudServices } from '../../data/cloud';

const categoryStyles = {
  Cómputo: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Datos: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Seguridad: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  Integración: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Observabilidad: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
} as const;

export default function CloudArchitecture() {
  return (
    <section id="cloud" className="section-shell">
      <div className="content-shell">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Cloud & arquitectura</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Una plataforma IoT preparada para crecer</h2>
          <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
            En Tekroy trabajo en una plataforma IoT que recibe información desde dispositivos, la procesa y la transforma en alertas, recordatorios y reportes. AWS permite que cada parte del producto sea segura, estable y capaz de crecer según la cantidad de usuarios y datos.
          </p>
          <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            Desde el dispositivo hasta el usuario: recepción de datos → procesamiento → almacenamiento → alertas y reportes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cloudServices.map((item) => (
            <article key={item.service} className="rounded-2xl border border-gray-200 bg-white p-5 transition-transform hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.service}</h3>
                <span className={`shrink-0 rounded-full px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${categoryStyles[item.category]}`}>
                  {item.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.use}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
