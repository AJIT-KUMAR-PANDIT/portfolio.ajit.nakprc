# Design System

## Colors

### Semantic Colors (CSS Custom Properties)

| Token | Light | Dark |
|---|---|---|
| `--background` | `#ededed` | `#1a1a1a` |
| `--foreground` | `#171717` | `#ffffff` |
| `--text-color` | `#171717` | `#ffffff` |

### Page Background

| State | Color | Pattern |
|---|---|---|
| Light | `#e8e4d8` | 40px grid with `#d4cfc3` lines |
| Dark | `#1a1a1a` | 40px grid with `#2d2d2d` lines |

### Primary Accents

| Usage | Color |
|---|---|
| Primary action | `#0062ff` (blue) |
| Brand gradient | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` |
| Brand gradient (horizontal) | `linear-gradient(to right, #2563eb, #8b5cf6)` |
| Single blue | `#3b82f6` |
| Laser/glow | `#0ff` -> `#f0f` -> `#ff0` (2s cycle) |
| Laser active | `rgb(26,255,0)` -> `rgb(255,119,0)` -> `#ff0` (2s cycle) |

### LaserPointer Cursor

| Element | Color |
|---|---|
| Trail/stroke | `#ff0040` |
| Dot | radial gradient `#ff0040` |
| Glow | `rgba(255, 0, 64, ...)` |
| Crosshair | `rgba(255, 0, 64, 0.5)` |

### Project Arena Cards

| Element | Color |
|---|---|
| Card bg | `linear-gradient(145deg, rgba(15,15,15,0.9) 0%, rgba(30,30,30,0.95) 100%)` |
| Card border | `rgba(139, 92, 246, 0.15)` |
| Card hover border | `rgba(139, 92, 246, 0.5)` |
| Tag bg | `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))` |
| Tag color | `#c4b5fd` |
| Tag hover bg | `linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))` |
| Live Demo link bg | `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))` |
| Live Demo link color | `#60a5fa` |
| Source link bg | `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))` |
| Source link color | `#6ee7b7` |
| Title text | `linear-gradient(90deg, #e2e8f0, #ffffff)` on transparent |

### AISearch

| Element | Color |
|---|---|
| Bar bg | `rgba(23, 23, 23, 0.8)` |
| Bar border | `#404040` |
| Input text | `#e5e5e5` |
| Icons (default) | `#a3a3a3` |
| Icons (focused) | `#60a5fa` |

### AIModal

| Element | Color |
|---|---|
| Overlay bg | `rgba(0, 0, 0, 0.7)` backdrop-blur 10px |
| Content bg | `#1a1a1a` |
| Title | `#ff0040` |
| Close hover | `#ff0040` |

### Footer

| Element | Color |
|---|---|
| Link hover | `#2563eb` |
| Heart icon | `#ef4444` |
| Moving text | `/assets/aurabrain.gif` background-clip text |

### Skills Cards

| State | Light | Dark |
|---|---|---|
| Default bg | `#f3f4f6` | `#1f2937` |
| Hover bg | `#e5e7eb` | `#374151` |
| Shadow | `0 1px 3px rgba(0,0,0,0.1)` | `0 1px 3px rgba(0,0,0,0.3)` |
| Hover shadow | `0 4px 12px rgba(0,0,0,0.15)` | `0 4px 12px rgba(0,0,0,0.5)` |

### Background Snake

| Element | Color |
|---|---|
| Grid | `rgba(17, 17, 34, 0.2)` |
| Snake head | `rgba(0, 255, 136, 0.8)` |
| Snake body | `rgba(0, 204, 102, 0.6)` |
| Food | `rgba(255, 51, 102, 0.8)` |
| Shadow | `rgba(0, 255, 136, 0.5)` / `rgba(255, 51, 102, 0.6)` |
| Background | `#0a0a0f` |
| Particles | `#ff3366`, `#ffdd00`, `#00ff88`, `#ff9900` |

### Social Media Brand Colors

| Platform | Color |
|---|---|
| Twitter/X | `#1DA1F2` |
| Facebook | `#1877F2` |
| LinkedIn | `#0A66C2` |
| Instagram | `#E1306C` |
| GitHub | `#333` |

### Contact Section

| Element | Color |
|---|---|
| Map light filter | `saturate(0.7) brightness(0.85) contrast(1.1)` |
| Map dark filter | `invert(180deg) brightness(0.8) contrast(1.2)` |
| Card border | `rgba(139, 92, 246, 0.15)` |
| Card hover border | `rgba(139, 92, 246, 0.4)` |

### Hero Section

| Element | Color |
|---|---|
| Typewriter cursor blink | `rgb(0, 98, 255)` / `#1e66e1` |

---

## Typography

### Font Families

| Name | Value | Usage |
|---|---|---|
| Primary (sans) | `Arial, Helvetica, sans-serif` + `Geist` | Default body |
| Mono | `Geist Mono` | Code elements |
| Custom | `"myFont"` (qb-one-regular.ttf) | Typewriter container |

### Text Sizes

| Class | Size | Usage |
|---|---|---|
| `text-3xl` | 30px | Hero titles |
| `md:text-4xl` | 36px | Section titles |
| `lg:text-5xl` | 48px | Large headings |
| `text-4xl` / `md:text-5xl` | 36px | Section titles (About, etc.) |
| `text-[7vmin]` | responsive | Subtitle text |
| `text-[9vmin]` | responsive | Highlight / typewriter text |
| `text-2xl` | 24px | Service card icons |
| `text-xl` / `md:text-2xl` | 20-24px | Card headings |
| `text-lg` / `md:text-lg` | 18px | Body text |
| `text-sm` | 14px | Meta, tags |
| `text-xs` | 12px | Checkmarks |

### Font Weights

| Weight | Value | Usage |
|---|---|---|
| `font-bold` | 700 | Titles |
| `font-extrabold` | 800/900 | Section titles, typewriter |
| `font-semibold` | 600 | Card headings, read-more, tags |
| `font-medium` | 500 | Skill names |

### Line Heights

| Class | Value | Usage |
|---|---|---|
| `leading-tight` | 1.25 | Subtitle text |
| `leading-relaxed` | 1.625 | Body paragraphs |
| `leading-snug` | 1.375 | Card headings |
| `1.2` | 1.2 | Skills title |
| `1.6` | 1.6 | Overlay answer text |
| `1.75rem` | 28px | Contact description |

---

## Spacing & Sizing

### Breakpoints

| Token | Value |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Section Layout

| Property | Value |
|---|---|
| Section padding | `py-16 px-4` (4rem top/bottom, 1rem sides) |
| Grid gaps | `gap-6` (24px), `md:gap-8` (32px) |
| Card padding | `p-6` / `md:p-8` / `md:p-10` |
| Content wrappers | `max-w-4xl`, `max-w-6xl`, `max-w-7xl` |

---

## Border Radius

| Context | Value |
|---|---|
| Circle icons / pill inputs | `9999px` |
| Social icon links | `rounded-full` (50%) |
| Dock container | `1rem` (hover: `1.5rem`) |
| Dock overlay grid | `1rem` |
| Dock submenu | `0.75rem` |
| AISearch bar | `9999px` |
| Project / Service / Trait cards | `rounded-2xl` (1rem) |
| Section cards | `rounded-2xl` (1rem) |
| Contact info/form cards | `rounded-2xl` (1rem, hover: `1.5rem`) |
| Gallery items | `rounded-xl` (0.75rem) |
| Skill cards | `rounded-2xl` / `0.75rem` (hover: `1.5rem`) |
| Call-to-action button | `rounded-2xl` / `0.75rem` |
| Service icons | `rounded-xl` (0.75rem) |
| Category tags | `rounded-full` |
| Input / textarea | `rounded-2xl` / `0.75rem` |
| Timeline markers | `rounded-full` |
| Image hero | `rounded-full` (180px circle) |
| AIModal overlay | `10px` |

---

## Box Shadows

| Context | Light | Dark |
|---|---|---|
| Dock items | `0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)` | Same |
| AISearch form | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | Same |
| Contact info/form cards | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | Same |
| Call-to-action button | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | Same |
| Skill cards | `0 1px 3px rgba(0,0,0,0.1)` | `0 1px 3px rgba(0,0,0,0.3)` |
| Skill cards hover | `0 4px 12px rgba(0,0,0,0.15)` | `0 4px 12px rgba(0,0,0,0.5)` |
| Project cards | `0 4px 24px rgba(0,0,0,0.3)` | — |
| Project cards hover | `0 12px 40px rgba(139,92,246,0.2), 0 4px 16px rgba(59,130,246,0.15)` | — |
| Service / trait cards | `shadow-lg` (Tailwind default) | — |
| Social icon links | `0 4px 15px rgba(0,0,0,0.2)` | — |
| Social icon hover | `0 6px 20px rgba(0,0,0,0.3)` | — |
| AIModal overlay | `0 0 20px rgba(0,0,0,0.5)` | — |
| Section cards | `shadow-lg` (hover: `shadow-xl`) | — |
| Input fields | `0 1px 2px 0 rgba(0,0,0,0.05)` | — |

---

## Gradients

| Gradient | Usage |
|---|---|
| `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` | Skills title, service icon bg |
| `linear-gradient(to right, #2563eb, #8b5cf6)` | Contact title, submit button, CTA, icon wrapper, social icon hover |
| `linear-gradient(90deg, #e2e8f0, #ffffff)` | Project title text |
| `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))` | Project tag bg |
| `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))` | Live Demo link bg |
| `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))` | Source link bg |
| `linear-gradient(145deg, rgba(15,15,15,0.9), rgba(30,30,30,0.95))` | Project card bg |
| `linear-gradient(to right, #1d4ed8, #7c3aed)` | Submit button hover, CTA hover |
| `linear-gradient(to right, #9ca3af, #6b7280)` | Disabled submit button |

---

## Bottom Navigation (Dock)

### Structure

- **Position**: Fixed at `bottom: 1rem`, `left: 50%`, `translateX(-50%)`
- **Items**: Horizontal row of circular icon items with labels
- **Data source**: API endpoint `/api/nav`
- **Overflow**: "More" button opens full-screen overlay
- **Submenu**: Items with `subItems` show a pop-up above the dock
- **Theme toggle**: Cycles light -> dark -> system -> light

### Responsive Visibility

| Viewport | Max visible items |
|---|---|
| `< 640px` | 3 |
| `640px - 1024px` | 5 |
| `>= 1024px` | 7 |

### Item Sizing

| State | Circle | Icon | Label |
|---|---|---|---|
| Normal | `2.5rem` (40px) | `1.25rem` (20px) | `0.625rem` (10px) |
| Large (overlay) | `4rem` (64px) | `1.75rem` (28px) | `0.875rem` (14px) |

### Dock Styling

| Property | Light | Dark |
|---|---|---|
| Background | `rgba(255,255,255,0.8)` | `rgba(31,41,55,0.8)` |
| Circle bg | `#e5e7eb` | `#374151` |
| Padding | `0.5rem 1rem` | — |
| Icon gap | `0.75rem` | — |
| Hover effect | `laser-glow` (cyan->magenta->yellow) + radius `1.5rem` | — |

### Submenu

| Property | Value |
|---|---|
| Position | Absolutely above dock (`bottom: 100%`) |
| Entry animation | `opacity 0->1, y 10->0` (framer-motion) |
| Light bg | `rgba(255,255,255,0.8)` |
| Dark bg | `rgba(31,41,55,0.8)` |
| Layout | Flex row, `0.5rem` gap |
| Border radius | `0.75rem` |

### Overlay ("More")

| Property | Value |
|---|---|
| Backdrop | `rgba(0,0,0,0.6)` with `backdrop-filter: blur(8px)` |
| Grid layout | 3 cols (mobile), 4 cols (sm), 5 cols (lg) |
| Entry animation | `opacity 0->1` (framer-motion) |

---

## Animations & Motion

### Framer Motion

| Component | Animation |
|---|---|
| Dock submenu | `initial: {opacity:0, y:10}`, `animate: {opacity:1, y:0}`, `exit: {opacity:0, y:10}` |
| Dock overlay | `initial: {opacity:0}`, `animate: {opacity:1}`, `exit: {opacity:0}` |
| Project cards | `initial: {opacity:0, y:40}`, `whileInView: {opacity:1, y:0}`, `delay: idx*0.1s`, `once: true` |
| Dock items hover | `scale(1.1)` |
| Service/social cards | `scale(1.02-1.05)` |
| Input fields focus | Border + shadow transition |

### CSS Keyframes

| Name | Duration | Usage |
|---|---|---|
| `fadeInOut` | 2s ease-in-out infinite | Loader |
| `fadeIn` | — | AboutSection entry |
| `fadeInUp` | — | SkillsSection entry |
| `move-left-to-right` | 15s linear infinite | Footer moving text |
| `laser-glow` | 2s alternate | Laser box-shadow cycle (#0ff->#f0f->#ff0) |
| `laser-glow-it` | 2s alternate infinite | Active laser (#26ff00->#ff7700->#ff0) |
| `text-glow` | 2.5s ease-in-out alternate | Subtle text shadow |
| `map-zoom` | 10s ease-in-out infinite | Contact map animation |
| `spin` | 1s linear infinite | Loading spinner |
| `dotPulse` | 1s ease-in-out infinite | Cursor dot pulse |
| `glowPulse` | 1.5s ease-in-out infinite | Cursor glow pulse |
| `pulse` | 0.3s ease-out | Trail line fade |

### GSAP

| Component | Behavior |
|---|---|
| BackgroundAvatar | Canvas frame-by-frame + ScrollTrigger (scrub: 0.5, pin: canvas), 60 frames |

### Lenis Smooth Scroll

| Property | Value |
|---|---|
| Duration | 1.2s |
| Easing | `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` |
| Options | `smoothWheel: true`, `touchMultiplier: 2` |

### Transition Durations

| Context | Duration |
|---|---|
| Dock item hover | `0.2s` |
| Most hover transitions | `0.3s` / `300ms` |
| Project card transitions | `0.5s` |
| Skill card hover | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## Design Patterns

- **Dual-styling**: SCSS modules handle structure/animation; Tailwind `@apply` handles layout/utilities
- **Laser glow**: Reusable SCSS mixin on interactive elements (dock, project cards, contact cards, AISearch)
- **Aurabrain GIF**: `background-image` + `-webkit-background-clip: text` for gradient text across sections
- **Stroke text**: `-webkit-text-stroke: 1px rgba(241, 9, 9, 0.5)` on aurabrain-highlighted text
- **Glass morphism**: `backdrop-filter: blur(8px)` on dock, AISearch, contact cards
- **Hover lift**: `transform: translateY(-1) scale(1.05)` on most cards
- **Dark mode**: Class-based via `next-themes` with `attribute="class"`, SCSS `&.dark` selectors
