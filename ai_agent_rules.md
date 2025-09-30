# AI AGENT RULES & CONSTRAINTS

**READ THESE RULES CAREFULLY BEFORE GENERATING ANY CODE OR CONTENT**

---

## 1. CODE QUALITY RULES

### ✅ DO:
- Write clean, readable code with proper comments
- Use modern ES6+ JavaScript syntax
- Follow React best practices and hooks patterns
- Use semantic HTML5 tags (header, main, section, footer)
- Add proper error handling for all audio operations
- Include loading states for better UX
- Make code mobile-first responsive
- Use Tailwind utility classes (only core classes, no custom)
- Add proper TypeScript types if using TypeScript
- Include accessibility attributes (aria-labels, alt text)
- Test all features before marking as complete

### ❌ DON'T:
- Use deprecated React lifecycle methods (use hooks)
- Use inline styles (use Tailwind classes)
- Create complex state management (keep it simple)
- Add unnecessary dependencies
- Use console.log in production code
- Write CSS from scratch (use Tailwind)
- Use jQuery or outdated libraries
- Create overly nested components
- Ignore mobile responsiveness
- Skip error boundaries

---

## 2. AUDIO IMPLEMENTATION RULES

**CRITICAL: Audio is the core feature. Handle carefully.**

### ✅ DO:
- Use HTML5 Audio API (`<audio>` element)
- Implement smooth fade in/out (AudioContext for volume control)
- Add proper error handling for audio loading failures
- Preload audio files with loading indicators
- Loop audio seamlessly without gaps
- Handle iOS Safari autoplay restrictions (require user interaction)
- Test volume controls thoroughly
- Add muted state for accessibility
- Provide fallback if audio fails to load
- Show clear error messages to users

### ❌ DON'T:
- Use external audio libraries unnecessarily
- Forget to handle mobile audio restrictions
- Allow audio to play without user interaction (browsers block it)
- Create jarring transitions between sounds
- Ignore browser compatibility issues
- Use autoplay without mute (browsers will block)

### EXAMPLE PATTERN TO FOLLOW:
```jsx
const audioRef = useRef(null);

const playAudio = async () => {
  try {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      await audioRef.current.play();
      setIsPlaying(true);
    }
  } catch (error) {
    console.error('Audio playback failed:', error);
    setError('Unable to play audio. Please check your connection.');
  }
};
```

---

## 3. TIME SYNCHRONIZATION RULES

### ✅ DO:
- Use JavaScript Date object with timezone offsets
- Update time every 60 seconds (not every second, saves performance)
- Display time in 12-hour format with AM/PM for US audience
- Show timezone abbreviation (JST, EST, GMT)
- Calculate local time correctly based on UTC offset
- Handle daylight saving time if possible
- Test with different timezones

### ❌ DON'T:
- Use external timezone libraries for MVP (keep it simple)
- Update time every second (unnecessary performance hit)
- Show only 24-hour format (confusing for some users)
- Forget timezone labels
- Hard-code timezone offsets without labels

### EXAMPLE PATTERN:
```jsx
const getLocalTime = (offsetHours) => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (3600000 * offsetHours));
  
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return `${displayHours}:${minutes} ${ampm}`;
};
```

---

## 4. VISUAL DESIGN RULES

### ✅ DO:
- Use dark theme as default (better for focus apps)
- Implement smooth color transitions (3-5 seconds)
- Use proper color contrast for accessibility (WCAG AA standard)
- Make UI minimal and distraction-free
- Use large, tappable buttons for mobile (min 44x44px)
- Add hover states for interactive elements
- Use consistent spacing (Tailwind's spacing scale)
- Implement glassmorphism/backdrop blur for modern look
- Add subtle animations for better feel
- Test on actual mobile devices

### ❌ DON'T:
- Use too many colors (stick to 2-3 main colors)
- Create busy, cluttered interface
- Use small, hard-to-tap buttons
- Forget hover states
- Use harsh color transitions
- Ignore color blindness considerations
- Make text too small (min 16px for body)
- Use pure white on pure black (harsh contrast)

### COLOR PALETTE TO USE:
- Background: `#0F172A` (slate-900)
- Card/Panel: `#1E293B` (slate-800) with backdrop-blur
- Primary Accent: `#3B82F6` (blue-600)
- Secondary Accent: `#F59E0B` (amber-500)
- Text Primary: `#F1F5F9` (slate-100)
- Text Secondary: `#94A3B8` (slate-400)
- Success: `#10B981` (emerald-500)
- Error: `#EF4444` (red-500)

---

## 5. MOBILE RESPONSIVENESS RULES

**CRITICAL: 70% of users will be on mobile. Test thoroughly.**

### ✅ DO:
- Use mobile-first approach (design for mobile, enhance for desktop)
- Test on real devices (iPhone, Android)
- Use Tailwind responsive prefixes (sm:, md:, lg:)
- Make all controls easily tappable (min 44x44px)
- Use viewport units for full-screen experience
- Test landscape and portrait orientations
- Handle iOS safe areas (notch/home indicator)
- Test on slower mobile connections
- Optimize images for mobile (WebP, lazy loading)

### ❌ DON'T:
- Only test on desktop browser
- Use fixed widths without responsive alternatives
- Create tiny buttons or controls
- Forget about touch gestures
- Ignore iOS-specific issues (especially audio)
- Use desktop-only features
- Load huge assets on mobile

### RESPONSIVE BREAKPOINTS:
- Mobile: default (< 640px)
- Tablet: sm: (≥ 640px)
- Desktop: md: (≥ 768px)
- Large: lg: (≥ 1024px)

---

## 6. SEO IMPLEMENTATION RULES

### ✅ DO:
- Add all meta tags in `<head>` section
- Use semantic HTML structure
- Include structured data (JSON-LD)
- Add proper alt text to ALL images
- Use descriptive link text
- Create clean, readable URLs
- Add canonical URLs
- Include Open Graph tags for social sharing
- Add Twitter Card tags
- Set up robots.txt and sitemap.xml
- Use heading hierarchy properly (H1 > H2 > H3)
- Add `loading="lazy"` to images

### ❌ DON'T:
- Stuff keywords unnaturally
- Use generic alt text like "image" or "photo"
- Forget meta descriptions
- Use non-semantic HTML (divs everywhere)
- Skip structured data
- Use generic page titles
- Forget social sharing tags
- Use multiple H1 tags on one page

### REQUIRED META TAGS (Must Include):
```html
<title>ElseWhere - Free Ambient Sound Generator | Focus & Study</title>
<meta name="description" content="[Max 160 characters, keyword-rich]">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="https://elsewhere.app/">
<meta property="og:type" content="website">
<meta property="og:url" content="https://elsewhere.app/">
<meta property="og:title" content="[Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[Image URL 1200x630]">
<meta name="twitter:card" content="summary_large_image">
```

---

## 7. PERFORMANCE RULES

### ✅ DO:
- Keep bundle size small (< 500KB total)
- Lazy load images and non-critical assets
- Preload critical resources (fonts, hero images)
- Use efficient audio formats (MP3 or AAC)
- Compress images (WebP format preferred)
- Minimize JavaScript bundle
- Use code splitting if needed
- Cache static assets
- Optimize for Core Web Vitals
- Test on slow 3G connection

### ❌ DON'T:
- Load all audio files at once
- Use uncompressed images
- Include unnecessary libraries
- Load fonts from slow CDNs
- Create unnecessary re-renders
- Use heavy animations
- Ignore loading states

### TARGET METRICS:
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

---

## 8. ERROR HANDLING RULES

### ✅ DO:
- Wrap audio operations in try-catch blocks
- Show user-friendly error messages
- Log errors for debugging (not in production UI)
- Provide fallback options when features fail
- Handle network failures gracefully
- Add error boundaries in React
- Test error scenarios thoroughly
- Display loading states clearly

### ❌ DON'T:
- Show technical error messages to users
- Ignore errors silently
- Let app crash without recovery
- Show generic "Something went wrong" without guidance
- Forget to test error scenarios

### ERROR MESSAGE EXAMPLES (User-Friendly):
- ❌ "Failed to fetch audio file"
- ✅ "Unable to load sounds. Please check your internet connection and try again."

- ❌ "Uncaught TypeError"
- ✅ "Oops! Something went wrong. Please refresh the page."

- ❌ "Audio context error"
- ✅ "Audio playback is not supported on this browser. Try Chrome or Firefox."

---

## 9. ACCESSIBILITY RULES (A11Y)

### ✅ DO:
- Add ARIA labels to all interactive elements
- Use semantic HTML (button, nav, main, etc.)
- Ensure keyboard navigation works (Tab, Enter, Space)
- Add alt text to images with meaningful descriptions
- Use sufficient color contrast (4.5:1 for text)
- Add focus indicators for keyboard users
- Support screen readers
- Make audio controls keyboard accessible
- Add skip-to-content link
- Test with keyboard only (no mouse)

### ❌ DON'T:
- Use divs for clickable elements (use button)
- Forget alt text
- Remove focus outlines without replacement
- Use color alone to convey information
- Create keyboard traps
- Ignore screen reader testing
- Use inaccessible custom controls

### ARIA EXAMPLES:
```jsx
<button aria-label="Play ambient sound">▶</button>
<input 
  type="range" 
  aria-label="Volume control" 
  aria-valuemin="0" 
  aria-valuemax="100" 
  aria-valuenow={volume}
/>
<select aria-label="Choose location">
  <option>Tokyo</option>
</select>
```

---

## 10. LEGAL PAGES RULES

### ✅ DO:
- Use free template generators (TermsFeed, Termly)
- Customize with your actual details (name, URL, email)
- Add "Last Updated" date
- Make easily readable (plain language)
- Link prominently in footer
- Add noindex meta tag to legal pages
- Include contact information
- Keep language simple and clear
- Update when you add features (payments, accounts)

### ❌ DON'T:
- Copy-paste without customization
- Use complex legal jargon unnecessarily
- Hide legal pages
- Forget to update dates
- Make legal pages hard to find
- Skip disclaimer if making health claims
- Use someone else's company name

### REQUIRED LEGAL PAGES:
1. Privacy Policy (MUST HAVE)
2. Terms of Service (MUST HAVE)
3. Disclaimer (MUST HAVE if making any claims)
4. Cookie Policy (MUST HAVE if using cookies)
5. Contact Page (MUST HAVE)

---

## 11. DEPLOYMENT & HOSTING RULES

### ✅ DO:
- Use Vercel or Netlify (free, easy)
- Connect to GitHub for auto-deployment
- Enable HTTPS (automatic on Vercel/Netlify)
- Set up custom domain properly
- Test production build before launch
- Set up environment variables correctly
- Enable automatic deployments
- Test after each deployment
- Set up preview deployments for testing

### ❌ DON'T:
- Deploy with known bugs
- Expose API keys in code
- Use shared hosting (too slow)
- Skip production testing
- Forget to update DNS records
- Deploy without backup plan
- Ignore build errors

### VERCEL DEPLOYMENT STEPS:
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Import repository
4. Configure build settings (usually auto-detected)
5. Deploy
6. Add custom domain in settings
7. Update DNS records
8. Wait for SSL (automatic)

---

## 12. TESTING RULES

### BEFORE LAUNCHING, TEST ALL OF THESE:

#### ✅ FUNCTIONAL TESTING:
- All 5 locations load audio correctly
- Play/pause button works
- Volume control adjusts sound properly
- Time displays correctly for each location
- Location switching works smoothly
- Audio loops without gaps
- Mobile buttons are tappable

#### ✅ CROSS-BROWSER TESTING:
- Chrome (desktop + mobile)
- Firefox (desktop)
- Safari (desktop + iOS)
- Edge (desktop)
- Samsung Internet (Android)

#### ✅ DEVICE TESTING:
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667 iPhone, 360x640 Android)
- Test in portrait AND landscape

#### ✅ PERFORMANCE TESTING:
- Page loads in < 3 seconds
- Audio starts within 1 second of click
- No layout shifts during load
- Smooth animations (60fps)
- Works on slow 3G

#### ✅ ACCESSIBILITY TESTING:
- Navigate with keyboard only
- Test with screen reader (NVDA/JAWS/VoiceOver)
- Check color contrast
- Verify ARIA labels
- Test focus indicators

#### ✅ SEO TESTING:
- Run Lighthouse audit (score > 90)
- Check Google Rich Results Test
- Verify structured data
- Test social sharing cards
- Check mobile-friendliness

---

## 13. CONTENT WRITING RULES

### ✅ DO:
- Write in conversational, friendly tone
- Use short sentences (< 20 words)
- Break text into short paragraphs (2-3 lines)
- Include keywords naturally (not forced)
- Use bullet points for lists
- Add headings for scannability
- Write for humans first, SEO second
- Use active voice
- Be specific and concrete
- Proofread for typos

### ❌ DON'T:
- Keyword stuff
- Use jargon or technical terms without explanation
- Write long, dense paragraphs
- Use passive voice excessively
- Make unverifiable claims
- Use clickbait headlines
- Forget call-to-action buttons
- Write walls of text

### TONE EXAMPLES:
- ❌ "ElseWhere utilizes advanced audio synthesis technology"
- ✅ "ElseWhere brings you authentic sounds from real cities"

- ❌ "Optimize your cognitive performance metrics"
- ✅ "Help yourself focus better and work smarter"

---

## 14. SECURITY RULES

### ✅ DO:
- Use HTTPS everywhere (automatic with Vercel)
- Validate all user inputs (if adding forms)
- Sanitize any user-generated content
- Use environment variables for sensitive data
- Keep dependencies updated
- Follow OWASP security guidelines
- Add CORS headers properly if using API

### ❌ DON'T:
- Expose API keys in frontend code
- Store sensitive data in localStorage
- Trust user input without validation
- Use outdated dependencies with known vulnerabilities
- Forget to sanitize HTML content
- Allow XSS attacks
- Skip security headers

---

## 15. DOCUMENTATION RULES

### ✅ DO:
- Add clear comments in code
- Create comprehensive README.md
- Document environment variables
- List all dependencies and versions
- Include setup instructions
- Add troubleshooting section
- Document API endpoints (if any)
- Keep documentation updated

### ❌ DON'T:
- Leave commented-out code
- Skip README
- Use unclear variable names
- Forget to document tricky parts
- Leave TODO comments in production

### README MUST INCLUDE:
```markdown
# ElseWhere - Ambient Life Simulator

## Description
[Brief description]

## Features
- [List main features]

## Tech Stack
- Next.js / React
- Tailwind CSS
- Web Audio API
- Deployed on Vercel

## Local Development
1. Clone repo
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Open http://localhost:3000

## Environment Variables
- NEXT_PUBLIC_GA_ID: Google Analytics ID

## Deployment
[Deployment instructions]

## License
MIT

## Contact
hello@elsewhere.app
```

---

## 16. FINAL QUALITY CHECKLIST

### BEFORE MARKING AS COMPLETE, VERIFY:

#### ✅ CODE QUALITY:
- No console.log statements
- No commented-out code
- Proper error handling everywhere
- Clean, readable code
- No hardcoded values (use constants)
- Proper TypeScript types (if using TS)

#### ✅ FUNCTIONALITY:
- All features work as expected
- No broken links
- Forms submit correctly
- Audio plays without errors
- Mobile gestures work
- Loading states display properly

#### ✅ DESIGN:
- Consistent styling throughout
- Responsive on all screen sizes
- Smooth animations
- Proper spacing and alignment
- Good color contrast
- Professional appearance

#### ✅ PERFORMANCE:
- Fast load times
- Smooth interactions
- No memory leaks
- Optimized assets
- Efficient code

#### ✅ SEO:
- All meta tags present
- Proper heading structure
- Alt text on images
- Clean URLs
- Structured data
- Sitemap generated

#### ✅ ACCESSIBILITY:
- Keyboard navigation works
- ARIA labels present
- Color contrast sufficient
- Focus indicators visible
- Screen reader friendly

#### ✅ SECURITY:
- HTTPS enabled
- No exposed secrets
- Input validation
- Secure dependencies

---

## 17. OUTPUT FORMAT RULES

### WHEN GENERATING CODE:

#### ✅ DO:
- Provide complete, working files (no "... rest of code" shortcuts)
- Include all imports at the top
- Add inline comments for complex logic
- Use descriptive variable names
- Format code properly (consistent indentation)
- Group related code together
- Export components properly
- Include PropTypes or TypeScript types

#### ❌ DON'T:
- Truncate code with "// ... more code here"
- Skip important parts
- Use placeholder comments like "// Add your code here"
- Mix different coding styles
- Forget imports
- Leave incomplete functions

### WHEN GENERATING CONTENT:

#### ✅ DO:
- Write complete paragraphs
- Include all sections requested
- Format with proper markdown
- Add links where mentioned
- Provide examples
- Be specific and actionable

#### ❌ DON'T:
- Leave [TBD] or [TODO] placeholders
- Skip sections
- Use vague language
- Forget to format properly

---

## 18. COMMON PITFALLS TO AVOID

### 🚫 AUDIO ISSUES:
- Forgetting iOS Safari requires user interaction before audio
- Not handling audio loading errors
- Creating audio gaps when looping
- Forgetting to stop previous audio when switching locations
- Not setting proper audio volume on init

### 🚫 REACT ISSUES:
- Unnecessary re-renders
- Not cleaning up useEffect
- Direct DOM manipulation instead of state
- Missing dependency arrays in useEffect
- Mutating state directly

### 🚫 CSS ISSUES:
- Using absolute positioning excessively
- Forgetting mobile breakpoints
- Not testing on actual devices
- Using fixed heights (use min-height)
- Ignoring z-index conflicts

### 🚫 SEO ISSUES:
- Duplicate meta tags
- Missing or empty meta descriptions
- No structured data
- Broken internal links
- Slow page speed

### 🚫 UX ISSUES:
- No loading indicators
- Unclear error messages
- Hidden navigation
- Too many clicks to accomplish tasks
- Confusing button labels

---

## 19. PRIORITY ORDER (If Time Limited)

### BUILD IN THIS ORDER:

#### PRIORITY 1 (Must Have):
1. Basic audio player (play/pause)
2. 3 locations minimum
3. Volume control
4. Mobile responsive layout
5. Time display
6. One legal page (Privacy Policy)

#### PRIORITY 2 (Should Have):
1. All 5 locations
2. Smooth transitions
3. Visual atmosphere overlay
4. Complete footer
5. All legal pages
6. FAQ section

#### PRIORITY 3 (Nice to Have):
1. Fancy animations
2. Custom graphics
3. Blog section
4. Email signup
5. Analytics dashboard
6. Social media integration

---

## 20. SUCCESS CRITERIA

### THE MVP IS COMPLETE WHEN:

✅ A user can visit the site  
✅ Select a location from 5 options  
✅ Click play and hear ambient sound  
✅ Adjust volume  
✅ See current local time of that city  
✅ Experience visual atmosphere that matches time  
✅ Use on mobile phone comfortably  
✅ Access privacy policy and terms  
✅ Contact via email  
✅ Page loads in < 3 seconds  
✅ No critical bugs  
✅ Looks professional and polished  

**THEN IT'S READY TO LAUNCH!** 🚀

---

## IMPORTANT CONSTRAINTS

### SCOPE LIMITATIONS:
- ⚠️ DO NOT add user authentication for MVP
- ⚠️ DO NOT implement payment system yet
- ⚠️ DO NOT create complex backend
- ⚠️ DO NOT add premium features yet
- ⚠️ DO NOT integrate real-time weather API yet
- ⚠️ DO NOT build native mobile apps yet
- ⚠️ **FOCUS ON:** Core audio player experience

### TIME CONSTRAINTS:
- Aim to complete MVP in 2-3 weeks maximum
- Don't over-engineer
- Keep it simple and functional
- Launch fast, improve later

### TECHNOLOGY CONSTRAINTS:
- Only use libraries mentioned in the tech stack
- No unnecessary dependencies
- Stick to React/Next.js + Tailwind
- No complex state management libraries
- No backend frameworks for MVP

---

## FINAL INSTRUCTION

**READ ALL ABOVE RULES BEFORE GENERATING ANY CODE OR CONTENT.**

If you're unsure about any implementation detail:
1. Choose the simpler approach
2. Prioritize user experience
3. Focus on mobile first
4. Ensure accessibility
5. Keep performance high

**Remember:** Done is better than perfect. Ship the MVP, then iterate!

🎯 **GOAL:** Create a working, polished, launchable product in 2-3 weeks.

**NOW BEGIN!** 🚀
