import { useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { MEDIA_LINKS, STUDIO_LINKS } from '@/data/studio';
import { cn } from '@/lib/utils';

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
}

export function TrailerModal({ open, onClose }: TrailerModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      dialog.returnValue = '';
      onClose();
    };

    dialog.addEventListener('close', handleNativeClose);
    return () => dialog.removeEventListener('close', handleNativeClose);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    let pressedOutside = false;
    const isOutside = (event: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };

    const onPointerDown = (event: PointerEvent) => {
      pressedOutside = isOutside(event);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (pressedOutside && isOutside(event) && dialog.open) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="trailer-dialog-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="m-auto w-[min(94vw,64rem)] max-w-none rounded-[var(--zs-radius-md)] border border-[var(--border-control)] bg-[var(--bg-surface)] p-0 text-[var(--text-primary)] shadow-2xl"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] bg-[var(--zs-night-900)] px-5 py-4 md:px-6">
        <div className="space-y-1">
          <p className="font-mono text-[length:var(--text-eyebrow)] tracking-[var(--tracking-eyebrow)] text-[var(--text-accent)] uppercase">
            Tráiler oficial // Pueblo Chico
          </p>
          <h1
            id="trailer-dialog-title"
            className="font-display text-lg font-bold tracking-[-0.02em] text-[var(--text-primary)] md:text-xl"
          >
            «El silencio es tu peor enemigo»
          </h1>
        </div>

        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          aria-label="Cerrar tráiler"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--zs-radius-sm)] border border-[var(--border-control)] bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-[var(--duration-ember)] hover:border-[var(--text-accent)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="aspect-video w-full bg-[var(--bg-canvas)]">
        {open ? (
          <iframe
            src={MEDIA_LINKS.trailerDriveEmbed}
            title="Tráiler oficial de Pueblo Chico — Zephyro Studios"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] bg-[var(--zs-night-900)] px-5 py-3.5 md:px-6">
        <a
          href={MEDIA_LINKS.trailerDriveView}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-accent)]"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Abrir reproductor en Google Drive</span>
        </a>

        <a
          href={STUDIO_LINKS.itchio}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
        >
          <span>Jugar / Ver en itch.io</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </dialog>
  );
}
