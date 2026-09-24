import { projects } from '../../data/projects';

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-shell bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Trabajo seleccionado · verificable</p>
        <h2 id="projects-title" className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Proyectos</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600 dark:text-gray-300">
          Todos tienen demo en vivo o repositorio público. Empiezo por el que está en producción hoy.
        </p>

        {featured && (
          <article aria-labelledby={`project-title-${featured.id}`} className="mb-6 overflow-hidden rounded-2xl border-2 border-violet-500/60 bg-white shadow-lg dark:bg-gray-800">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              <div className="flex min-h-56 flex-col justify-between bg-gradient-to-br from-violet-600 via-violet-700 to-slate-950 p-8 text-white">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-200"><span aria-hidden="true">★ </span>{featured.context}</p>
                  <h3 id={`project-title-${featured.id}`} className="text-2xl font-bold leading-tight">{featured.title}</h3>
                </div>
                <ul aria-label={`Métricas de ${featured.title}`} className="mt-6 flex flex-wrap gap-2">
                  {featured.metrics?.map((m) => (
                    <li key={m} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{m}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 sm:p-8">
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{featured.description}</p>
                <ul className="mb-4 space-y-2">
                  {featured.highlights?.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <span aria-hidden="true" className="mt-0.5 font-bold text-violet-600 dark:text-violet-400">›</span>{h}
                    </li>
                  ))}
                </ul>
                <ul aria-label={`Tecnologías de ${featured.title}`} className="mb-5 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <li key={tag} className="rounded-md bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{tag}</li>
                  ))}
                </ul>
                <ProjectLinks title={featured.title} repoUrl={featured.repoUrl} liveUrl={featured.liveUrl} primary />
              </div>
            </div>
          </article>
        )}

        <ul className="grid gap-6 sm:grid-cols-2">
          {rest.map((project) => (
            <li key={project.id}>
            <article
              aria-labelledby={`project-title-${project.id}`}
              className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-violet-600"
            >
              <div className="p-6 pb-0">
                {project.context && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">{project.context}</p>
                )}
                <h3 id={`project-title-${project.id}`} className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                  {project.title}
                </h3>
                {project.metrics && (
                  <ul aria-label={`Métricas de ${project.title}`} className="mb-3 flex flex-wrap gap-1.5">
                    {project.metrics.map((m) => (
                      <li key={m} className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{m}</li>
                    ))}
                  </ul>
                )}
                <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>
                {project.highlights && (
                  <ul className="mb-3 space-y-1.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[13px] text-gray-600 dark:text-gray-300">
                        <span aria-hidden="true" className="mt-0.5 font-bold text-violet-600 dark:text-violet-400">›</span>{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-auto p-6 pt-2">
                <ul aria-label={`Tecnologías de ${project.title}`} className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-md bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">{tag}</li>
                  ))}
                </ul>
                <ProjectLinks title={project.title} repoUrl={project.repoUrl} liveUrl={project.liveUrl} />
              </div>
            </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectLinks({ title, repoUrl, liveUrl, primary = false }: { title: string; repoUrl?: string; liveUrl?: string; primary?: boolean }) {
  if (!repoUrl && !liveUrl) {
    return <p className="text-sm text-gray-600 dark:text-gray-400">Producto interno de empresa — detalles disponibles en entrevista.</p>;
  }
  return (
    <div className="flex flex-wrap gap-3">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver demo en vivo de ${title} (se abre en pestaña nueva)`}
          className={primary
            ? 'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700'
            : 'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400'}
        >
          Ver demo en vivo <span aria-hidden="true">↗</span>
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver código de ${title} (se abre en pestaña nueva)`}
          className={primary
            ? 'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-violet-400 hover:text-violet-700 dark:border-gray-600 dark:text-gray-200'
            : 'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-violet-600 dark:text-gray-300'}
        >
          Código <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
