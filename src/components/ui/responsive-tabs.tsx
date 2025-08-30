"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResponsiveTabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

interface ResponsiveTabsListProps {
  className?: string
  children: React.ReactNode
}

interface ResponsiveTabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
}

interface ResponsiveTabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

const ResponsiveTabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
  tabs: Array<{ value: string; label: string }>
  setTabs: React.Dispatch<React.SetStateAction<Array<{ value: string; label: string }>>>
} | null>(null)

export function ResponsiveTabs({ 
  defaultValue, 
  value, 
  onValueChange, 
  className, 
  children 
}: ResponsiveTabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [tabs, setTabs] = React.useState<Array<{ value: string; label: string }>>([])
  
  const currentValue = value || internalValue
  const handleValueChange = onValueChange || setInternalValue

  // Extract tab information from children on mount
  React.useEffect(() => {
    const tabInfo: Array<{ value: string; label: string }> = []
    
    // Find ResponsiveTabsTrigger components and extract their info
    const findTabs = (children: React.ReactNode): void => {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === ResponsiveTabsTrigger) {
            const props = child.props as ResponsiveTabsTriggerProps
            tabInfo.push({ value: props.value, label: String(props.children) })
          } else if (child.props && typeof child.props === 'object' && 'children' in child.props) {
            findTabs(child.props.children as React.ReactNode)
          }
        }
      })
    }
    
    findTabs(children)
    setTabs(tabInfo)
  }, [children])

  const contextValue = React.useMemo(() => ({
    value: currentValue,
    onValueChange: handleValueChange,
    tabs,
    setTabs
  }), [currentValue, handleValueChange, tabs, setTabs])

  return (
    <ResponsiveTabsContext.Provider value={contextValue}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </ResponsiveTabsContext.Provider>
  )
}

export function ResponsiveTabsList({ className, children }: ResponsiveTabsListProps) {
  const context = React.useContext(ResponsiveTabsContext)
  if (!context) throw new Error("ResponsiveTabsList must be used within ResponsiveTabs")

  return (
    <>
      {/* Desktop: Regular tabs */}
      <div className="hidden md:block">
        <Tabs value={context.value} onValueChange={context.onValueChange}>
          <TabsList className={className}>
            {children}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Mobile: Dropdown selector */}
      <div className="block md:hidden">
        <Select value={context.value} onValueChange={context.onValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent>
            {context.tabs.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export function ResponsiveTabsTrigger({ value, className, children }: ResponsiveTabsTriggerProps) {
  return (
    <TabsTrigger value={value} className={className}>
      {children}
    </TabsTrigger>
  )
}

export function ResponsiveTabsContent({ value, className, children }: ResponsiveTabsContentProps) {
  const context = React.useContext(ResponsiveTabsContext)
  if (!context) throw new Error("ResponsiveTabsContent must be used within ResponsiveTabs")

  return (
    <>
      {/* Desktop: Regular tabs content */}
      <div className="hidden md:block">
        <Tabs value={context.value} onValueChange={context.onValueChange}>
          <TabsContent value={value} className={className}>
            {children}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mobile: Show content based on selected value */}
      <div className="block md:hidden">
        {context.value === value && (
          <div className={className}>
            {children}
          </div>
        )}
      </div>
    </>
  )
}
