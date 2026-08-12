import { certifications, education } from '../../data/profile';

export default function Education() {
  return (
    <section id="education" className="section-shell bg-gray-50 dark:bg-gray-800/50">
      <div className="content-shell grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <SectionHeading eyebrow="Formacion" title="Aprendizaje continuo" />
          <div className="space-y-4">
            {education.map((item) => (
              <article
                key={`${item.institution}-${item.program}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.program}</h3>
                    <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">{item.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.period}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Más allá del código" title="Cómo trabajo" />
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
              Me gusta trabajar de forma colaborativa, asumir responsabilidades y seguir aprendiendo. Creo que una buena solución técnica también necesita comunicación clara, criterio y disposición para ayudar al equipo.
            </p>
            <ul className="space-y-4">
              {certifications.map((certification) => (
                <li key={certification} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    ✓
                  </span>
                  {certification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
