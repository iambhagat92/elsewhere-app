# 🌍 ElseWhere - Ambient Life Simulator

> Transport yourself to cities around the world with authentic ambient sounds. Perfect for focus, study, work, and relaxation.

![ElseWhere](https://img.shields.io/badge/status-MVP-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 🚀 Features

- **5 Global Locations**: Tokyo, Paris, New York, Rio de Janeiro, Sydney
- **Real-Time Display**: Shows current local time for each city
- **Ambient Audio Player**: Seamless looping with fade in/out transitions
- **Volume Control**: Adjustable volume with preset options
- **Atmospheric Visuals**: Time-based color overlays matching each location's time of day
- **Mobile-First Design**: Fully responsive across all devices
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **SEO Optimized**: Complete meta tags, Open Graph, structured data
- **Privacy-Focused**: No tracking, no accounts, no data collection

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with SSR
- **UI Library**: [React 18](https://react.dev/) - Component-based UI
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) - Utility-first CSS
- **Audio**: HTML5 Audio API - Native browser audio
- **Deployment**: [Vercel](https://vercel.com/) - Serverless deployment platform

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/elsewhere-app.git
cd elsewhere-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Add Audio Files

Place your ambient audio files in the `public/audio` directory:
- `tokyo-ambient.mp3`
- `paris-ambient.mp3`
- `newyork-ambient.mp3`
- `rio-ambient.mp3`
- `sydney-ambient.mp3`

**Note**: Make sure you have proper licenses for all audio files!

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

### 6. Start Production Server

```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
elsewhere-app/
├── components/          # React components
│   ├── AudioControls.js
│   ├── LocationSelector.js
│   ├── AtmosphereOverlay.js
│   ├── Footer.js
│   └── ErrorBoundary.js
├── data/               # Data and utilities
│   └── locations.js
├── hooks/              # Custom React hooks
│   └── useAudioPlayer.js
├── pages/              # Next.js pages
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── privacy-policy.js
│   ├── terms-of-service.js
│   └── disclaimer.js
├── public/             # Static assets
│   ├── audio/         # Audio files
│   ├── favicon.ico
│   └── robots.txt
├── styles/             # Global styles
│   └── globals.css
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Dependencies
└── README.md          # This file
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Add Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - SSL certificate is automatic

### Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  background: '#0F172A',
  panel: '#1E293B',
  primary: '#3B82F6',
  // Add more colors...
}
```

### Add More Locations

Edit `data/locations.js`:

```javascript
{
  id: 'london',
  name: 'London',
  country: 'UK',
  timezone: 'GMT',
  utcOffset: 0,
  audioUrl: '/audio/london-ambient.mp3',
  emoji: '🏰',
}
```

### Modify Audio Behavior

Edit `hooks/useAudioPlayer.js` to change fade duration, volume defaults, etc.

## 🧪 Testing

### Manual Testing Checklist

- [ ] All 5 locations load and play audio
- [ ] Volume controls work (slider and presets)
- [ ] Time displays correctly for each location
- [ ] Visual atmosphere changes with time
- [ ] Mobile responsive (test on real device)
- [ ] Keyboard navigation works
- [ ] Links in footer work
- [ ] Legal pages display correctly

### Browser Testing

Test on:
- Chrome (desktop + mobile)
- Firefox
- Safari (desktop + iOS)
- Edge
- Samsung Internet (Android)

## 📊 Performance

The app is optimized for:
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

Run Lighthouse audit to verify:
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## 🔒 Security

Security headers are configured in `vercel.json`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For questions or support:
- Email: hello@elsewhere.app
- GitHub Issues: [Create an issue](https://github.com/yourusername/elsewhere-app/issues)

## 🙏 Acknowledgments

- Ambient sounds sourced from [list your sources]
- Inspired by productivity and focus apps
- Built with ❤️ for focus and productivity

## 🗺️ Roadmap

Future enhancements:
- [ ] More locations (10+ cities)
- [ ] Custom timer/pomodoro feature
- [ ] Mix multiple locations
- [ ] Save favorite combinations
- [ ] Weather-based soundscapes
- [ ] Dark/light mode toggle
- [ ] Spotify integration
- [ ] Mobile app (React Native)

## 📈 Analytics (Optional)

To add Google Analytics:

1. Get GA4 tracking ID
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Add tracking code to `pages/_app.js`

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## ⚠️ Important Notes

- **Audio Files**: Not included in repository due to size. You must add your own.
- **Licensing**: Ensure you have proper licenses for all audio content.
- **API Keys**: Never commit API keys or secrets to the repository.
- **Testing**: Always test on mobile devices before deployment.

---

Made with 🎧 by [Your Name]

**Star ⭐ this repo if you find it useful!**