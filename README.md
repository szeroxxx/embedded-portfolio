# Dhara Rajpura - Embedded Systems Portfolio

A modern, single-page portfolio showcasing embedded systems engineering expertise with a clean, professional design.

## Features

- **Single-Page Scrolling Layout** - Smooth navigation through all sections
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, minimalist design inspired by professional portfolios
- **Interactive Elements** - Smooth animations and transitions using Framer Motion
- **Project Showcase** - Detailed project modals with descriptions and skills
- **Skills Section** - Comprehensive technical skills display
- **Contact Integration** - Direct links to LinkedIn and email

## Sections

1. **Hero** - Introduction with call-to-action buttons
2. **About** - Overview of services and expertise
3. **Experience** - Professional work history
4. **Projects** - Portfolio of embedded systems projects
5. **Skills** - Technical skills and tools
6. **Contact** - Get in touch section with social links

## Technologies Used

- Next.js 15
- React 19
- Framer Motion (animations)
- Tailwind CSS (styling)
- React Icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
├── pages/
│   ├── index.js          # Main single-page portfolio
│   ├── _app.js           # App wrapper
│   └── _document.js      # Document configuration
├── components/
│   ├── ProjectDetails.js # Project data and modal component
│   ├── Layout.js         # Legacy layout (kept for compatibility)
│   └── About.js          # Legacy about component
├── styles/
│   └── globals.css       # Global styles with Inter font
└── public/               # Images and assets
```

## Customization

- Update project data in `components/ProjectDetails.js`
- Modify colors and styling in `styles/globals.css`
- Add new sections in `pages/index.js`
- Replace images in the `public/` folder

## Contact

- **Email**: dhararajpura2001@gmail.com
- **LinkedIn**: [Dhara Rajpura](https://www.linkedin.com/in/dhara-rajpura-4b24b122b/)

---

© 2024 Dhara Rajpura. All rights reserved.
