import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { H3 } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function DesignSystemSidebar() {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState<string[]>([
    "Foundation", "Components", "Guidelines", "Standards"
  ])

  const designSystemCategories = [
            {
          title: "Foundation",
          items: [
            { name: "Brand Identity", href: "/design-system/branding", icon: "image-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Colors", href: "/design-system/colors", icon: "palette-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Typography", href: "/design-system/typography", icon: "text", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Spacing", href: "/design-system/spacing", icon: "ruler-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Corner Radius", href: "/design-system/corner-radius", icon: "shape-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Transparency & Glass", href: "/design-system/transparency", icon: "contrast-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Shadows & Elevation", href: "/design-system/shadows-elevation", icon: "stack-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Design Tokens", href: "/design-system/design-tokens", icon: "palette-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Icons", href: "/design-system/icons", icon: "star-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
            { name: "Grid", href: "/design-system/grid", icon: "grid-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
          ]
        },
    {
      title: "Components",
      items: [
        { name: "Components", href: "/design-system/components", icon: "apps-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Carousels", href: "/design-system/carousels", icon: "slideshow-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Content Components", href: "/design-system/content-components", icon: "article-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Dashboard", href: "/design-system/dashboard", icon: "dashboard-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Analytics", href: "/design-system/analytics", icon: "bar-chart-box-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Data Display", href: "/design-system/data-display", icon: "database-2-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Forms", href: "/design-system/forms", icon: "file-list-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "User Management", href: "/design-system/user-management", icon: "user-settings-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    },
    {
      title: "Guidelines",
      items: [
        { name: "Layout Patterns", href: "/design-system/layout-patterns", icon: "layout-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Interactive States", href: "/design-system/interactive-states", icon: "loader-4-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Motion & Animation", href: "/design-system/motion", icon: "play-circle-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Error States & Feedback", href: "/design-system/error-states", icon: "error-warning-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Sticky Sections", href: "/design-system/sticky-sections", icon: "arrow-up-down-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Animations", href: "/design-system/animations", icon: "play-circle-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    },
    {
      title: "Standards",
      items: [
        { name: "Accessibility", href: "/design-system/accessibility", icon: "shield-check-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Responsive Design", href: "/design-system/responsive", icon: "smartphone-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    }
  ]

  const toggleCategory = (categoryTitle: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryTitle) 
        ? prev.filter(cat => cat !== categoryTitle)
        : [...prev, categoryTitle]
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <nav className="space-y-1">
            <Link 
              href="/design-system" 
              className={cn(
                "flex items-center space-x-3 px-3 py-3 sm:py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === "/design-system" 
                  ? "text-blue-500 bg-blue-500/10" 
                  : "text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
              )}
            >
              <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-500/10 flex-shrink-0">
                <Icon name="home-line" className="h-4 w-4 text-blue-500" />
              </div>
              <span>Overview</span>
            </Link>
          </nav>
        </div>

        {designSystemCategories.map((category) => (
          <Collapsible 
            key={category.title}
            open={openCategories.includes(category.title)}
            onOpenChange={() => toggleCategory(category.title)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between py-3 px-3 h-auto font-semibold text-muted-foreground uppercase tracking-wider text-xs sm:text-sm hover:bg-muted rounded-lg"
              >
                <span>{category.title}</span>
                <Icon 
                  name={openCategories.includes(category.title) ? "arrow-up-s-line" : "arrow-down-s-line"} 
                  className="h-4 w-4 transition-transform duration-200" 
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 sm:mt-3">
              <nav className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 sm:py-2 text-sm rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${item.bgColor} flex-shrink-0`}>
                      <Icon name={item.icon} className={`h-3 w-3 ${item.color}`} />
                    </div>
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
