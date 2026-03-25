export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full">
            Disponible para trabajar
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          Hola, soy{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
            Benjamin Riquelme
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Desarrollador Full Stack & Embedded Systems. Desde APIs con Python y React
          hasta firmware en ESP32 y STM32. Construyo soluciones de punta a punta.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 text-base font-medium text-violet-600 dark:text-violet-400 border border-violet-600 dark:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-xl transition-colors"
          >
            Contacto
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
