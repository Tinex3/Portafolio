import { useState } from 'react';
import { skills } from '../../data/skills';

const categories = ['Frontend', 'Backend & APIs', 'Datos', 'Embedded', 'DevOps / Cloud'] as const;

// Stack que un reclutador debe ver en 6 segundos (Hick: 10 opciones
// simultáneas como máximo en el primer vistazo; el resto tras disclosure).
const coreStack = ['Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'AWS Lambda', 'Docker', 'ESP32', 'LoRaWAN'];

export default function Skills() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Stack</p>
        <h2 id="skills-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Habilidades
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-gray-600 dark:text-gray-300">
          Stack principal con el que trabajo a diario en producción. Lo demás es soporte probado en proyectos.
        </p>

        <ul aria-label="Stack principal de uso diario" className="mx-auto mb-6 flex max-w-4xl flex-wrap justify-center gap-2">
          {coreStack.map((s) => (
            <li key={s} className="rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
              <span aria-hidden="true">★ </span>{s}
            </li>
          ))}
        </ul>

        <div className="text-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="skills-full-grid"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-gray-600 dark:text-gray-200 dark:hover:border-violet-500 dark:hover:text-violet-300"
          >
            {showAll ? 'Ocultar stack completo' : 'Ver stack completo por área'}
          </button>
        </div>

        {showAll && (
          <div id="skills-full-grid" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category} className="reveal-item rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
                <ul aria-label={`Habilidades de ${category}`} className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => {
                      const isCore = coreStack.includes(skill.name);
                      return (
                        <li
                          key={skill.name}
                          title={isCore ? 'Uso diario en producción' : 'Usado en proyectos'}
                          className={isCore
                            ? 'px-3 py-1.5 text-sm font-semibold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/40 rounded-lg ring-1 ring-violet-300 dark:ring-violet-700'
                            : 'px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg'}
                        >
                          {skill.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
