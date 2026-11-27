export interface TeamMember {
  readonly index: string;
  readonly name: string;
  readonly role: 'Programación' | 'Game Design' | 'Arte';
}

export interface GamePillar {
  readonly index: string;
  readonly tag: string;
  readonly title: string;
  readonly description: string;
}

export interface GameSpec {
  readonly label: string;
  readonly value: string;
}

export type PortfolioIcon =
  | 'ghost'
  | 'gamepad'
  | 'brain'
  | 'crosshair'
  | 'rocket'
  | 'gauge';

export interface PortfolioProject {
  readonly index: string;
  readonly title: string;
  readonly genre: string;
  readonly platform: string;
  readonly description: string;
  readonly playUrl: string;
  readonly icon: PortfolioIcon;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  { index: '01', name: 'Bruno López', role: 'Programación' },
  { index: '02', name: 'Antonio Amaya', role: 'Programación' },
  { index: '03', name: 'Ulises Piombo', role: 'Game Design' },
  { index: '04', name: 'Facundo Bazán', role: 'Game Design' },
  { index: '05', name: 'Tiago Frias', role: 'Game Design' },
  { index: '06', name: 'Tomás Farra', role: 'Arte' },
] as const;

export const GAME_PILLARS: readonly GamePillar[] = [
  {
    index: '01',
    tag: 'BINAURAL // ESCUCHA ACTIVA',
    title: 'Audio 3D Espacial',
    description:
      'Cuando la linterna falla y la niebla cierra el camino, el oído se vuelve tu único mapa. Cada crujido, ráfaga de viento y paso entre los pastizales está posicionado en tres dimensiones para que la amenaza se perciba antes de verse.',
  },
  {
    index: '02',
    tag: 'MITOLOGÍA RURAL // CÓRDOBA',
    title: 'Folclore Argentino',
    description:
      'Lejos de mansiones genéricas, Pueblo Chico bebe de leyendas del interior argentino, supersticiones de sobremesa y parajes serranos donde el monte guarda memoria propia y nadie pregunta por lo que pasa después de medianoche.',
  },
  {
    index: '03',
    tag: 'TENSIÓN SOSTENIDA // SIN JUMPSCARES GRATUITOS',
    title: 'Terror Atmosférico',
    description:
      'Construimos inquietud a fuego lento: silencio prolongado, decisiones de vulnerabilidad y una puesta en escena contenida donde el miedo nace de lo que intuís detrás de la puerta, no de estridencias artificiales.',
  },
] as const;

export const GAME_SPECS: readonly GameSpec[] = [
  { label: 'Título', value: 'Pueblo Chico' },
  { label: 'Género', value: 'Terror folclórico' },
  { label: 'Perspectiva', value: 'Primera persona' },
  { label: 'Pilar sonoro', value: 'Audio 3D espacial' },
  { label: 'Plataforma', value: 'PC — itch.io' },
  { label: 'Estado', value: 'Tráiler oficial disponible' },
] as const;

export const STUDIO_LINKS = {
  itchio: 'https://zephyro-studios.itch.io/',
  instagram: {
    handle: '@zephyrostudios',
    url: 'https://www.instagram.com/zephyrostudios/',
  },
  x: {
    handle: '@ZephyroStudios',
    url: 'https://x.com/ZephyroStudios',
  },
  tiktok: {
    handle: '@zephyrostudios',
    url: 'https://www.tiktok.com/@zephyrostudios',
  },
  contactEmail: 'contacto@zephyrostudios.com',
} as const;

export const MEDIA_LINKS = {
  trailerDriveEmbed:
    'https://drive.google.com/file/d/142HdAfYfUyifpiT93_ITs5quk-V1wbjQ/preview',
  trailerDriveView:
    'https://drive.google.com/file/d/142HdAfYfUyifpiT93_ITs5quk-V1wbjQ/view',
  showreelVideoUrl:
    'https://raw.githubusercontent.com/Antuain/ZephyroStudiosTry/c65e5c27b8cabc5fadf4c754e8e1726197bcce4c/videos/Zephyro%20Compo%20M%C3%BAsica.mp4',
} as const;

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    index: '01',
    title: 'Easy Cross',
    genre: 'Arcade / Remake',
    platform: 'itch.io',
    description: 'Remake del clásico de Atari con gráficos actualizados.',
    playUrl: 'https://bruzexe.itch.io/easy-cross',
    icon: 'ghost',
  },
  {
    index: '02',
    title: 'Platformer/Jumper',
    genre: 'Plataformas',
    platform: 'itch.io',
    description: 'Platformer minimalista de mecánicas simples.',
    playUrl: 'https://ulises-piombo.itch.io/platformerulisespiombo',
    icon: 'gamepad',
  },
  {
    index: '03',
    title: 'Mind Battle',
    genre: 'Trivia Web',
    platform: 'Web',
    description: 'Juego web de preguntas y respuestas con mecánicas de trivia clásicas.',
    playUrl: 'https://bruze-code.github.io/MindBattle/',
    icon: 'brain',
  },
  {
    index: '04',
    title: 'Última Trinchera',
    genre: 'Top-Down Shooter',
    platform: 'itch.io',
    description: 'Top-Down Shooter de tanques por oleadas centrado en mecánicas de pathfinding.',
    playUrl: 'https://bruzexe.itch.io/ultima-trinchera',
    icon: 'crosshair',
  },
  {
    index: '05',
    title: 'Megamania-reimagine',
    genre: "Shoot 'em up",
    platform: 'itch.io',
    description: "Shoot 'em up arcade reimaginado a partir del clásico MegaMania.",
    playUrl: 'https://ulises-piombo.itch.io/megamania-reimagine',
    icon: 'rocket',
  },
  {
    index: '06',
    title: 'MotorGame',
    genre: 'Arcade Top-Down',
    platform: 'itch.io',
    description: 'Juego arcade de motos top-down de mecánicas directas y vista cenital.',
    playUrl: 'https://ulises-piombo.itch.io/motorgame',
    icon: 'gauge',
  },
] as const;
