import { cn } from '@/lib/utils';

interface AmbientBreezeProps {
  paused: boolean;
  className?: string;
}

interface MoteSpec {
  id: string;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  tone: 'breeze' | 'fog' | 'ember';
}

const MOTES: readonly MoteSpec[] = [
  { id: 'm1', left: '11%', top: '24%', size: '3px', delay: '0s', duration: '16s', tone: 'breeze' },
  { id: 'm2', left: '24%', top: '68%', size: '2px', delay: '-4s', duration: '21s', tone: 'fog' },
  { id: 'm3', left: '38%', top: '34%', size: '2px', delay: '-9s', duration: '18s', tone: 'breeze' },
  { id: 'm4', left: '53%', top: '76%', size: '3px', delay: '-2s', duration: '23s', tone: 'ember' },
  { id: 'm5', left: '66%', top: '21%', size: '2px', delay: '-11s', duration: '19s', tone: 'fog' },
  { id: 'm6', left: '78%', top: '57%', size: '3px', delay: '-6s', duration: '25s', tone: 'breeze' },
  { id: 'm7', left: '89%', top: '31%', size: '2px', delay: '-14s', duration: '17s', tone: 'fog' },
  { id: 'm8', left: '16%', top: '48%', size: '2px', delay: '-7s', duration: '22s', tone: 'ember' },
  { id: 'm9', left: '44%', top: '16%', size: '2px', delay: '-12s', duration: '20s', tone: 'breeze' },
  { id: 'm10', left: '72%', top: '79%', size: '2px', delay: '-3s', duration: '24s', tone: 'fog' },
];

const TONE_CLASS: Record<MoteSpec['tone'], string> = {
  breeze: 'bg-[var(--zs-breeze-400)] opacity-45',
  fog: 'bg-[var(--zs-fog-100)] opacity-25',
  ember: 'bg-[var(--zs-ember-500)] opacity-40',
};

export function AmbientBreeze({ paused, className }: AmbientBreezeProps) {
  return (
    <div
      aria-hidden="true"
      data-paused={paused ? 'true' : 'false'}
      className={cn(
        'zs-breeze-field pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 68% 55% at 22% 28%, var(--breeze-glow), transparent 72%), radial-gradient(ellipse 46% 42% at 80% 78%, var(--ember-glow), transparent 74%)',
        }}
      />
      {MOTES.map((mote) => (
        <span
          key={mote.id}
          className={cn('zs-mote absolute rounded-full', TONE_CLASS[mote.tone])}
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
          }}
        />
      ))}
    </div>
  );
}
