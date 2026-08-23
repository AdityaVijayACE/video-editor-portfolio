# Video Editor Portfolio Website

A modern, experimental video editor portfolio showcasing commercial, film, and content creator projects.

## Features

- **Responsive Design** - Works on all devices
- **Dark Cinematic Theme** - Optimized for video work
- **Interactive Elements** - Custom cursor, scroll animations
- **Project Filtering** - Filter by category (Commercial/Film/Content)
- **Contact Form** - Email integration with Calendly placeholder
- **Fast Loading** - Optimized with lazy loading

## Files Structure

```
video-editor-portfolio/
├── index.html           # Homepage
├── projects.html        # All projects grid
├── about.html           # About page
├── contact.html         # Contact form & info
├── css/
│   └── styles.css       # Main stylesheet
├── js/
│   └── main.js          # Interactive JavaScript
├── projects/
│   ├── project-1.html   # Project detail pages
│   ├── project-2.html
│   ├── project-3.html
│   ├── project-4.html
│   ├── project-5.html
│   ├── project-6.html
│   ├── project-7.html
│   └── project-8.html
└── README.md
```

## Setup & Usage

1. **Clone/Copy** the files to your web server directory
2. **Customize content** in each HTML file:
   - Replace `[Your Name]` with your actual name
   - Replace `[Client Name]`, `[Project Title]` with real information
   - Add your email address in contact.html

3. **Add your videos** in project detail pages:
   - Replace the placeholder message with your Vimeo or YouTube embed:
   ```html
   <!-- Vimeo -->
   <iframe src="https://player.vimeo.com/video/VIDEO_ID?h=HASH&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
   
   <!-- YouTube -->
   <iframe src="https://www.youtube.com/embed/VIDEO_ID" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   ```

4. **Add project thumbnails**:
   - Update `data-src` attributes in `<img>` tags
   - Or replace with local images: `<img src="images/project1.jpg" alt="Project thumbnail">`

5. **Add client logos** in `index.html`:
   - Replace placeholder SVGs with actual logo images

6. **Update social links**:
   - X (Twitter): `href="https://x.com/yourhandle"`
   - YouTube: `href="https://youtube.com/@yourchannel"`

7. **Update Calendly/Cal.com link** in contact.html:
   - Replace `href="#"` with your booking page URL

## Customization Guide

### Changing Colors
Edit in `css/styles.css`:
```css
--color-accent-primary: #e63946;  /* Main accent (red) */
--color-accent-secondary: #f4a261; /* Secondary accent (orange) */
```

### Adding More Projects
1. Copy a project card from `projects.html`
2. Update category attribute: `data-category="commercial|film|content"`
3. Add project details
4. Create corresponding detail page in `projects/` folder

### Changing Font
Edit in `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

## Deployment

This is static HTML/CSS/JS - deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any traditional web hosting

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Notes

- Videos don't autoplay (user opt-in required)
- All images use lazy loading for performance
- Custom cursor only shows on devices with hover capability
- Form validation is client-side only - integrate with backend for production use

## License

© 2026 [Your Name]. All rights reserved.