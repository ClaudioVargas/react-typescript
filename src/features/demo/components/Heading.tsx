import type { ReactNode } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
  as?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const HEADING_STYLES: Record<HeadingLevel, string> = {
  h1: 'text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl',
  h2: 'text-2xl font-semibold tracking-tight text-slate-900',
  h3: 'text-xl font-semibold text-slate-900',
  h4: 'text-base font-semibold text-slate-900',
};

export const Heading: React.FC<HeadingProps> = ({ as: Tag = 'h2', children, className = '' }) => (
  <Tag className={`${HEADING_STYLES[Tag]} ${className}`}>{children}</Tag>
);

export default Heading;