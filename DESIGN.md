# DESIGN.md — Sistema de Diseño «La Brisa Nocturna»

**Proyecto:** Landing page oficial de **Zephyro Studios** (`zephyrostudios.com`) y presentación de su título debut de terror folclórico argentino **Pueblo Chico**.  
**Base:** Estudio independiente en Córdoba, Argentina.  
**Filosofía del Estudio:** *«Aire nuevo»* — un respiro autoral frente al terror genérico, con foco en el audio 3D espacial y la atmósfera serrana.

---

## 1. Identidad, Tono y Dirección de Arte

**«La Brisa Nocturna»** combina la calma fría de una noche cerrada en un pueblo del interior cordobés con la inquietud latente de un fogón distante que nunca termina de apagarse. No es una web corporativa ni una landing SaaS: es un programa de mano cinematográfico, silencioso y tenso.

- **Tagline de Pueblo Chico:** *«El silencio es tu peor enemigo»*.
- **Personalidad visual:** Nocturna, editorial, austera, orgánica y precisa.
- **Metáfora física:** Corrientes de viento frío (`#7FA9C7`) que barren la oscuridad (`#0A0F1A`) y dejan ver brevemente la brasa (`#D97736`) antes de volver a la penumbra.

---

## 2. Dials Anti-Slop y Composición Editorial (`unslop-ui` / `Taste Skill`)

| Dial | Valor elegido | Regla de implementación |
| :--- | :--- | :--- |
| **Densidad visual** | Baja (25–30%) | Espaciado vertical generoso entre secciones: `clamp(5.5rem, 11vw, 10.5rem)`. El vacío y la oscuridad comunican silencio. |
| **Grilla y ritmo** | Editorial asimétrica (12 col.) | Contenedor máximo `76rem` (`1216px`), bloques alternados izquierda/derecha, sin apilar grillas idénticas de 3 columnas con íconos en círculos. |
| **Medida de lectura** | Estrecha y legible | Párrafos corridos limitados a `max-width: 60ch` para mantener ritmo literario. |
| **Superficies y bordes** | Capilares y mate | Bordes de `1px solid var(--border-hairline)` con contraste sutil; prohibido el glassmorphism pesado, los brillos neón y las sombras difusas de tarjeta SaaS. |
| **Radio de esquinas** | Editorial contenido | `--zs-radius-xs: 0.125rem` (2px) y `--zs-radius-sm: 0.25rem` (4px). Sin cápsulas exageradas salvo indicadores de estado puntuales. |
| **Uso del color de tensión** | Quirúrgico (< 5% del área) | `#D97736` se reserva exclusivamente para el CTA principal (*Wishlist / Ver teaser*), estados activos críticos y una chispa ambiental puntual. |

### Prohibiciones estrictas
1. Cero gradientes violetas/cian ni mallas de fondo genéricas de IA.
2. Cero tarjetas repetidas en fila de «3 features con ícono arriba + título + 2 líneas».
3. Cero texto centrado masivo en todas las secciones; el Hero y las secciones editoriales usan jerarquía asimétrica con anclajes de metadatos técnicos en `JetBrains Mono`.
4. Cero animaciones con rebote elástico (`spring` juguetón) o duraciones abruptas.

---

## 3. Sistema de Color y Matriz de Contraste WCAG 2.1 (`Hue`)

### Paleta Oficial Inmutable
| Rol | Nombre | Hex | Uso principal |
| :--- | :--- | :--- | :--- |
| **Fondo principal** | Noche profunda | `#0A0F1A` | Lienzo base (`--bg-canvas`) y texto sobre acentos claros/ámbar |
| **Superficies / Bordes** | Penumbra serrana | `#131B2E` | Contenedores `stageshow`, tarjetas editoriales, footer y divisores |
| **Acento primario** | Brisa nocturna | `#7FA9C7` | Metadatos, etiquetas técnicas, foco de teclado, acentos secundarios |
| **Texto principal** | Niebla | `#EAEFF5` | Titulares en `Syne`, cuerpo editorial y trazo del isotipo |
| **Acento de tensión / CTA** | Ámbar / Fuego | `#D97736` | Botón de Wishlist / Teaser y señales de alerta o fuego |

### Tokens Derivados Controlados (para Accesibilidad AA/AAA)
- `--zs-fog-300: #94A6BC` — Texto secundario y descripciones con contraste alto y lectura cómoda sin perder tono frío.
- `--zs-border-interactive: #587394` — Borde para inputs, selectores y controles interactivos, cumpliendo **WCAG 1.4.11** (≥ 3:1 en límites de componentes).
- `--zs-night-800: #1A243C` — Superficie elevada (hover de filas o paneles anidados).
- `--zs-ember-400: #E58647` — Estado `:hover` del CTA ámbar.

### Verificación de Contraste WCAG 2.1 (calculado)
| Combinación (Primer plano / Fondo) | Ratio | Nivel WCAG | Regla de uso |
| :--- | :---: | :---: | :--- |
| `#EAEFF5` (Niebla) sobre `#0A0F1A` (Noche) | **16.57:1** | AAA | Titulares, cuerpo principal e isotipo |
| `#EAEFF5` (Niebla) sobre `#131B2E` (Superficie) | **14.84:1** | AAA | Texto dentro de contenedores y formularios |
| `#94A6BC` (Niebla tenue) sobre `#0A0F1A` | **7.70:1** | AAA | Subtítulos, roles del equipo y notas al pie |
| `#94A6BC` (Niebla tenue) sobre `#131B2E` | **6.90:1** | AA / AAA texto grande | Metadatos secundarios en tarjetas |
| `#7FA9C7` (Brisa) sobre `#0A0F1A` | **7.67:1** | AAA | Etiquetas técnicas, links y foco |
| `#7FA9C7` (Brisa) sobre `#131B2E` | **6.87:1** | AA | Badges de pilares y acentos en superficie |
| `#0A0F1A` (Noche) sobre `#D97736` (Ámbar CTA) | **6.06:1** | AA | **OBLIGATORIO en botones `#D97736`** |
| `#EAEFF5` (Niebla) sobre `#D97736` (Ámbar CTA) | **2.73:1** | **FALLA AA** | **PROHIBIDO como texto normal sobre `#D97736`** |

### Reglas Técnicas de Color
1. **Mezclas seguras:** Todas las transparencias o tintes dinámicos usan `color-mix(in oklab, ...)` y **nunca** `in oklch` al mezclar con neutros (previene el desplazamiento cromático hacia magenta en Chromium).
2. **Esquema nativo y modos del sistema:** `:root` declara `color-scheme: dark;` para alinear scrollbars y controles nativos. Se incluyen reglas para `@media (prefers-contrast: more)` y `@media (forced-colors: active)` usando palabras clave del sistema (`Canvas`, `CanvasText`, `Highlight`, `ButtonText`).
3. **Nunca depender solo del color:** Estados de validación en el formulario de contacto e indicadores de estado incluyen ícono y texto explícito (WCAG 1.4.1).

---

## 4. Sistema Tipográfico (`Better Typography`)

- **Display y Encabezados:** `Syne` (pesos `500`, `600`, `700`, `800`). Tracking negativo ajustado (`-0.035em` en display, `-0.025em` en `h1/h2`) para reforzar tensión arquitectónica.
- **Cuerpo Editorial:** `IBM Plex Sans` (pesos `400`, `500`, `600`). Neutralidad técnica y legibilidad impecable en pantalla oscura con `line-height: 1.65` (sin unidad).
- **Metadatos, Audio 3D y Fichas Técnicas:** `JetBrains Mono` (pesos `400`, `500`) con `font-variant-numeric: tabular-nums` para coordenadas, duración de teaser, specs de audio espacial y roles del equipo.

### Escala Fluida (`clamp()` en `rem`, `max <= 2.5 * min`)
| Token | Escala fluida | Line-height | Tracking | Uso |
| :--- | :--- | :---: | :---: | :--- |
| `--text-display` | `clamp(2.5rem, 1.5rem + 4.2vw, 5.25rem)` | `0.98` | `-0.035em` | Título principal de Hero / *Pueblo Chico* |
| `--text-h1` | `clamp(2.125rem, 1.4rem + 3vw, 4rem)` | `1.04` | `-0.03em` | Encabezado principal de página |
| `--text-h2` | `clamp(1.625rem, 1.2rem + 1.8vw, 2.75rem)` | `1.12` | `-0.025em` | Títulos de sección |
| `--text-h3` | `clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)` | `1.22` | `-0.015em` | Subtítulos, pilares y bloques |
| `--text-lead` | `clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem)` | `1.55` | `-0.005em` | Bajadas editoriales y sinopsis |
| `--text-body` | `1rem` | `1.65` | `0` | Texto corrido |
| `--text-meta` | `0.8125rem` | `1.45` | `0.02em` | Fichas técnicas, inputs, notas |
| `--text-eyebrow` | `0.75rem` | `1.3` | `0.14em` | Indicadores de capítulo (`01 / ...`) |

- **Reglas de envoltorio y zoom:** `text-wrap: balance` solo en titulares sin caja visible; `text-wrap: pretty` en párrafos. Ningún contenedor con texto fija `height` o `block-size` (se usa `min-block-size`) para soportar zoom al 200% y espaciado de texto WCAG 1.4.4 / 1.4.12.

---

## 5. Lenguaje de Movimiento («La Brisa»)

El movimiento no golpea ni rebota: **se desliza como viento entre quebradas**.

- **Curvas:**
  - `--ease-breeze: cubic-bezier(0.22, 1, 0.36, 1)` — Entrada desacelerada orgánica para revelados de texto y hojas del isotipo.
  - `--ease-drift: cubic-bezier(0.37, 0, 0.63, 1)` — Oscilación continua imperceptible para partículas ambientales.
- **Duraciones:**
  - `--duration-ember: 180ms` (microinteracciones de botones y enlaces).
  - `--duration-breeze: 640ms` (revelados editoriales y apertura de contenedores).
  - `--duration-drift: 18s` (deriva ambiental lenta en el stageshow).
- **Rendimiento:** Solo se animan `transform` / `translate` y `opacity` en el compositor.
- **Accesibilidad de movimiento:**
  - Todo movimiento espacial y deriva ambiental es *opt-in* dentro de `@media (prefers-reduced-motion: no-preference)`.
  - Prohibido `animation-duration: 0.01ms;` global.
  - Las partículas ambientales del Hero incluyen un control visible de **Pausar / Reanudar atmósfera** (WCAG 2.2.2 Pause, Stop, Hide).

---

## 6. Arquitectura de Tokens (3 Niveles)

1. **Nivel 1 — Primitivos (`--zs-*`):** Valores crudos de color, fuentes, ritmo espacial, curvas y radios en `src/styles/tokens.css`.
2. **Nivel 2 — Semánticos (`--bg-*`, `--text-*`, `--cta-*`, `--border-*`):** Asignación por propósito sobre `:root`.
3. **Nivel 3 — Integración `shadcn/ui` y Tailwind v4:** Mapeo directo a `--background`, `--foreground`, `--primary`, `--accent`, `--border`, `--input`, `--ring` y exposición mediante `@theme inline` en `src/index.css`.

---

## 7. Activos y Uso del Isotipo

- El archivo [`src/assets/zephyro-isotipo.svg`](src/assets/zephyro-isotipo.svg) fue extraído directamente de las curvas Bézier originales de `Branding Zephyro/Rebranding ZS.ai` (Mesa de trabajo 2), normalizado en `viewBox="0 0 800 724"` con dos trazos independientes (`#zephyro-blade-top` y `#zephyro-blade-bottom`).
- Utiliza `fill="currentColor"` (con `color="#EAEFF5"` por defecto para importación directa como imagen) para permitir:
  - Nitidez vectorial infinita en pantallas Retina/4K.
  - Animación cinética sutil entre ambas hojas en el navbar y en el cierre sin perder legibilidad.
  - Adaptación automática en Modo de Contraste Alto de Windows.
- Área de respiro mínima alrededor del isotipo: `0.5x` de su altura en navbar y `1x` en hero/cierre.

---

## 8. Hoja de Ruta (Fases 2, 3 y 4)

- **Fase 2 — Anti-Slop y Primitivas de Layout:** Grilla editorial asimétrica (`EditorialSection`, `HairlineRule`, `ChapterEyebrow`), componente cinético `<ZephyroMark />` y sistema de deriva sutil en `prefers-reduced-motion: no-preference`.
- **Fase 3 — Secciones y Showcase (`shadcn/ui` + `stageshow`):**
  - `Navbar`: isotipo cinético, navegación anclada (*Pueblo Chico*, *El Estudio*, *Contacto*) y enlace rápido al teaser.
  - `HeroStageshow`: tagline *«El silencio es tu peor enemigo»*, marco tipo `stageshow` preparado para incrustar el teaser sensorial de *Pueblo Chico*, partículas de polvo/brisa nocturna pausables y CTA primario en `#D97736`.
  - `PuebloChicoSection`: sinopsis atmosférica, pilares interactivos/editoriales (Audio 3D espacial binaural, Folclore argentino, Tensión sin *jumpscares* gratuitos) y botón de Wishlist / Teaser en `#D97736` (texto `#0A0F1A`).
  - `StudioSection`: manifiesto breve sobre nuestra identidad como estudio independiente con base en Córdoba (con una mención sutil a nuestros inicios en el IES), filosofía *«aire nuevo»* y grilla editorial del equipo de **6 desarrolladores**.
  - `FooterContact`: formulario limpio construido con componentes `shadcn/ui` (`Button`, `Input`, `Textarea`, `Label`, `Badge`), validación accesible, correo oficial `contacto@zephyrostudios.com`, enlaces a Instagram (`@zephyrostudios`), X (`@ZephyroStudios`), TikTok (`@zephyrostudios`) y cierre con isotipo cinético.
- **Fase 4 — Auditoría (`Impeccable`, `Hallmark`):** Revisión completa de contraste, navegación por teclado, responsive (`320px` a `1440px+`), zoom 200%, microinteracciones y verificación de `npm run build` estático hacia `dist/` con `CNAME`.
