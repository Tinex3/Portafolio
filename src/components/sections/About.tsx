import { profile } from '../../data/profile';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Perfil</p>
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Sobre mí</h2>
        <div className="w-20 h-1 bg-violet-600 dark:bg-violet-400 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              Soy {profile.name}, desarrollador Full Stack e IoT con formación en electrónica. Trabajo con Python, React, Next.js y PostgreSQL en productos web, y con C/C++, STM32, ESP32 y Raspberry Pi en sistemas embebidos.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              Me especializo en conectar hardware, software y nube: desde protocolos UART y Modbus RTU hasta telemetría con LTE y LoRaWAN, APIs, interfaces en tiempo real y arquitecturas AWS serverless con seguridad, colas, ETL y observabilidad.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">2+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Años de experiencia</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">30+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Repositorios en GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
