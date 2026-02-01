# Framer 
A simple application to simplify creating profile images for mobilizing efforts.

In its most basic operation, it allows the end user to select a local profile image and perform an in-browser overlay of
the overlay "frame". The profile image can then be moved and scaled to better fit the frame opening.

Built with vanilla JavaScript, HTML5 Canvas, and CSS3, Framer runs entirely client-side with no server dependencies, no
tracking, analytics, or data collection.

Now redesigned for touch devices with a responsive desktop experience. Also updated to support multiple overlays,
reading available overlays from a simple json file. Template sources can be hosted locally with the rest of the app, or
they can be hosted elsewhere.

## Quick Start

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Upload an image
4. Select an overlay template
5. Adjust position and scale. Now with pinch-to-zoom on mobile!
6. Save your profile picture!

## File Structure

```
framer/
 ├── index.html                   # Main application file
 └── assets/
     ├── css/
     │   └── base.css             # Stylesheet with theme support
     ├── js/
     │   └── index.js             # Application logic
     └── overlays/
         ├── overlays.json        # Template configuration
         └── united_we_bargain.png # Example overlay template
```

## Adding Overlay Templates

Overlay templates are defined in `assets/overlays/overlays.json`. To add new templates:

1. **Host your overlay image** - The PNG file should have transparency where you want the photo to show through
2. **Edit overlays.json** - Add a new entry with the template name and URL:

```json
{
  "overlays": [
    {
      "name": "Your Template Name",
      "source": "https://example.com/path/to/overlay.png"
    },
    {
      "name": "Another Template",
      "source": "assets/overlays/another-overlay.png"
    }
  ]
}
```

### Overlay Image Guidelines

- **Format**: PNG with transparency
- **Size**: 1024x1024 pixels (or any square aspect ratio)
- **Design**: Transparent areas will show the user's photo underneath
- **CORS**: If hosting externally, ensure the server allows cross-origin requests

### Local Overlay Storage

You can also store overlays locally:

```json
{
  "overlays": [
    {
      "name": "United We Bargain",
      "source": "assets/overlays/united_we_bargain.png"
    }
  ]
}
```

Just place the PNG file in the `assets/overlays/` directory.

## Deployment

Framer is now a static web application that can be deployed to any hosting platform. No longer requires a build process
or docker host.

### GitHub Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/framer.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `(root)`
   - Save

3. **Access**: `https://username.github.io/framer/` (index.html loads automatically)

4. **Custom Domain** (optional):
   - Add `CNAME` file with your domain
   - Configure DNS settings at your registrar

### Cloudflare Pages

1. **Connect Repository**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Connect your GitHub/GitLab account
   - Select the repository

2. **Build Settings**:
   - Build command: (leave empty)
   - Build output directory: `/`
   - Deploy

### Traditional Web Hosting (cPanel, FTP, etc.)

1. Upload files via FTP/SFTP or file manager
2. Place files in web root (typically `public_html` or `www`)
3. Access `https://yourdomain.com/` (index.html loads automatically)

### Amazon S3 + CloudFront

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://framer-app
   aws s3 sync . s3://framer-app --acl public-read
   ```

2. **Enable Static Website Hosting**:
   - Go to bucket Properties → Static website hosting
   - Index document: `index.html`

3. **Optional CloudFront CDN**:
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Enable HTTPS

## Customization

### Changing Colors

Edit `assets/css/base.css` and modify the CSS variables:

```css
:root {
    --primary: #FF6B35;      /* Main accent color */
    --secondary: #004E89;    /* Secondary color */
    --accent: #F77F00;       /* Hover/active states */
    /* ... */
}
```

### Modifying Canvas Size

In `assets/js/index.js`, change the `CANVAS_SIZE` constant:

```javascript
const CANVAS_SIZE = 1024;  // Change to desired pixel size
```

### Adding More Fonts

Add Google Fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update CSS:

```css
body {
    font-family: 'YourFont', sans-serif;
}
```

## Privacy & Security

- **No data collection**: Images never leave your browser
- **No tracking**: No analytics or third-party scripts
- **No cookies**: Only localStorage for theme preference
- **No external processing**: All image manipulation happens client-side

## License

MIT License - feel free to use this project for any purpose.
