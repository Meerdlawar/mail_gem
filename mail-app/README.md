# A Letter for You

An interactive old-style envelope and parchment letter built with React and CSS. The wax seal opens with a sequenced flap-and-letter animation, while the reading view supports keyboard focus, Escape-to-close, and reduced-motion preferences.

## Personalise the letter

Edit [`src/letterContent.js`](./src/letterContent.js). The recipient, seal initial, place, date, salutation, paragraphs, sign-off, signature, and postscript all live in that one object.

## Run locally

Use Node 20.19 or newer.

```bash
npm install
npm run dev
```

Other available checks:

```bash
npm run lint
npm run build
```

The envelope artwork, wax, stamp, desk texture, and parchment are all rendered in CSS/SVG, so the project does not depend on image assets for the effect.
