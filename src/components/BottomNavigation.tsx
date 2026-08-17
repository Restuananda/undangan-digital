import { Heart, Sparkles, MapPin, Image as ImageIcon, Info } from 'lucide-react';
import clsx from 'clsx';
import type { ScreenId } from '../types/wedding';

interface NavItem {
  id: ScreenId;
  label: string;
  Icon: typeof Heart;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', Icon: Heart },
  { id: 'story', label: 'Story', Icon: Sparkles },
  { id: 'event', label: 'Event', Icon: MapPin },
  { id: 'gallery', label: 'Gallery', Icon: ImageIcon },
  { id: 'details', label: 'Details', Icon: Info },
];

interface Props {
  active: ScreenId;
  onChange: (id: ScreenId) => void;
}

export default function BottomNavigation({ active, onChange }: Props) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-app border-t border-espresso/10 bg-cream/90 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch justify-between px-2 pt-2">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className="group relative flex w-full flex-col items-center gap-1.5 py-2.5 focus-visible:outline-none"
              >
                <span
                  className={clsx(
                    'flex h-6 items-center justify-center transition-all duration-500 ease-quiet',
                    isActive ? 'scale-100 text-espresso' : 'scale-90 text-stone group-hover:text-espresso/70'
                  )}
                >
                  <Icon size={19} strokeWidth={isActive ? 1.75 : 1.4} />
                </span>
                <span
                  className={clsx(
                    'font-sans text-[9.5px] uppercase tracking-widest2 transition-colors duration-500',
                    isActive ? 'text-espresso' : 'text-stone/80'
                  )}
                >
                  {label}
                </span>
                <span
                  className={clsx(
                    'absolute -top-[9px] h-[2px] rounded-full bg-gold transition-all duration-500 ease-quiet',
                    isActive ? 'w-4 opacity-100' : 'w-0 opacity-0'
                  )}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
