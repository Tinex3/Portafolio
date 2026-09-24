import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { profile } from '../../data/profile';

// Ley de Hick: máximo 4 opciones simultáneas en escritorio.
// 3 rutas de alta intención + menú "Más" con revelado progresivo.
// El logo cubre "Inicio" (smart default: no ocupa un slot).
const primaryLinks = [
  { label: 'Proyectos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Contacto', href: '#contact' },
];

const overflowLinks = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Formación', href: '#education' },
  { label: 'Cloud', href: '#cloud' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Cerrar "Más" con Escape o clic fuera; devolver foco al botón.
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [moreOpen]);

  return (
    <nav aria-label="Navegación principal" className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex min-h-[44px] min-w-[44px] items-center text-xl font-bold text-gray-900 dark:text-white" aria-label="Benjamin Riquelme — ir al inicio">
            {'<BR />'}
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                aria-controls="nav-more-menu"
                onClick={() => setMoreOpen((v) => !v)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-violet-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-violet-400"
              >
                Más <span aria-hidden="true">{moreOpen ? '▴' : '▾'}</span>
              </button>
              {moreOpen && (
                <div
                  id="nav-more-menu"
                  role="menu"
                  aria-label="Secciones secundarias"
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  {overflowLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-violet-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-violet-400"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href={profile.cvUrl}
              download
              className="ml-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
            >
              CV
            </a>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="nav-mobile-menu"
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="nav-mobile-menu" className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700/50">
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Principal
            </p>
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block min-h-[44px] px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Más información
            </p>
            {overflowLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block min-h-[44px] px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.cvUrl}
              download
              onClick={() => setIsOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-xl bg-violet-600 px-3 py-2 text-center text-base font-semibold text-white"
            >
              Descargar CV
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
