
# KRIOS.store — Catalog Redirect Gateway

> A dark-themed storefront landing page that routes visitors to product collections. Built with zero dependencies — pure HTML, CSS, and vanilla JavaScript.

---

## Preview

[!CLICK HERE FOR VISIT(image-link.png)](https://hacker-darkdevil.github.io/hacker-theme-site/shop.html#)>


---

## Features

- **Category Grid** — 8 redirect cards covering Digital, Physical, Templates, Design, Home, Stationery, Bundles, and New Arrivals
- **Live Search** — filter categories in real time via the nav search box; press `Esc` to clear
- **Keyboard Navigation** — press `1`–`8` to jump to any category instantly
- **Quick Nav Bar** — clickable shortcut strip below the featured banner
- **Featured Banner** — highlighted collection with a custom visual panel
- **Toast Notifications** — non-blocking feedback on every interaction
- **Sticky Nav** — stays fixed at the top on scroll
- **Responsive Layout** — adapts from 4-column grid → 2-column → single column

---

## File Structure

```
shop/
├── shop.html      # Markup and page structure
├── shop.css       # All styles (CSS variables, components, responsive)
├── shop.js        # Category data, rendering, search, keyboard shortcuts
└── 1.webp         # Featured banner visual
```

---

## Getting Started

No build step required. Just open in a browser:

```bash
# Clone the repo
git clone https://github.com/your-username/krios-store.git

# Open directly
open shop/shop.html
```

Or serve locally:

```bash
npx serve shop/
# → http://localhost:3000
```

---

## Customization

### Add or edit categories

Open `shop.js` and modify the `categories` array:

```js
{
  id: 'digital',
  name: 'Digital',
  icon: '</>',
  desc: 'Templates, tools, assets — instant download',
  count: 12,
  badge: 'instant',
  redirect: '/digital'
}
```

### Enable actual redirects

In `shop.js`, uncomment the redirect line inside the card click handler:

```js
// window.location.href = redirect; // Uncomment for actual redirect
```

### Update stats

In `shop.html`, edit the `.stat-pill` blocks inside `.catalog-stats`:

```html
<div class="stat-pill"><span class="stat-num">24</span> products</div>
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#0d0d0d` |
| Surface | `#141414` |
| Accent green | `#00ff88` |
| Accent orange | `#ff6b2b` |
| Accent blue | `#4a9eff` |
| Font (primary) | IBM Plex Mono |
| Font (body) | IBM Plex Sans |

All design tokens are defined as CSS variables in `:root` inside `shop.css`.

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No polyfills needed.

---

## License

MIT
