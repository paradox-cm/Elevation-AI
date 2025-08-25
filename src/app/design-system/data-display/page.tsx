"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import {
  DataTable,
  DataTableWithActions,
  SortableColumn,
  StatusBadge,
  ActionButton,
} from "@/components/ui/data-table"

// Sample data for tables
interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastActive: string
  avatar?: string
}

interface Project {
  id: string
  name: string
  status: string
  progress: number
  assignee: string
  dueDate: string
  priority: string
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Editor",
    status: "inactive",
    lastActive: "1 week ago",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
    status: "pending",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Admin",
    status: "active",
    lastActive: "5 minutes ago",
  },
]

const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "in-progress",
    progress: 75,
    assignee: "John Doe",
    dueDate: "2024-02-15",
    priority: "high",
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "completed",
    progress: 100,
    assignee: "Jane Smith",
    dueDate: "2024-01-30",
    priority: "medium",
  },
  {
    id: "3",
    name: "Database Migration",
    status: "pending",
    progress: 0,
    assignee: "Bob Johnson",
    dueDate: "2024-03-01",
    priority: "high",
  },
  {
    id: "4",
    name: "API Documentation",
    status: "in-progress",
    progress: 45,
    assignee: "Alice Brown",
    dueDate: "2024-02-28",
    priority: "low",
  },
]

export default function DataDisplayPage() {


  // User table columns
  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableColumn column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <SortableColumn column={column} title="Role" />
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("role")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <SortableColumn column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <StatusBadge status={row.getValue("status")} />
      ),
    },
    {
      accessorKey: "lastActive",
      header: ({ column }) => (
        <SortableColumn column={column} title="Last Active" />
      ),
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("lastActive")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center space-x-2">
            <ActionButton
              icon="eye-line"
              label="View"
              onClick={() => console.log("View user:", user.id)}
            />
            <ActionButton
              icon="edit-line"
              label="Edit"
              onClick={() => console.log("Edit user:", user.id)}
            />
            <ActionButton
              icon="delete-bin-line"
              label="Delete"
              onClick={() => console.log("Delete user:", user.id)}
              variant="destructive"
            />
          </div>
        )
      },
    },
  ]

  // Project table columns
  const projectColumns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableColumn column={column} title="Project" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <SortableColumn column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <StatusBadge status={row.getValue("status")} />
      ),
    },
    {
      accessorKey: "progress",
      header: ({ column }) => (
        <SortableColumn column={column} title="Progress" />
      ),
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number
        return (
          <div className="flex items-center space-x-2">
            <Progress value={progress} className="w-20" />
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: "assignee",
      header: ({ column }) => (
        <SortableColumn column={column} title="Assignee" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("assignee")}</div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <SortableColumn column={column} title="Due Date" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("dueDate"))
        return (
          <div className="text-sm text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        )
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <SortableColumn column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        const priorityConfig = {
          high: { label: "High", variant: "destructive" as const },
          medium: { label: "Medium", variant: "default" as const },
          low: { label: "Low", variant: "secondary" as const },
        }
        const config = priorityConfig[priority as keyof typeof priorityConfig]
        return (
          <Badge variant={config.variant} className="capitalize">
            {config.label}
          </Badge>
        )
      },
    },
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Enhanced Data Display"
              description="Comprehensive data visualization components including tables, empty states, and data patterns for building professional user interfaces."
              size="lg"
              centered
            />
          </Section>

          {/* Data Display Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="database-2-line" className="h-5 w-5" />
                  Data Display System Overview
                </CardTitle>
                <CardDescription>
                  Our enhanced data display system provides comprehensive table functionality, empty states, and data visualization patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="table-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Enhanced Tables</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Sortable, filterable, and paginated tables with advanced features
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="file-damage-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Empty States</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Beautiful empty states with actionable feedback and guidance
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="bar-chart-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Data Patterns</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Consistent patterns for displaying various types of data
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Data Tables */}
          <Section paddingY="lg">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="projects">Project Tracking</TabsTrigger>
              </TabsList>

              {/* Users Table */}
              <TabsContent value="users" className="space-y-6">
                <DataTableWithActions
                  columns={userColumns}
                  data={users}
                  title="User Management"
                  description="Manage users, roles, and permissions across the platform"
                  searchPlaceholder="Search users..."
                  actions={[
                    {
                      label: "Add User",
                      icon: "user-add-line",
                      onClick: () => console.log("Add user"),
                      variant: "default",
                    },
                    {
                      label: "Export",
                      icon: "download-line",
                      onClick: () => console.log("Export users"),
                      variant: "outline",
                    },
                    {
                      label: "Bulk Delete",
                      icon: "delete-bin-line",
                      onClick: () => console.log("Bulk delete"),
                      variant: "destructive",
                    },
                  ]}
                />
              </TabsContent>

              {/* Projects Table */}
              <TabsContent value="projects" className="space-y-6">
                <DataTable
                  columns={projectColumns}
                  data={projects}
                  title="Project Tracking"
                  description="Track project progress, assignments, and deadlines"
                  searchPlaceholder="Search projects..."
                  emptyState={{
                    title: "No projects found",
                    description: "Get started by creating your first project.",
                    icon: "folder-line",
                    action: {
                      label: "Create Project",
                      onClick: () => console.log("Create project"),
                    },
                  }}
                />
              </TabsContent>
            </Tabs>
          </Section>

          {/* Empty States Showcase */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="file-damage-line" className="h-5 w-5" />
                  Empty States
                </CardTitle>
                <CardDescription>
                  Various empty state patterns for different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid cols={2} gap={6}>
                  <div className="space-y-4">
                    <H3>No Data Available</H3>
                    <div className="border rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="p-3 bg-muted rounded-full mb-4">
                          <Icon name="database-2-line" className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <H3 className="text-lg font-medium mb-2">No data available</H3>
                        <BodySmall className="text-muted-foreground text-center mb-4 max-w-sm">
                          There are no items to display at the moment.
                        </BodySmall>
                        <Button size="sm">
                          <Icon name="add-line" className="h-4 w-4" />
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>No Search Results</H3>
                    <div className="border rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="p-3 bg-muted rounded-full mb-4">
                          <Icon name="search-line" className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <H3 className="text-lg font-medium mb-2">No results found</H3>
                        <BodySmall className="text-muted-foreground text-center mb-4 max-w-sm">
                          Try adjusting your search terms or filters to find what you&apos;re looking for.
                        </BodySmall>
                        <Button variant="outline" size="sm">
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Error State</H3>
                    <div className="border rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="p-3 bg-red-500/10 rounded-full mb-4">
                          <Icon name="error-warning-line" className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <H3 className="text-lg font-medium mb-2">Something went wrong</H3>
                        <BodySmall className="text-muted-foreground text-center mb-4 max-w-sm">
                          We encountered an error while loading your data. Please try again.
                        </BodySmall>
                        <Button size="sm">
                          <Icon name="refresh-line" className="h-4 w-4" />
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Loading State</H3>
                    <div className="border rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="p-3 bg-muted rounded-full mb-4">
                          <Icon name="loader-4-line" className="h-6 w-6 text-muted-foreground animate-spin" />
                        </div>
                        <H3 className="text-lg font-medium mb-2">Loading data...</H3>
                        <BodySmall className="text-muted-foreground text-center max-w-sm">
                          Please wait while we fetch your information.
                        </BodySmall>
                      </div>
                    </div>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </Section>

          {/* Data Patterns */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="bar-chart-line" className="h-5 w-5" />
                  Data Patterns
                </CardTitle>
                <CardDescription>
                  Common patterns for displaying different types of data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div>
                    <H3 className="mb-4">Statistics Cards</H3>
                    <Grid cols={4} gap={4}>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <BodySmall className="text-muted-foreground">Total Users</BodySmall>
                              <div className="text-2xl font-bold">1,234</div>
                              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                                <Icon name="arrow-up-line" className="mr-1 h-4 w-4" />
                                +12.5%
                              </div>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                              <Icon name="user-line" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <BodySmall className="text-muted-foreground">Active Projects</BodySmall>
                              <div className="text-2xl font-bold">56</div>
                              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                                <Icon name="arrow-up-line" className="mr-1 h-4 w-4" />
                                +8.2%
                              </div>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-lg">
                              <Icon name="folder-line" className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <BodySmall className="text-muted-foreground">Revenue</BodySmall>
                              <div className="text-2xl font-bold">$45.2K</div>
                              <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                                <Icon name="arrow-down-line" className="mr-1 h-4 w-4" />
                                -2.1%
                              </div>
                            </div>
                            <div className="p-3 bg-yellow-500/10 rounded-lg">
                              <Icon name="money-dollar-circle-line" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <BodySmall className="text-muted-foreground">Tasks Completed</BodySmall>
                              <div className="text-2xl font-bold">892</div>
                              <div className="flex items-center text-sm text-green-600">
                                <Icon name="arrow-up-line" className="mr-1 h-4 w-4" />
                                +15.3%
                              </div>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                              <Icon name="check-line" className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </div>

                  <Separator />

                  {/* Progress Indicators */}
                  <div>
                    <H3 className="mb-4">Progress Indicators</H3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <BodySmall>Website Redesign</BodySmall>
                          <BodySmall className="text-muted-foreground">75%</BodySmall>
                        </div>
                        <Progress value={75} className="w-full" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <BodySmall>Mobile App Development</BodySmall>
                          <BodySmall className="text-muted-foreground">100%</BodySmall>
                        </div>
                        <Progress value={100} className="w-full" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <BodySmall>Database Migration</BodySmall>
                          <BodySmall className="text-muted-foreground">0%</BodySmall>
                        </div>
                        <Progress value={0} className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
