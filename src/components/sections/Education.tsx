import { certifications, education } from '../../data/profile';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section-shell bg-gray-50 dark:bg-gray-800/50">
      <div className="content-shell grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <SectionHeading eyebrow="Formación" title="Aprendizaje continuo" titleId="education-title" />
          <ul className="space-y-4">
            {education.map((item) => (
              <li key={`${item.institution}-${item.program}`}>
              <article
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.program}</h3>
                    <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">{item.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.period}</span>
                </div>
              </article>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading eyebrow="Más allá del código" title="Cómo trabajo" titleId="work-style-title" />
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
              Me gusta trabajar de forma colaborativa, asumir responsabilidades y seguir aprendiendo. Creo que una buena solución técnica también necesita comunicación clara, criterio y disposición para ayudar al equipo.
            </p>
            <ul className="space-y-4">
              {certifications.map((certification) => (
                <li key={certification} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                  <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    ✓
                  </span>
                  {certification}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <p className="font-semibold text-gray-900 dark:text-white">Idiomas</p>
              <p className="mt-1">Español nativo · Inglés intermedio técnico (documentación, PRs y lectura de specs)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, titleId }: { eyebrow: string; title: string; titleId?: string }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">{eyebrow}</p>
      <h2 id={titleId} className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
