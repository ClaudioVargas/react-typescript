import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const pageButtonClasses = (isActive: boolean) =>
    [
      'inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ');

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4"
      aria-label="Paginación"
    >
      <p className="text-sm text-slate-500">
        Página <span className="font-medium text-slate-900">{page}</span> de {totalPages}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 text-slate-600 shadow-sm transition-colors duration-200 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        {pages.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onChange(number)}
            aria-current={number === page ? 'page' : undefined}
            className={pageButtonClasses(number === page)}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 text-slate-600 shadow-sm transition-colors duration-200 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;