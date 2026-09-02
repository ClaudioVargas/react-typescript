import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, description, children }) => (
  <section className="space-y-4">
    <div>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
    {children}
  </section>
);

export default Section;