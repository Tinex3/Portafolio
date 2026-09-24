type SkeletonProps = {
  /** Texto anunciado a lectores de pantalla (por defecto se oculta: aria-hidden). */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

function Base({ label, className = '', style }: SkeletonProps) {
  if (label) {
    return (
      <div role="status" aria-label={label} className={`skeleton ${className}`} style={style}>
        <span className="visually-hidden">{label}</span>
      </div>
    );
  }
  return <div aria-hidden="true" className={`skeleton ${className}`} style={style} />;
}

export function SkeletonText({ className = '', style }: SkeletonProps) {
  return <Base className={`h-4 w-full ${className}`} style={style} />;
}

export function SkeletonHeading({ className = '', style }: SkeletonProps) {
  return <Base className={`h-8 w-2/3 ${className}`} style={style} />;
}

/** Fallback de sección completa: misma forma que el contenido real para
 * evitar layout shift (títulos + tarjetas con dimensiones fijas). */
export function SectionSkeleton({ label = 'Cargando sección' }: { label?: string }) {
  return (
    <div role="status" aria-label={label} className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-4 flex flex-col items-center gap-3">
          <div className="skeleton h-4 w-24" aria-hidden="true" />
          <div className="skeleton h-9 w-64" aria-hidden="true" />
          <div className="skeleton h-4 w-96 max-w-full" aria-hidden="true" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              aria-hidden="true"
              className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700"
              style={{ minHeight: '220px' }}
            >
              <div className="skeleton mb-3 h-5 w-1/2" />
              <div className="skeleton mb-2 h-4 w-full" />
              <div className="skeleton mb-4 h-4 w-5/6" />
              <div className="flex gap-2">
                <div className="skeleton h-6 w-16" />
                <div className="skeleton h-6 w-16" />
                <div className="skeleton h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
        <span className="visually-hidden">{label}…</span>
      </div>
    </div>
  );
}

export default Base;
