"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import Icon from "@/components/ui/icon"
import { useMobileMenu } from "@/components/ui/layout/mobile-only-layout"

interface MainHeaderProps {
  showLogin?: boolean
  showDemo?: boolean
}

export function MainHeader({ showLogin = true, showDemo = true }: MainHeaderProps) {
  // Try to get mobile menu context, but don't fail if it's not available
  let mobileMenuOpen = false
  let setMobileMenuOpen: (open: boolean) => void = () => {}
  
  try {
    const mobileMenuContext = useMobileMenu()
    mobileMenuOpen = mobileMenuContext.mobileMenuOpen
    setMobileMenuOpen = mobileMenuContext.setMobileMenuOpen
  } catch (error) {
    // Mobile menu context not available - this is fine for design system pages
    console.log("Mobile menu context not available - using default values")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20 transition-colors duration-300" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo width={114} height={21} className="lg:w-[127px] lg:h-[23px]" />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden xl:flex items-center space-x-4">
          {/* Platform Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Platform
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for Platform */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 space-y-1">
                <Link href="/platform" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Overview
                </Link>
                <Link href="/platform/features" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Features
                </Link>
                <Link href="/platform/security" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Security
                </Link>
                <Link href="/platform/integrations" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Integrations
                </Link>
              </div>
            </div>
          </div>
          
          {/* People Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              People
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for People */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 space-y-1">
                <Link href="/wireframes/people/concierge-team" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Concierge Team
                </Link>
                <Link href="/wireframes/people/expert-network" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Expert Network
                </Link>
              </div>
            </div>
          </div>
          
          {/* Solutions Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Solutions
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Mega menu for Solutions */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-6 grid grid-cols-3 gap-8">
                {/* Featured Content */}
                <div className="space-y-4">
                  <div className="w-full h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                      <canvas 
                        className="w-full h-full"
                        ref={(canvas) => {
                          if (!canvas) return;
                          
                          const ctx = canvas.getContext('2d');
                          if (!ctx) return;
                          
                          let time = 0;
                          let animationId: number;
                          
                          function animate() {
                            if (!canvas) return;
                            const width = canvas.offsetWidth;
                            const height = canvas.offsetHeight;
                            
                            // Only animate if canvas has valid dimensions
                            if (width <= 0 || height <= 0) {
                              animationId = requestAnimationFrame(animate);
                              return;
                            }
                            
                            canvas.width = width;
                            canvas.height = height;
                            
                            if (!ctx) return;
                            ctx.clearRect(0, 0, width, height);
                            
                            const imageData = ctx.createImageData(width, height);
                            const data = imageData.data;
                            
                            for (let x = 0; x < width; x++) {
                              for (let y = 0; y < height; y++) {
                                const index = (y * width + x) * 4;
                                
                                // More intense, smaller-scale plasma for dropdown
                                const scale = 0.05;
                                const r1 = 0.3;
                                const r2 = 0.7;
                                const r3 = 0.2;
                                
                                const col = 
                                  Math.sin(Math.sqrt((x * r1 + time * 50) ** 2 + (y * r2) ** 2) * scale) +
                                  Math.sin(Math.sqrt((x * r2) ** 2 + (y * r1 + time * 30) ** 2) * scale) +
                                  Math.sin(Math.sqrt((x * r3 + time * 40) ** 2 + (y * r3 + time * 20) ** 2) * scale);
                                
                                // Use original plasma color palette
                                const r = Math.floor(128 + 127 * Math.sin(col));
                                const g = Math.floor(128 + 127 * Math.cos(col));
                                const b = Math.floor(128 + 127 * (Math.cos(col) - Math.sin(col)));
                                
                                // Add the original checkerboard pattern
                                const checkerboard = Math.floor(x / 2) % 2 === 0 ? 0 : 102;
                                const finalR = Math.min(255, r + checkerboard);
                                const finalG = Math.min(255, g + checkerboard);
                                const finalB = Math.min(255, b + checkerboard);
                                
                                data[index] = finalR;
                                data[index + 1] = finalG;
                                data[index + 2] = finalB;
                                data[index + 3] = 255;
                              }
                            }
                            
                            ctx.putImageData(imageData, 0, 0);
                            time += 0.005;
                            animationId = requestAnimationFrame(animate);
                          }
                          
                          // Start animation
                          animate();
                          
                          // Cleanup function
                          return () => {
                            if (animationId) {
                              cancelAnimationFrame(animationId);
                            }
                          };
                        }}
                      />
                    </div>
                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                        <img 
                          src="/images/branding/E-AI-Arrow.svg" 
                          alt="Elevation AI Arrow" 
                          className="h-6 w-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground mb-2">Transform Your Business</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tailored AI solutions driving growth, efficiency, and innovation across your organization.
                    </p>
                  </div>
                </div>

                {/* By Industry */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">By Industry</h3>
                  <ul className="space-y-3">
                    <li><Link href="/solutions/private-markets" className="text-sm hover:text-primary transition-colors">Private Market Organizations</Link></li>
                    <li><Link href="/solutions/public-markets" className="text-sm hover:text-primary transition-colors">Public Market Organizations</Link></li>
                    <li><Link href="/solutions/banks" className="text-sm hover:text-primary transition-colors">Banks</Link></li>
                    <li><Link href="/solutions/enterprise" className="text-sm hover:text-primary transition-colors">Enterprise</Link></li>
                    <li><Link href="/solutions/government" className="text-sm hover:text-primary transition-colors">Government</Link></li>
                  </ul>
                </div>
                
                {/* By Stage */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">By Stage</h3>
                  <ul className="space-y-3">
                    <li><Link href="/solutions/creating-growing" className="text-sm hover:text-primary transition-colors">Creating & Growing a New Venture</Link></li>
                    <li><Link href="/solutions/scaling" className="text-sm hover:text-primary transition-colors">Scaling a Venture</Link></li>
                    <li><Link href="/solutions/exiting" className="text-sm hover:text-primary transition-colors">Exiting a Venture</Link></li>
                    <li><Link href="/solutions/post-ipo" className="text-sm hover:text-primary transition-colors">Post-IPO Growth</Link></li>
                    <li><Link href="/solutions/family-office" className="text-sm hover:text-primary transition-colors">Post-Exit/Family Office</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing */}
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md">
            Pricing
          </Link>
          
          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Resources
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for Resources */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 space-y-3">
                <Link href="/security" className="block text-sm hover:text-primary transition-colors">Security</Link>
                <Link href="/careers" className="block text-sm hover:text-primary transition-colors">Careers</Link>
                <Link href="/partners" className="block text-sm hover:text-primary transition-colors">Partners</Link>
                <Link href="/investors" className="block text-sm hover:text-primary transition-colors">Investors</Link>
                <Link href="/developers" className="block text-sm hover:text-primary transition-colors">For Developers & Platforms</Link>
                <Link href="/blog" className="block text-sm hover:text-primary transition-colors">Blog + News</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right side - CTAs and Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Desktop CTAs - Hidden below xl */}
          <div className="hidden xl:flex items-center space-x-3">
            {showLogin && (
              <Button variant="ghost" size="sm" asChild className="text-xs xl:text-sm hover:bg-muted/50">
                <Link href="/wireframes/login">
                  <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
            )}
            {showDemo && (
                          <Button size="sm" asChild className="text-xs xl:text-sm hover:bg-primary/90">
              <Link href="/wireframes/sign-up">
                Get Started
              </Link>
            </Button>
            )}
          </div>
          
          {/* Mobile/Tablet CTAs - Hidden on small screens, visible on medium+ */}
          <div className="hidden lg:flex xl:hidden items-center space-x-3">
            {showLogin && (
              <Button variant="ghost" size="sm" asChild className="text-xs lg:text-sm hover:bg-muted/50">
                <Link href="/wireframes/login">
                  <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
            )}
            {showDemo && (
                          <Button size="sm" asChild className="text-xs lg:text-sm hover:bg-primary/90">
              <Link href="/wireframes/sign-up">
                Get Started
              </Link>
            </Button>
            )}
          </div>
          
          {/* Theme Toggle - Always visible */}
          <ThemeToggle />
          
          {/* Mobile Menu Button - Only visible below xl */}
          <div className="xl:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "close-line" : "menu-line"} className="h-5 w-5" />
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Toggle menu"}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
