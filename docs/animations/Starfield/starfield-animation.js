/**
 * Starfield Animation Module
 * A reusable JavaScript module for creating animated starfield backgrounds
 */

class StarfieldAnimation {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Configuration options
    this.options = {
      starCount: 300,
      speed: 0.5,
      zMax: 1000,
      perspectiveFactor: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      starColor: '#FFFFFF',
      ...options
    };
    
    this.stars = [];
    this.animationFrameId = 0;
    this.animationRunning = false;
    this.mounted = false;
    
    this.init();
  }

  init() {
    this.setupCanvas();
    this.initializeStars();
    this.setupResizeHandler();
    this.mounted = true;
  }

  setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = false;
  }

  initializeStars() {
    this.stars = [];
    const rect = this.canvas.getBoundingClientRect();
    
    for (let i = 0; i < this.options.starCount; i++) {
      this.stars.push({
        x: Math.random() * rect.width - rect.width / 2,
        y: Math.random() * rect.height - rect.height / 2,
        z: Math.random() * this.options.zMax
      });
    }
  }

  animate() {
    if (!this.animationRunning || !this.mounted) return;

    const rect = this.canvas.getBoundingClientRect();
    
    // Clear canvas with fade effect
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.z -= this.options.speed;

      if (star.z <= 0) {
        star.z = this.options.zMax;
        star.x = Math.random() * rect.width - rect.width / 2;
        star.y = Math.random() * rect.height - rect.height / 2;
      }

      const projectedX = (star.x / star.z) * this.options.perspectiveFactor + centerX;
      const projectedY = (star.y / star.z) * this.options.perspectiveFactor + centerY;
      const opacity = 1 - star.z / this.options.zMax;

      this.ctx.fillStyle = this.options.starColor;
      this.ctx.globalAlpha = opacity;
      this.ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1);
      this.ctx.globalAlpha = 1;
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (!this.animationRunning) {
      this.animationRunning = true;
      this.animate();
    }
  }

  stop() {
    this.animationRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  pause() {
    this.animationRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  resume() {
    if (!this.animationRunning) {
      this.animationRunning = true;
      this.animate();
    }
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.initializeStars();
  }

  setupResizeHandler() {
    this.handleResize = () => {
      this.setupCanvas();
      this.initializeStars();
    };
    
    window.addEventListener('resize', this.handleResize);
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.mounted = false;
  }

  // Get current animation state
  isRunning() {
    return this.animationRunning;
  }

  // Get current configuration
  getOptions() {
    return { ...this.options };
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StarfieldAnimation;
} else if (typeof define === 'function' && define.amd) {
  define(() => StarfieldAnimation);
} else {
  window.StarfieldAnimation = StarfieldAnimation;
}

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
  const canvasElements = document.querySelectorAll('[data-starfield]');
  
  canvasElements.forEach(canvas => {
    const options = {
      starCount: parseInt(canvas.dataset.starCount) || 300,
      speed: parseFloat(canvas.dataset.speed) || 0.5,
      zMax: parseInt(canvas.dataset.zMax) || 1000,
      perspectiveFactor: parseInt(canvas.dataset.perspectiveFactor) || 300,
      backgroundColor: canvas.dataset.backgroundColor || 'rgba(0, 0, 0, 0.2)',
      starColor: canvas.dataset.starColor || '#FFFFFF'
    };
    
    const starfield = new StarfieldAnimation(canvas, options);
    starfield.start();
    
    // Store reference for potential external control
    canvas.starfieldInstance = starfield;
  });
});
