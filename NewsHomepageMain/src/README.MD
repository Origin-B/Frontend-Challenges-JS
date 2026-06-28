# News Homepage

A responsive news homepage built as a solution to the [Frontend Mentor](https://www.frontendmentor.io) "News homepage" challenge.

![Tip Calculator desktop preview](design/desktop-design.png)
![Tip Calculator mobile preview](design/mobile.design.png)

## 🔗 Links

- Live Demo: (https://origin-b.github.io/Frontend-Challenges-JS/TipCalculatorApp/)
- Frontend Mentor Challenge: (https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX)

## 🚀 Overview

This project recreates a multi-section news landing page featuring a hero article, a "New" sidebar list, and three secondary article cards. It includes a fully responsive layout with a mobile slide-in navigation menu.

### Built with

- **HTML5** — semantic markup
- **Tailwind CSS v4** — utility-first styling, using the new `@theme` and `@utility` CSS-first configuration
- **Vanilla JavaScript** — mobile menu toggle logic
- **Google Fonts** — Inter

## 📂 Project Structure

```
.
├── index.html      # Markup
├── index.js        # Mobile nav toggle logic
├── input.css       # Tailwind source (theme tokens + custom utilities)
├── output.css      # Compiled Tailwind CSS
└── images/         # Image assets (referenced, not included in this listing)
```

## ✨ Features

- Fully responsive layout (mobile, tablet, desktop breakpoints)
- Mobile hamburger menu with slide-in panel and dark overlay
- Custom Tailwind theme tokens (colors, font, breakpoints) defined via `@theme`
- Custom `active` and `overlay` utilities for the mobile nav, defined via `@utility`
- Hover states on links, buttons, and article titles

## 🔧 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and a package manager (npm/pnpm/yarn) if you want to rebuild `output.css` from `input.css`
- Tailwind CSS v4 installed as a dependency

### Rebuilding the CSS

If you make changes to `input.css`, regenerate `output.css` with the Tailwind CLI:

```bash
npx @tailwindcss/cli -i input.css -o output.css --watch
```

### Running the project

No build step is required to view the page as-is. Simply open `index.html` in a browser, or serve it locally:

```bash
npx serve .
```

## 📱 Responsive Breakpoints

| Breakpoint | Width  |
| ---------- | ------ |
| `sm`       | 650px  |
| `md`       | 1024px |

> Note: these are custom breakpoint values, configured in `input.css` and different from Tailwind's defaults.

## 🎨 Color Palette

| Token                 | Value                |
| --------------------- | -------------------- |
| `b-Soft-orange`       | `hsl(35, 77%, 62%)`  |
| `b-Soft-red`          | `hsl(5, 85%, 63%)`   |
| `b-Off-white`         | `hsl(36, 100%, 99%)` |
| `b-Grayish-blue`      | `hsl(233, 8%, 79%)`  |
| `b-Dark-grayish-blue` | `hsl(236, 13%, 42%)` |
| `b-Very-dark-blue`    | `hsl(240, 100%, 5%)` |

## 🙏 Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io?ref=challenge)
- Coded by [OriginB](https://github.com/Origin-B)
