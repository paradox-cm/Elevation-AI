"use client"

import { useState } from "react"
import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"

import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Calendar } from "@/components/ui/calendar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function ComponentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState([50])
  const [progress] = useState(33)

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
    >
              <Container size="2xl">
        <Section paddingY="xl">
          <PageHeader
            title="Components"
            description="All available shadcn/ui components with examples and usage patterns."
            size="lg"
            centered
          />
        </Section>

        {/* Buttons - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Buttons"
            description="Different button variants and sizes."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Button Variants</CardTitle>
              <CardDescription className="text-sm">All available button styles and sizes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" className="h-10 w-10 sm:h-11 sm:w-11">
                  <Icon name="add-line" className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button>
                  <Icon name="mail-line" className="h-4 w-4 mr-2" />
                  Login with Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Form Components - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Form Components"
            description="Input fields, selects, and form controls."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Grid cols={1} gap={4} className="mt-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-2 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Input & Textarea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">Message</Label>
                  <Textarea id="message" placeholder="Type your message here." />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">OTP Input</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Select & Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Select</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm">Radio Group</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one" className="text-sm">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two" className="text-sm">Option Two</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode" className="text-sm">Airplane mode</Label>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Data Display - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Data Display"
            description="Components for displaying data and information."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Grid cols={1} gap={4} className="mt-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Avatar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="w-full" />
                <div className="text-sm text-muted-foreground">
                  {progress}% complete
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Slider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Value: {sliderValue[0]}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Feedback - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Feedback"
            description="Components for user feedback and notifications."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Grid cols={1} gap={4} className="mt-6 sm:mt-8 lg:grid-cols-2 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle className="text-sm">Heads up!</AlertTitle>
                  <AlertDescription className="text-sm">
                    You can add components to your app using the cli.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle className="text-sm">Error</AlertTitle>
                  <AlertDescription className="text-sm">
                    Your session has expired. Please log in again.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Navigation - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Navigation"
            description="Components for navigation and menus."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Grid cols={1} gap={4} className="mt-6 sm:mt-8 lg:grid-cols-2 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Breadcrumb</CardTitle>
              </CardHeader>
              <CardContent>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account" className="text-xs sm:text-sm">Account</TabsTrigger>
                    <TabsTrigger value="password" className="text-xs sm:text-sm">Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="current" className="text-sm">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Overlays - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Overlays"
            description="Modal dialogs, popovers, and tooltips."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Grid cols={1} gap={4} className="mt-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Popover</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Tooltip</CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Layout - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Layout"
            description="Components for layout and structure."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Grid cols={1} gap={4} className="mt-6 sm:mt-8 lg:grid-cols-2 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">Is it styled?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      Yes. It comes with default styles that matches the other components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Collapsible</CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="text-sm">Click to expand</span>
                      <Icon name="chevron-down-line" className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    <div className="rounded-md border px-4 py-3 text-sm">
                      @radix-ui/react-collapsible
                    </div>
                    <div className="rounded-md border px-4 py-3 text-sm">
                      @radix-ui/react-collapsible
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Table - Mobile Optimized */}
        <Section paddingY="lg">
          <PageHeader
            title="Table"
            description="Data table component with sorting and pagination."
            size="md"
            className="mb-6 sm:mb-8"
          />
          <Card className="mt-6 sm:mt-8">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption className="text-sm">A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Invoice</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      <TableHead className="text-xs sm:text-sm">Method</TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-xs sm:text-sm">INV001</TableCell>
                      <TableCell className="text-xs sm:text-sm">Paid</TableCell>
                      <TableCell className="text-xs sm:text-sm">Credit Card</TableCell>
                      <TableCell className="text-right text-xs sm:text-sm">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-xs sm:text-sm">INV002</TableCell>
                      <TableCell className="text-xs sm:text-sm">Pending</TableCell>
                      <TableCell className="text-xs sm:text-sm">PayPal</TableCell>
                      <TableCell className="text-right text-xs sm:text-sm">$150.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </AppShell>
  </PageWrapper>
  )
}
