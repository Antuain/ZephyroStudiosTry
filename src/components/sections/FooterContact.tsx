import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Send,
} from 'lucide-react';
import { ChapterEyebrow } from '@/components/editorial/ChapterEyebrow';
import { EditorialSection } from '@/components/editorial/EditorialSection';
import { ZephyroMark } from '@/components/editorial/ZephyroMark';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { STUDIO_LINKS } from '@/data/studio';
import { cn } from '@/lib/utils';

export type ContactTopic = 'notify' | 'press' | 'general';

interface ContactSectionProps {
  topicSignal: number;
  selectedTopic: ContactTopic;
  onTopicChange: (topic: ContactTopic) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

type FieldName = 'name' | 'email' | 'message';

interface FormValues {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
  website: string;
}

const TOPIC_OPTIONS: readonly { value: ContactTopic; label: string; defaultMessage: string }[] = [
  {
    value: 'notify',
    label: 'Avisarme sobre Pueblo Chico (itch.io & Teaser)',
    defaultMessage: 'Quiero recibir novedades cuando salga el teaser y la descarga en itch.io de Pueblo Chico.',
  },
  {
    value: 'press',
    label: 'Prensa, eventos y difusión',
    defaultMessage: '',
  },
  {
    value: 'general',
    label: 'Consulta general para el estudio',
    defaultMessage: '',
  },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: FieldName, value: string): string {
  const trimmed = value.trim();
  if (field === 'name') {
    if (!trimmed) return 'Error: Ingresá tu nombre para saber cómo dirigirnos a vos.';
    if (trimmed.length < 2) return 'Error: Escribí al menos 2 caracteres en tu nombre.';
    return '';
  }
  if (field === 'email') {
    if (!trimmed) return 'Error: Ingresá un correo electrónico de contacto.';
    if (!EMAIL_PATTERN.test(trimmed)) {
      return 'Error: Ingresá un correo con el formato nombre@ejemplo.com.';
    }
    return '';
  }
  if (field === 'message') {
    if (!trimmed) return 'Error: Escribí un mensaje breve antes de enviar.';
    if (trimmed.length < 10) return 'Error: Escribí al menos 10 caracteres en el mensaje.';
    return '';
  }
  return '';
}

export function ContactSection({
  topicSignal,
  selectedTopic,
  onTopicChange,
  nameInputRef,
}: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    topic: selectedTopic,
    message: '',
    website: '',
  });
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [errors, setErrors] = useState<Record<FieldName, string>>({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedPress, setCopiedPress] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');

  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const announceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (topicSignal === 0) return;
    setSubmitted(false);
    setValues((prev) => {
      const notifyDefault = TOPIC_OPTIONS[0].defaultMessage;
      return {
        ...prev,
        topic: selectedTopic,
        message:
          selectedTopic === 'notify' && !prev.message.trim()
            ? notifyDefault
            : prev.message,
      };
    });
  }, [topicSignal, selectedTopic]);

  useEffect(() => {
    return () => {
      if (announceTimerRef.current !== null) {
        window.clearTimeout(announceTimerRef.current);
      }
    };
  }, []);

  const scheduleAnnouncement = (text: string) => {
    if (announceTimerRef.current !== null) {
      window.clearTimeout(announceTimerRef.current);
    }
    setLiveMessage('');
    announceTimerRef.current = window.setTimeout(() => {
      setLiveMessage(text);
    }, 350);
  };

  const handleFieldChange =
    (field: FieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      if (errors[field]) {
        const nextError = validateField(field, nextValue);
        if (!nextError) {
          setErrors((prev) => ({ ...prev, [field]: '' }));
          setLiveMessage('');
        }
      }
    };

  const handleFieldBlur = (field: FieldName) => () => {
    if (!values[field].trim() && !touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextError = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: nextError }));
    if (nextError) {
      const labels: Record<FieldName, string> = {
        name: 'Nombre',
        email: 'Correo electrónico',
        message: 'Mensaje',
      };
      scheduleAnnouncement(`${labels[field]}: ${nextError}`);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.website.trim()) return;

    const nextErrors: Record<FieldName, string> = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    };

    setTouched({ name: true, email: true, message: true });
    setErrors(nextErrors);

    const orderedFields: FieldName[] = ['name', 'email', 'message'];
    const firstInvalid = orderedFields.find((field) => Boolean(nextErrors[field]));

    if (firstInvalid) {
      if (firstInvalid === 'name') nameInputRef.current?.focus();
      if (firstInvalid === 'email') emailRef.current?.focus();
      if (firstInvalid === 'message') messageRef.current?.focus();
      return;
    }

    setSubmitted(true);
    setLiveMessage('Mensaje preparado correctamente. Podés enviarlo desde tu cliente de correo.');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_LINKS.contactEmail);
      setCopiedPress(true);
      setLiveMessage('Correo oficial copiado al portapapeles.');
      window.setTimeout(() => setCopiedPress(false), 2600);
    } catch {
      setLiveMessage(`Correo oficial: ${STUDIO_LINKS.contactEmail}`);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setValues({
      name: '',
      email: '',
      topic: selectedTopic,
      message: '',
      website: '',
    });
    setTouched({ name: false, email: false, message: false });
    setErrors({ name: '', email: '', message: '' });
    setLiveMessage('');
  };

  const topicLabel =
    TOPIC_OPTIONS.find((item) => item.value === values.topic)?.label ?? 'Contacto';
  const mailtoHref = `mailto:${STUDIO_LINKS.contactEmail}?subject=${encodeURIComponent(
    `[Zephyro Studios] ${topicLabel}`,
  )}&body=${encodeURIComponent(
    `Nombre: ${values.name.trim()}\nCorreo: ${values.email.trim()}\n\n${values.message.trim()}`,
  )}`;

  const nameDescribedBy = errors.name ? 'contact-name-error' : undefined;
  const emailDescribedBy = errors.email
    ? 'contact-email-hint contact-email-error'
    : 'contact-email-hint';
  const messageDescribedBy = errors.message ? 'contact-message-error' : undefined;

  return (
    <EditorialSection id="contacto" withTopBorder>
      <div className="visually-hidden" aria-live="polite">
        {liveMessage}
      </div>

      <ChapterEyebrow index="04" label="Contacto y Prensa" />

      <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Columna izquierda: Canales directos */}
        <div className="lg:col-span-5">
          <h2
            id="contact-heading"
            className="font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)]"
          >
            Hablemos
          </h2>

          <p className="mt-4 max-w-[44ch] text-[length:var(--text-lead)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
            Prensa, festivales, publishers o jugadores que quieran seguir el desarrollo de{' '}
            <span className="text-[var(--text-primary)]">Pueblo Chico</span>.
          </p>

          <ul
            role="list"
            className="mt-8 divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]"
          >
            <li className="py-4">
              <span className="block font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                Instagram
              </span>
              <a
                href={STUDIO_LINKS.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex min-h-11 items-center gap-2 font-sans text-[length:var(--text-body)] font-medium text-[var(--text-primary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-accent)]"
              >
                <span>{STUDIO_LINKS.instagram.handle}</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-accent)]" aria-hidden="true" />
              </a>
            </li>

            <li className="py-4">
              <span className="block font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                X
              </span>
              <a
                href={STUDIO_LINKS.x.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex min-h-11 items-center gap-2 font-sans text-[length:var(--text-body)] font-medium text-[var(--text-primary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-accent)]"
              >
                <span>{STUDIO_LINKS.x.handle}</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-accent)]" aria-hidden="true" />
              </a>
            </li>

            <li className="py-4">
              <span className="block font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                TikTok
              </span>
              <a
                href={STUDIO_LINKS.tiktok.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex min-h-11 items-center gap-2 font-sans text-[length:var(--text-body)] font-medium text-[var(--text-primary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-accent)]"
              >
                <span>{STUDIO_LINKS.tiktok.handle}</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-accent)]" aria-hidden="true" />
              </a>
            </li>

            <li className="py-4">
              <span className="block font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                Contacto y Prensa
              </span>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${STUDIO_LINKS.contactEmail}`}
                  className="inline-flex min-h-11 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-primary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-accent)]"
                >
                  {STUDIO_LINKS.contactEmail}
                </a>
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={handleCopyEmail}
                  aria-label="Copiar correo oficial"
                >
                  {copiedPress ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[var(--text-accent)]" aria-hidden="true" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[var(--text-accent)]" aria-hidden="true" />
                      <span>Copiar</span>
                    </>
                  )}
                </Button>
              </div>
            </li>
          </ul>
        </div>

        {/* Columna derecha: Formulario shadcn/ui accesible */}
        <div className="rounded-[var(--zs-radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 md:p-8 lg:col-span-7">
          {submitted ? (
            <div role="status" className="space-y-6 py-4">
              <div className="inline-flex items-center gap-2.5 font-mono text-[length:var(--text-eyebrow)] tracking-[0.12em] text-[var(--text-accent)] uppercase">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Consulta lista para enviar</span>
              </div>

              <h3 className="font-display text-[length:var(--text-h3)] font-bold">
                Gracias, {values.name.trim()}.
              </h3>

              <p className="max-w-[var(--zs-measure-editorial)] text-[length:var(--text-body)] text-[var(--text-secondary)]">
                Como este sitio se aloja de forma estática en GitHub Pages, abrí tu cliente de
                correo con el mensaje prearmado o escribinos directo a{' '}
                <span className="font-mono text-[var(--text-primary)]">
                  {STUDIO_LINKS.contactEmail}
                </span>
                .
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={mailtoHref}
                  className={cn(buttonVariants({ variant: 'default', size: 'default' }))}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Abrir en mi correo</span>
                </a>
                <Button variant="breeze" onClick={handleReset}>
                  Enviar otro mensaje
                </Button>
              </div>
            </div>
          ) : (
            <form
              noValidate
              aria-labelledby="contact-heading"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Campo honeypot oculto para bots */}
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Sitio web</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-name">
                  Nombre <span aria-hidden="true" className="text-[var(--zs-ember-400)]">*</span>
                </Label>
                <Input
                  ref={nameInputRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  required
                  minLength={2}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={nameDescribedBy}
                  placeholder="Tu nombre o medio"
                  value={values.name}
                  onChange={handleFieldChange('name')}
                  onBlur={handleFieldBlur('name')}
                />
                {errors.name ? (
                  <p
                    id="contact-name-error"
                    className="flex items-start gap-2 text-[length:var(--text-meta)] text-[var(--destructive)]"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errors.name}</span>
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">
                  Correo electrónico{' '}
                  <span aria-hidden="true" className="text-[var(--zs-ember-400)]">*</span>
                </Label>
                <span
                  id="contact-email-hint"
                  className="block font-mono text-[0.75rem] text-[var(--text-secondary)]"
                >
                  Formato: nombre@ejemplo.com
                </span>
                <Input
                  ref={emailRef}
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="next"
                  required
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={emailDescribedBy}
                  placeholder="nombre@ejemplo.com"
                  value={values.email}
                  onChange={handleFieldChange('email')}
                  onBlur={handleFieldBlur('email')}
                />
                {errors.email ? (
                  <p
                    id="contact-email-error"
                    className="flex items-start gap-2 text-[length:var(--text-meta)] text-[var(--destructive)]"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                ) : null}
              </div>

              <fieldset className="space-y-3 border-0 p-0">
                <legend className="font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-primary)]">
                  Motivo de contacto
                </legend>
                <div className="space-y-2">
                  {TOPIC_OPTIONS.map((option) => {
                    const radioId = `contact-topic-${option.value}`;
                    return (
                      <div
                        key={option.value}
                        className="flex min-h-11 items-center gap-3 rounded-[var(--zs-radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2 transition-colors duration-[var(--duration-ember)] has-[:checked]:border-[var(--text-accent)]"
                      >
                        <input
                          id={radioId}
                          type="radio"
                          name="topic"
                          value={option.value}
                          checked={values.topic === option.value}
                          onChange={() => {
                            onTopicChange(option.value);
                            setValues((prev) => ({ ...prev, topic: option.value }));
                          }}
                          className="h-4 w-4 shrink-0 accent-[var(--cta-bg)] cursor-pointer"
                        />
                        <label
                          htmlFor={radioId}
                          className="flex-1 cursor-pointer font-sans text-[length:var(--text-meta)] text-[var(--text-primary)]"
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="contact-message">
                  Mensaje <span aria-hidden="true" className="text-[var(--zs-ember-400)]">*</span>
                </Label>
                <Textarea
                  ref={messageRef}
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={messageDescribedBy}
                  placeholder="Contanos en qué podemos ayudarte o dejá tu nota sobre Pueblo Chico."
                  value={values.message}
                  onChange={handleFieldChange('message')}
                  onBlur={handleFieldBlur('message')}
                />
                {errors.message ? (
                  <p
                    id="contact-message-error"
                    className="flex items-start gap-2 text-[length:var(--text-meta)] text-[var(--destructive)]"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="font-mono text-[0.75rem] text-[var(--text-secondary)]">
                  Campos marcados con * son obligatorios.
                </p>
                <Button type="submit" size="lg">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar mensaje</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </EditorialSection>
  );
}

interface SiteFooterProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigatePortfolio: () => void;
}

export function SiteFooter({
  onNavigateHome,
  onNavigatePortfolio,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border-hairline)] bg-[var(--zs-night-900)] px-[var(--zs-gutter)] py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[var(--zs-container-max)] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome('inicio');
            }}
            className="group inline-flex min-h-11 items-center gap-3 text-[var(--text-primary)] no-underline"
          >
            <ZephyroMark kinetic className="h-8 w-auto text-[var(--text-primary)]" />
            <span className="font-display text-lg font-bold tracking-[-0.025em]">
              Zephyro Studios
            </span>
          </a>

          <p className="max-w-[44ch] text-[length:var(--text-meta)] text-[var(--text-secondary)]">
            Estudio independiente de desarrollo de videojuegos con base en Córdoba, Argentina.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <nav aria-label="Pie de página">
            <ul role="list" className="flex flex-wrap items-center gap-6">
              <li>
                <a
                  href="#pueblo-chico"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome('pueblo-chico');
                  }}
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  Pueblo Chico
                </a>
              </li>
              <li>
                <a
                  href="#/portafolio"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePortfolio();
                  }}
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  Portafolio
                </a>
              </li>
              <li>
                <a
                  href="#el-estudio"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome('el-estudio');
                  }}
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  El Estudio
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_LINKS.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  itch.io
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_LINKS.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_LINKS.x.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_LINKS.tiktok.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </nav>

          <p className="font-mono text-[0.75rem] text-[var(--text-secondary)]">
            © 2026 Zephyro Studios · zephyrostudios.com
          </p>
        </div>
      </div>
    </footer>
  );
}
