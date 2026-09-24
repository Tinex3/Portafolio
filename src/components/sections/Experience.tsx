import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Trayectoria</p>
        <h2 id="experience-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Experiencia
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600 dark:text-gray-300">
          Una sola empresa, progresión clara: de electrónica y firmware a producto full stack en producción.
        </p>

        <div className="relative">
          <div aria-hidden="true" className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />

          <ol className="space-y-12">
            {experiences.map((exp, index) => (
              <li
                key={`${exp.role}-${index}`}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <span aria-hidden="true" className="absolute left-4 md:left-1/2 w-3 h-3 bg-violet-600 dark:bg-violet-400 rounded-full -translate-x-1/2 mt-6 ring-4 ring-white dark:ring-gray-900 z-10" />
                <div aria-hidden="true" className="hidden md:block md:w-1/2" />

                <div className="ml-10 md:ml-0 md:w-1/2">
                  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full">
                        {exp.period}
                      </span>
                      {exp.modality && (
                        <span className="inline-block px-3 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full">
                          {exp.modality}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                    <p className="text-violet-600 dark:text-violet-400 font-medium text-sm mb-3">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="mb-4 space-y-2">
                        {exp.achievements.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                            <span aria-hidden="true" className="mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">✓</span>{a}
                          </li>
                        ))}
                      </ul>
                    )}
                    <ul aria-label={`Tecnologías en ${exp.role}`} className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <li key={tech} className="px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
