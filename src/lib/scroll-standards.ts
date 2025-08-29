/**
 * Global Scroll Standards for Sticky Sections
 * 
 * This file establishes consistent scroll behavior across all sticky sections
 * to ensure accessibility and predictable user experience.
 */

// Standard slide dimensions and buffer zones
export const SCROLL_STANDARDS = {
  // Each slide should be triggered by exactly one spacebar press
  SLIDE_HEIGHT: 450, // 450px per slide (increased by 50px for more scroll)
  BUFFER_SIZE: 80,   // 80px enter/exit buffer for smooth transitions
  MAIN_CONTENT: 290, // 290px main content area per slide (increased proportionally)
  
  // Mouse wheel and trackpad standards
  MOUSE_WHEEL_CLICKS_PER_SLIDE: 3, // ~120px per click = 360px total
  TRACKPAD_SWIPES_PER_SLIDE: 2,    // ~150px per swipe = 300px total
  
  // Scroll trigger thresholds
  ENTER_BUFFER_RATIO: 0.2,  // 20% of slide height for enter buffer
  MAIN_CONTENT_RATIO: 0.6,  // 60% of slide height for main content
  EXIT_BUFFER_RATIO: 0.2,   // 20% of slide height for exit buffer
} as const

/**
 * Scroll Event Manager for One-Action-One-Slide Behavior
 * Simplified approach focusing on reliability and smooth transitions
 */
export class ScrollEventManager {
  private currentSlide: number = 0
  private totalSlides: number = 0
  private onSlideChange: (slideIndex: number) => void
  private isSectionSticky: boolean = false
  private isInCooldown: boolean = false
  private cooldownTimeout: NodeJS.Timeout | null = null
  private lastEventTime: number = 0
  private eventCount: number = 0
  private sectionStartY: number = 0
  private sectionEndY: number = 0
  private isInitialized: boolean = false
  private lastScrollY: number = 0

  constructor(totalSlides: number, onSlideChange: (slideIndex: number) => void) {
    this.totalSlides = totalSlides
    this.onSlideChange = onSlideChange
  }

  /**
   * Initialize section boundaries
   */
  initializeSection(rect: DOMRect): void {
    if (!this.isInitialized) {
      this.sectionStartY = window.scrollY + rect.top - 20 // Account for top-20
      this.sectionEndY = this.sectionStartY + rect.height
      this.isInitialized = true
      console.log(`Section initialized: ${this.sectionStartY} to ${this.sectionEndY}`)
    }
  }

  /**
   * Handle wheel event - primary input method
   */
  handleWheel(deltaY: number, rect: DOMRect): boolean {
    const now = Date.now()
    
    // Initialize section boundaries on first call
    this.initializeSection(rect)
    
    // Check cooldown
    if (this.isInCooldown) {
      return false
    }

    // Determine if section is sticky
    const wasSticky = this.isSectionSticky
    this.isSectionSticky = rect.top <= 20

    // Section just became sticky
    if (!wasSticky && this.isSectionSticky) {
      console.log('Section became sticky - starting slide progression')
      this.currentSlide = 0
      this.eventCount = 0
      this.onSlideChange(0)
      this.lastEventTime = now
      return true
    }

    // Section just became unsticky
    if (wasSticky && !this.isSectionSticky) {
      console.log('Section became unsticky - ending slide progression')
      return false
    }

    // Only process when section is sticky
    if (!this.isSectionSticky) {
      return false
    }

    // Simple debounce - 300ms between events
    if (now - this.lastEventTime < 300) {
      return false
    }

    // Determine direction
    const direction = deltaY > 0 ? 'down' : 'up'
    
    // Calculate new slide
    let newSlide = this.currentSlide
    if (direction === 'down') {
      newSlide = Math.min(this.currentSlide + 1, this.totalSlides - 1)
    } else {
      newSlide = Math.max(this.currentSlide - 1, 0)
    }

    // Only change if different
    if (newSlide !== this.currentSlide) {
      this.currentSlide = newSlide
      this.eventCount++
      this.onSlideChange(newSlide)
      this.startCooldown()
      
      console.log(`Slide changed: ${this.currentSlide} (${direction}, event #${this.eventCount})`)
      this.lastEventTime = now
      return true
    }

    this.lastEventTime = now
    return false
  }

  /**
   * Handle scroll event - fallback for non-wheel devices
   */
  handleScroll(scrollY: number, rect: DOMRect): boolean {
    const now = Date.now()
    
    // Initialize section boundaries
    this.initializeSection(rect)
    
    // Check cooldown
    if (this.isInCooldown) {
      return false
    }

    // Determine if section is sticky
    const wasSticky = this.isSectionSticky
    this.isSectionSticky = rect.top <= 20

    // Section just became sticky
    if (!wasSticky && this.isSectionSticky) {
      console.log('Section became sticky via scroll - starting slide progression')
      this.currentSlide = 0
      this.eventCount = 0
      this.onSlideChange(0)
      this.lastEventTime = now
      return true
    }

    // Section just became unsticky
    if (wasSticky && !this.isSectionSticky) {
      console.log('Section became unsticky via scroll - ending slide progression')
      return false
    }

    // Only process when section is sticky
    if (!this.isSectionSticky) {
      return false
    }

    // More lenient debounce for scroll events
    if (now - this.lastEventTime < 500) {
      return false
    }

    // Determine direction based on scroll position
    const direction = scrollY > this.lastScrollY ? 'down' : 'up'
    this.lastScrollY = scrollY
    
    // Calculate new slide
    let newSlide = this.currentSlide
    if (direction === 'down') {
      newSlide = Math.min(this.currentSlide + 1, this.totalSlides - 1)
    } else {
      newSlide = Math.max(this.currentSlide - 1, 0)
    }

    // Only change if different
    if (newSlide !== this.currentSlide) {
      this.currentSlide = newSlide
      this.eventCount++
      this.onSlideChange(newSlide)
      this.startCooldown()
      
      console.log(`Slide changed via scroll: ${this.currentSlide} (${direction}, event #${this.eventCount})`)
      this.lastEventTime = now
      return true
    }

    this.lastEventTime = now
    return false
  }

  /**
   * Start cooldown period
   */
  private startCooldown(): void {
    this.isInCooldown = true
    
    if (this.cooldownTimeout) {
      clearTimeout(this.cooldownTimeout)
    }
    
    this.cooldownTimeout = setTimeout(() => {
      this.isInCooldown = false
    }, 400) // Reduced cooldown for more responsive feel
  }

  /**
   * Check if we can proceed to next section
   */
  canProceedToNextSection(): boolean {
    return this.isSectionSticky && this.currentSlide === this.totalSlides - 1
  }

  /**
   * Check if we can go to previous section
   */
  canGoToPreviousSection(): boolean {
    return this.isSectionSticky && this.currentSlide === 0
  }

  /**
   * Get current slide
   */
  getCurrentSlide(): number {
    return this.currentSlide
  }

  /**
   * Set current slide
   */
  setCurrentSlide(slideIndex: number): void {
    this.currentSlide = Math.max(0, Math.min(slideIndex, this.totalSlides - 1))
  }

  /**
   * Check if section is sticky
   */
  isSticky(): boolean {
    return this.isSectionSticky
  }

  /**
   * Get event count for debugging
   */
  getEventCount(): number {
    return this.eventCount
  }

  /**
   * Clean up
   */
  destroy(): void {
    if (this.cooldownTimeout) {
      clearTimeout(this.cooldownTimeout)
    }
  }
}

// Configuration
export const SCROLL_EVENT_CONFIG = {
  DEBOUNCE_TIME: 300,
  COOLDOWN_PERIOD: 400,
  WHEEL_DEBOUNCE: 300,
  SCROLL_DEBOUNCE: 500
}

// Utility functions
export function calculateActiveSlide(progress: number, totalSlides: number): number {
  return Math.min(Math.floor(progress * totalSlides), totalSlides - 1)
}

export function isInMainContentZone(rect: DOMRect): boolean {
  return rect.top <= 20 && rect.bottom >= 20
}

export function getSlideProgress(rect: DOMRect): number {
  const totalHeight = rect.height
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
  return Math.max(0, Math.min(1, visibleHeight / totalHeight))
}

export function getScrollSpacerHeight(sectionHeight: number): number {
  return Math.max(0, window.innerHeight - sectionHeight)
}
