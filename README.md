# Afrin Shariff — Senior Product Designer Portfolio

A modern, interactive portfolio showcasing enterprise SaaS and AI product design work.

## Deployed Sites

- **Portfolio Home:** https://afrin-shariff-senior-product-designer-ebd7be74-7ganvv6fn.vercel.app
- **Location Tracking Case Study:** https://location-tracking-print-61ac67fa-b86x2m4jg.vercel.app

## Project Structure

```
afrin-portfolio/
├── Afrin-Portfolio.html          # Main portfolio page
├── case-studies/
│   ├── field-proxy-v2.html       # Field Proxy case study
│   ├── location-tracking.html    # Location tracking case study
│   ├── location-tracking-print.html
│   ├── image/                    # Case study images
│   └── video/                    # Case study videos
├── css/
│   ├── home2.css                 # Main styles
│   └── liquid-glass.css          # Glass morphism effects
├── js/
│   ├── home2.js                  # Main script
│   └── home2-tweaks.jsx          # Design tweaks
├── images/                       # Portfolio images
├── resume/                       # CV files
└── package.json
```

## Setup & Deployment

### Deploy to Vercel

**Step-by-step:**

1. Create a GitHub repo at github.com/new (name it `afrin-portfolio`)

2. Clone it locally and add your files:
   ```bash
   git clone https://github.com/YOUR-USERNAME/afrin-portfolio.git
   cd afrin-portfolio
   ```

3. Copy all your project files into this folder:
   - Afrin-Portfolio.html
   - case-studies/
   - css/
   - js/
   - images/
   - resume/

4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git push -u origin main
   ```

5. Go to **vercel.com** and click "Add New" → "Project"
   - Import your GitHub repo
   - Click "Deploy"
   - Done! Your site is live.

Vercel auto-detects static HTML files and deploys with zero config.

## Features

- Responsive design
- Liquid glass morphism effects
- Interactive case studies
- Embedded media
- Light/dark mode support

## Browser Support

Modern browsers (Chrome, Safari, Firefox, Edge). No build step required — pure HTML/CSS/JS.

## License

© Afrin Shariff. All rights reserved.
