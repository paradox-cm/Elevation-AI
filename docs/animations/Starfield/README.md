# Starfield Hero Animation Package

A complete package for recreating the animated hero section from the Señor Papas `/play` page. This includes a 3D starfield animation with rainbow text effects.

## 🚀 Features

- **3D Starfield Animation**: Smooth, perspective-based starfield that creates depth
- **Rainbow Text Effect**: Animated rainbow colors with bouncing motion
- **Responsive Design**: Works on all screen sizes
- **Multiple Integration Options**: React component, vanilla HTML/CSS/JS, and standalone modules
- **Customizable**: Easy to modify colors, speed, star count, and other properties
- **Performance Optimized**: Uses requestAnimationFrame and efficient canvas rendering

## 📦 Package Contents

```
hero-animation-package/
├── StarfieldHero.tsx          # React component
├── useStarfield.ts           # React hook for custom integration
├── starfield-hero.html       # Complete HTML example
├── starfield-animations.css  # All CSS animations and styles
├── starfield-animation.js    # Vanilla JavaScript module
└── README.md                 # This documentation
```

## 🎯 Quick Start

### Option 1: React Component (Recommended)

```tsx
import StarfieldHero from './StarfieldHero'

function App() {
  return (
    <StarfieldHero 
      title="Your Amazing Title"
      subtitle="Your awesome subtitle text"
    />
  )
}
```

### Option 2: React Hook (Custom Integration)

```tsx
import { useStarfield } from './useStarfield'

function CustomHero() {
  const { canvasRef, isRunning, start, stop } = useStarfield({
    starCount: 500,
    speed: 0.8,
    starColor: '#00ff00'
  })

  return (
    <div className="relative min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="rainbow-text text-4xl">Your Title</h1>
      </div>
    </div>
  )
}
```

### Option 3: Vanilla HTML/CSS/JS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="starfield-animations.css">
</head>
<body>
  <div class="starfield-hero-container">
    <canvas id="starfield-canvas" data-starfield></canvas>
    <div class="starfield-hero-content">
      <h1 class="rainbow-text starfield-hero-title">Your Title</h1>
      <p class="starfield-hero-subtitle">Your subtitle</p>
    </div>
  </div>
  <script src="starfield-animation.js"></script>
</body>
</html>
```

## 🎨 CSS Classes

### Rainbow Text Animation
```css
.rainbow-text          /* Full rainbow + bounce effect */
.rainbow-only-text     /* Rainbow colors only */
.bounce-text           /* Bounce animation only */
.rainbow-text-slow     /* Slower animation (10s rainbow, 4s bounce) */
.rainbow-text-fast     /* Faster animation (2.5s rainbow, 1s bounce) */
```

### Layout Classes
```css
.starfield-hero-container    /* Main container */
.starfield-canvas           /* Canvas element */
.starfield-hero-content     /* Content wrapper */
.starfield-hero-title       /* Title styling */
.starfield-hero-subtitle    /* Subtitle styling */
```

### Utility Classes
```css
.shadow-glow              /* Glowing shadow effect */
.starfield-text-center    /* Center alignment */
.starfield-text-left      /* Left alignment */
.starfield-text-right     /* Right alignment */
```

## ⚙️ Configuration Options

### StarfieldAnimation Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `starCount` | number | 300 | Number of stars in the animation |
| `speed` | number | 0.5 | Speed of star movement (higher = faster) |
| `zMax` | number | 1000 | Maximum Z-depth for stars |
| `perspectiveFactor` | number | 300 | 3D perspective strength |
| `backgroundColor` | string | 'rgba(0, 0, 0, 0.2)' | Background fade color |
| `starColor` | string | '#FFFFFF' | Color of the stars |

### React Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Main title text |
| `subtitle` | string | - | Subtitle text |
| `className` | string | '' | Additional CSS classes for container |
| `titleClassName` | string | '' | Additional CSS classes for title |
| `subtitleClassName` | string | '' | Additional CSS classes for subtitle |

## 🎨 Customization Examples

### Custom Colors
```tsx
<StarfieldHero 
  title="Custom Title"
  subtitle="Custom Subtitle"
  titleClassName="rainbow-text-red"  // Red rainbow
  subtitleClassName="text-blue-400"  // Blue subtitle
/>
```

### Custom Starfield Settings
```tsx
const { canvasRef } = useStarfield({
  starCount: 500,        // More stars
  speed: 1.0,           // Faster movement
  starColor: '#00ff00', // Green stars
  backgroundColor: 'rgba(0, 0, 50, 0.3)' // Blue tint
})
```

### Custom CSS Animations
```css
/* Custom rainbow colors */
@keyframes custom-rainbow {
  0% { color: #ff6b6b; }
  25% { color: #4ecdc4; }
  50% { color: #45b7d1; }
  75% { color: #96ceb4; }
  100% { color: #feca57; }
}

.custom-rainbow-text {
  animation: custom-rainbow 3s linear infinite, bounce 1.5s ease-in-out infinite;
}
```

## 📱 Responsive Design

The animation automatically adapts to different screen sizes:

- **Desktop**: Full 3D effect with 300+ stars
- **Tablet**: Optimized star count and sizing
- **Mobile**: Reduced complexity for better performance

## 🚀 Performance Tips

1. **Reduce star count** on mobile devices for better performance
2. **Use `willReadFrequently: true`** for canvas context (already included)
3. **Avoid animating other elements** simultaneously for smooth performance
4. **Consider using `transform3d`** for hardware acceleration

## 🔧 Browser Support

- **Modern browsers**: Full support with hardware acceleration
- **IE11+**: Basic support (may need polyfills for requestAnimationFrame)
- **Mobile browsers**: Optimized performance

## 🐛 Troubleshooting

### Canvas not showing
- Ensure the canvas element has defined dimensions
- Check that the container has `position: relative`
- Verify the canvas is not hidden by other elements

### Animation not starting
- Check browser console for errors
- Ensure the component is mounted before starting animation
- Verify canvas context is available

### Performance issues
- Reduce `starCount` for better performance
- Lower `speed` value for smoother animation
- Check if other animations are conflicting

## 📄 License

This package is provided as-is for educational and commercial use. Feel free to modify and distribute.

## 🤝 Contributing

To improve this package:
1. Fork the repository
2. Make your changes
3. Test across different browsers
4. Submit a pull request

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the browser console for errors
3. Test with the provided HTML example first

---

**Enjoy your animated starfield hero section! 🌟**
