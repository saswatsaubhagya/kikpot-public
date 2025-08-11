# 🚀 Kikpot - Modern IT Solutions Website

A cutting-edge, modern website built with Next.js 15, featuring stunning animations, glassmorphism effects, and a responsive design that showcases innovative IT solutions.

## ✨ Modern Features

### 🎨 **Design & UI**
- **Glassmorphism Effects** - Beautiful backdrop blur and transparency
- **Modern Color Palette** - Sophisticated gradients and color schemes
- **Enhanced Typography** - Inter font with proper hierarchy and spacing
- **Responsive Design** - Mobile-first approach with modern breakpoints
- **Dark/Light Mode** - Seamless theme switching with system preference detection

### 🎭 **Animations & Interactions**
- **Framer Motion** - Smooth, performant animations throughout
- **Micro-interactions** - Hover effects, loading states, and transitions
- **Scroll Animations** - Elements animate as they come into view
- **Floating Particles** - Dynamic background elements for visual appeal
- **Hover Effects** - Interactive cards and buttons with smooth transitions

### 🛠 **Technical Excellence**
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **Performance Optimized** - Image optimization, lazy loading, and code splitting
- **SEO Ready** - Meta tags, Open Graph, and structured data

### 📱 **User Experience**
- **Smooth Scrolling** - Enhanced navigation with scroll-to-top
- **Loading States** - Beautiful loading animations and error handling
- **Accessibility** - ARIA labels, focus management, and keyboard navigation
- **Mobile Optimized** - Touch-friendly interactions and responsive layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kikpot-public.git
   cd kikpot-public
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
kikpot-public/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/         # Page-specific components
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── services/          # Services page
│   │   ├── dev-tools/         # Developer tools page
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading component
│   │   ├── error.tsx          # Error boundary
│   │   └── not-found.tsx      # 404 page
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx         # Navigation component
│   │   ├── Navigation.tsx     # Navigation logic
│   │   └── ScrollToTop.tsx    # Scroll to top button
│   └── ...
├── public/                     # Static assets
│   ├── images/                # SVG illustrations
│   └── logo.png               # Company logo
├── tailwind.config.js         # Tailwind configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Blue (#3B82F6)
- **Accent**: Pink (#EC4899)
- **Neutral**: Gray scale with proper contrast ratios
- **Semantic**: Success (green), Warning (yellow), Error (red)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 100-900 (variable font)
- **Scale**: Modern 8pt grid system
- **Line Heights**: Optimized for readability

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- **Responsive**: Mobile-first approach with breakpoints

### Shadows & Effects
- **Box Shadows**: Multiple levels with color variations
- **Backdrop Blur**: Modern glassmorphism effects
- **Gradients**: Linear, radial, and conic gradients
- **Animations**: Smooth transitions with custom easing

## 🔧 Customization

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Update navigation in `src/components/Navbar.tsx`

### Modifying Styles
- **Global Styles**: Edit `src/app/globals.css`
- **Component Styles**: Use Tailwind classes or create custom CSS
- **Theme**: Modify `tailwind.config.js` for design tokens

### Adding Animations
- **Framer Motion**: Use the `AnimatedSection` component
- **Custom Animations**: Add keyframes in `globals.css`
- **Hover Effects**: Use Tailwind's hover utilities

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## 🌙 Dark Mode

The website automatically detects system preferences and provides:
- **Automatic Detection**: Follows system theme
- **Manual Toggle**: User can override system preference
- **Persistent Storage**: Remembers user choice
- **Smooth Transitions**: Beautiful theme switching animations

## 🚀 Performance Features

- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components load as needed
- **Bundle Analysis**: Built-in performance monitoring
- **SEO Optimization**: Meta tags, structured data, and sitemaps

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking and IntelliSense
- **Prettier**: Code formatting (if configured)
- **Husky**: Git hooks for quality assurance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Email**: info@kikpot.com
- **Website**: [https://kikpot.com](https://kikpot.com)
- **Documentation**: [https://docs.kikpot.com](https://docs.kikpot.com)

---

Built with ❤️ by the Kikpot Team
