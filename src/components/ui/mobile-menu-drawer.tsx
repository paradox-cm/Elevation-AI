"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface MobileMenuDrawerProps {
  currentPage?: string
  onClose?: () => void
}

export function MobileMenuDrawer({ currentPage, onClose }: MobileMenuDrawerProps) {
  const [expandedPlatform, setExpandedPlatform] = React.useState(false) // Platform closed by default
  const [expandedPeople, setExpandedPeople] = React.useState(false)
  const [expandedSolutions, setExpandedSolutions] = React.useState(false)
  const [expandedResources, setExpandedResources] = React.useState(false)
  const [expandedQuickLinks, setExpandedQuickLinks] = React.useState(false)

  const mainNavigationLinks = [
    { href: "/", label: "Home", active: currentPage === "home" },
    { href: "/website/platform", label: "Platform", active: currentPage === "platform", hasDropdown: true },
    { href: "/people", label: "People", active: currentPage === "people", hasDropdown: true },
    { href: "/website/solutions", label: "Solutions", active: currentPage === "solutions", hasDropdown: true },
    { href: "/pricing", label: "Pricing", active: currentPage === "pricing" },
    { href: "/resources", label: "Resources", active: currentPage === "resources", hasDropdown: true }
  ]

  const platformSubLinks = [
    { href: "/website/platform", label: "Overview" },
    { href: "/website/platform#features", label: "Features" },
    { href: "/website/platform#security", label: "Security" },
    { href: "/website/platform#integrations", label: "Integrations" }
  ]

  const peopleSubLinks = [
    { href: "/website/people/concierge-team", label: "Concierge Team" },
    { href: "/website/people/expert-network", label: "Expert Network" }
  ]

  const solutionsSubLinks = [
    { type: "header", label: "By Industry" },
    { href: "/website/solutions#private-markets", label: "Private Market Organizations" },
    { href: "/website/solutions#public-markets", label: "Public Market Organizations" },
    { href: "/website/solutions#banks", label: "Banks" },
    { href: "/website/solutions#enterprise", label: "Enterprise" },
    { href: "/website/solutions#government", label: "Government" },
    { type: "divider" },
    { type: "header", label: "By Stage" },
    { href: "/website/solutions#creating-growing", label: "Creating a New Venture" },
    { href: "/website/solutions#scaling", label: "Scaling a Venture" },
    { href: "/website/solutions#exiting", label: "Exiting a Venture" },
    { href: "/website/solutions#post-ipo", label: "Post-IPO Growth" },
    { href: "/website/solutions#family-office", label: "Post-Exit Family Office" }
  ]

  const resourcesSubLinks = [
    { href: "/security", label: "Security" },
    { href: "/careers", label: "Careers" },
    { href: "/partners", label: "Partners" },
    { href: "/investors", label: "Investors" },
    { href: "/developers", label: "For Developers & Platforms" },
    { href: "/blog", label: "Blog + News" }
  ]

  const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/investors", label: "Investors" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" }
  ]

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Navigation Content */}
      <div className="flex-1 p-4 pb-4 bg-background">
        {/* Main Navigation */}
        <div className="space-y-2">
          {mainNavigationLinks.map((link) => (
            <div key={link.href}>
              {link.hasDropdown ? (
                <div className="space-y-1">
                  <button
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
                      link.active 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:bg-muted"
                    )}
                    onClick={() => {
                      if (link.label === "Platform") {
                        setExpandedPlatform(!expandedPlatform)
                      } else if (link.label === "People") {
                        setExpandedPeople(!expandedPeople)
                      } else if (link.label === "Solutions") {
                        setExpandedSolutions(!expandedSolutions)
                      } else if (link.label === "Resources") {
                        setExpandedResources(!expandedResources)
                      }
                    }}
                  >
                    <span>{link.label}</span>
                    <Icon 
                      name="arrow-down-s-line" 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        ((link.label === "Platform" && expandedPlatform) || 
                         (link.label === "People" && expandedPeople) ||
                         (link.label === "Solutions" && expandedSolutions) ||
                         (link.label === "Resources" && expandedResources)) 
                          ? "rotate-180" 
                          : ""
                      )} 
                    />
                  </button>
                  
                  {/* Platform Dropdown */}
                  {link.label === "Platform" && expandedPlatform && (
                    <div className="ml-4 space-y-1 bg-background">
                      {platformSubLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          onClick={onClose}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* People Dropdown */}
                  {link.label === "People" && expandedPeople && (
                    <div className="ml-4 space-y-1 bg-background">
                      {peopleSubLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          onClick={onClose}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Solutions Dropdown */}
                  {link.label === "Solutions" && expandedSolutions && (
                    <div className="ml-4 space-y-1 bg-background">
                      {solutionsSubLinks.map((subLink, index) => {
                        if (subLink.type === "header") {
                          return (
                            <div key={`header-${index}`} className="px-3 py-2">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                {subLink.label}
                              </h4>
                            </div>
                          )
                        }
                        if (subLink.type === "divider") {
                          return (
                            <div key={`divider-${index}`} className="px-3 py-1">
                              <div className="border-t border-border"></div>
                            </div>
                          )
                        }
                        return (
                          <Link
                            key={subLink.href}
                            href={subLink.href!}
                            className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            onClick={onClose}
                          >
                            {subLink.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                  
                  {/* Resources Dropdown */}
                  {link.label === "Resources" && expandedResources && (
                    <div className="ml-4 space-y-1 bg-background">
                      {resourcesSubLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          onClick={onClose}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    link.active 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section - Buttons */}
      <div className="flex-shrink-0 p-4 pt-4 border-t border-border bg-background">
        <div className="space-y-4">
          {/* Get Started Button */}
          <Button className="w-full" size="lg" asChild>
            <Link href="/website/sign-up">
              Get Started
            </Link>
          </Button>
          
          {/* Request a Demo Button */}
          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/website/demo">
              Request a Demo
            </Link>
          </Button>
          
          {/* Login Button - Text Button */}
          <Link 
            href="/website/login"
            className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            <Icon name="login-box-line" className="h-4 w-4 mr-2" />
            Login
          </Link>

          {/* Quick Links Dropdown */}
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-3">
            <button
              className="flex items-center justify-between w-full text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
              onClick={() => setExpandedQuickLinks(!expandedQuickLinks)}
            >
              <span>Quick Links</span>
              <Icon 
                name="arrow-down-s-line" 
                className={cn(
                  "h-3 w-3 transition-transform",
                  expandedQuickLinks ? "rotate-180" : ""
                )} 
              />
            </button>
            
            {expandedQuickLinks && (
              <div className="space-y-1 mt-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-2 py-1.5 text-xs rounded transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
