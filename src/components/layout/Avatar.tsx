import type { ComponentSize } from '../types';

export type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  name: string;
  src?: string;
  size?: ComponentSize;
  status?: AvatarStatus;
}

const SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-300',
  away: 'bg-amber-400',
};

const DOT_POSITIONS: Record<ComponentSize, string> = {
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
  lg: 'h-3.5 w-3.5',
};

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  status,
}) => (
  <span className={`relative inline-flex shrink-0 ${SIZE_CLASSES[size]}`}>
    {src ? (
      <img
        src={src}
        alt={name}
        className="h-full w-full rounded-full object-cover ring-2 ring-white"
      />
    ) : (
      <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-slate-700 font-semibold text-white ring-2 ring-white">
        {getInitials(name)}
      </span>
    )}
    {status && (
      <span
        className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${STATUS_CLASSES[status]} ring-2 ring-white ${DOT_POSITIONS[size]}`}
        aria-label={status}
      />
    )}
  </span>
);

export default Avatar;