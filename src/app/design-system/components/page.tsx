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
      <Container>
        <Section paddingY="xl">
          <PageHeader
            title="Components"
            description="All available shadcn/ui components with examples and usage patterns."
            size="lg"
            centered
          />
        </Section>

        {/* Buttons */}
        <Section paddingY="lg">
          <PageHeader
            title="Buttons"
            description="Different button variants and sizes."
            size="md"
            className="mb-8"
          />
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All available button styles and sizes.</CardDescription>
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
                <Button size="icon">
                  <Icon name="add-line" className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button>
                  <Icon name="mail-line" className="h-4 w-4" />
                  Login with Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Form Components */}
        <Section paddingY="lg">
          <PageHeader
            title="Form Components"
            description="Input fields, selects, and form controls."
            size="md"
            className="mb-8"
          />
          <Grid cols={2} gap={4} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Input & Textarea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here." />
                </div>
                <div className="space-y-2">
                  <Label>OTP Input</Label>
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
              <CardHeader>
                <CardTitle>Select & Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select</Label>
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
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Data Display */}
        <Section paddingY="lg">
          <PageHeader
            title="Data Display"
            description="Tables, badges, avatars, and progress indicators."
            size="md"
            className="mb-8"
          />
          <Grid cols={2} gap={4} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Badges & Avatar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">shadcn</p>
                    <p className="text-xs text-muted-foreground">m@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress & Slider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Progress: {progress}%</Label>
                  <Progress value={progress} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>Slider: {sliderValue[0]}</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loading States</Label>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Navigation */}
        <Section paddingY="lg">
          <PageHeader
            title="Navigation"
            description="Breadcrumbs, pagination, and navigation menus."
            size="md"
            className="mb-8"
          />
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb</CardTitle>
              </CardHeader>
              <CardContent>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/design-system">Design System</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pagination</CardTitle>
              </CardHeader>
              <CardContent>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Overlays */}
        <Section paddingY="lg">
          <PageHeader
            title="Overlays & Dialogs"
            description="Modals, popovers, tooltips, and dropdowns."
            size="md"
            className="mb-8"
          />
          <Card>
            <CardHeader>
              <CardTitle>Interactive Overlays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button type="submit">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Open Alert</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                      <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

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
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                          <Input
                            id="width"
                            defaultValue="100%"
                            className="col-span-2 h-8"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

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

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">@nextjs</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                          The React Framework – created and maintained by @vercel.
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon name="user-line" className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="settings-3-line" className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                    Right click here
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem inset>
                      Back
                    </ContextMenuItem>
                    <ContextMenuItem inset disabled>
                      Forward
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                      Reload
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Layout Components */}
        <Section paddingY="lg">
          <PageHeader
            title="Layout & Structure"
            description="Cards, separators, tabs, and accordion."
            size="md"
            className="mb-8"
          />
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Make changes to your account here. Click save when you&apos;re done.
                    </p>
                    <Input placeholder="Username" />
                  </TabsContent>
                  <TabsContent value="password" className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Change your password here. After saving, you&apos;ll be logged out.
                    </p>
                    <Input type="password" placeholder="Current password" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It&apos;s animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collapsible</CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center justify-between w-full">
                      <span>Can I use this in my project?</span>
                      <Icon name="arrow-down-s-line" className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 text-sm">
                      Yes. Free to use for personal and commercial projects.
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Alerts & Feedback */}
        <Section paddingY="lg">
          <PageHeader
            title="Alerts & Feedback"
            description="Alert messages and notification components."
            size="md"
            className="mb-8"
          />
          <div className="space-y-4">
            <Alert>
              <Icon name="alert-line" className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Icon name="alert-line" className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* Data Tables */}
        <Section paddingY="lg">
          <PageHeader
            title="Data Table"
            description="Structured data display with tables."
            size="md"
            className="mb-8"
          />
          <Card>
            <CardHeader>
              <CardTitle>Invoice Table</CardTitle>
              <CardDescription>A list of your recent invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>

        {/* Advanced Components */}
        <Section paddingY="lg">
          <PageHeader
            title="Advanced Components"
            description="Calendar, carousel, command palette, and more."
            size="md"
            className="mb-8"
          />
          
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Command Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <Icon name="calendar-line" className="mr-2 h-4 w-4" />
                          <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                          <Icon name="search-line" className="mr-2 h-4 w-4" />
                          <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                          <Icon name="calculator-line" className="mr-2 h-4 w-4" />
                          <span>Calculator</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>
                          <Icon name="user-line" className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          <Icon name="settings-3-line" className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Carousel</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toggle Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Toggle aria-label="Toggle italic">
                    <Icon name="star-line" className="h-4 w-4" />
                  </Toggle>
                  <Toggle aria-label="Toggle bold" pressed>
                    <Icon name="star-line" className="h-4 w-4" />
                  </Toggle>
                </div>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Icon name="star-line" className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Icon name="notification-line" className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Toggle underline">
                    <Icon name="settings-3-line" className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Utility Components */}
        <Section paddingY="lg">
          <PageHeader
            title="Utility Components"
            description="Separators, scroll areas, and aspect ratios."
            size="md"
            className="mb-8"
          />
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Separators & Scroll Area</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                    <p className="text-sm text-muted-foreground">
                      An open-source UI component library.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex h-5 items-center space-x-4 text-sm">
                    <div>Blog</div>
                    <Separator orientation="vertical" />
                    <div>Docs</div>
                    <Separator orientation="vertical" />
                    <div>Source</div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                  <ScrollArea className="h-72 w-48 rounded-md border">
                    <div className="p-4">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="text-sm">
                          Tag {i + 1}
                          {i !== 49 && <Separator className="my-2" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aspect Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-sm">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">16:9 Aspect Ratio</p>
                    </div>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resizable Panels</CardTitle>
              </CardHeader>
              <CardContent>
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[200px] max-w-md rounded-lg border"
                >
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">One</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                          <span className="font-semibold">Two</span>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                          <span className="font-semibold">Three</span>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Menu Components */}
        <Section paddingY="lg">
          <PageHeader
            title="Menu Components"
            description="Menubar and navigation menu components."
            size="md"
            className="mb-8"
          />
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menubar</CardTitle>
              </CardHeader>
              <CardContent>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>New Window</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Share</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Cut</MenubarItem>
                      <MenubarItem>Copy</MenubarItem>
                      <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  shadcn/ui
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Beautifully designed components built with Radix UI and
                                  Tailwind CSS.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </div>
                          <div className="grid gap-1">
                            <NavigationMenuLink asChild>
                              <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">Introduction</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Re-usable components built using Radix UI and Tailwind CSS.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Documentation
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </CardContent>
            </Card>
          </div>
        </Section>
      </Container>
    </AppShell>
    </PageWrapper>
  )
}
