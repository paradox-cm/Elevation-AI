"use client"


import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H1, H2, H3, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useUserManagementConfig } from "@/hooks/use-user-management-config"
import {
  UserProfile,
  UserSettings,
  TeamMember,
  TeamManagement,
  UserInviteForm,
} from "@/components/ui/user-management"
import { cn } from "@/lib/utils"
import { H4 } from "@/components/ui/typography"

export default function UserManagementPage() {
  const {
    config,
    userProfileConfig,
    userSettingsConfig,
    teamManagementConfig,
    userRoleConfig,
    userInviteConfig,
    userPermissionsConfig,
    userAdminConfig
  } = useUserManagementConfig()

  const [activeTab, setActiveTab] = useState("profiles")
  const [showInviteForm, setShowInviteForm] = useState(false)

  // Sample user data
  const sampleUser = {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Product Manager",
    avatar: "https://github.com/shadcn.png",
    status: "active" as const,
    department: "Product",
    location: "San Francisco, CA",
    bio: "Experienced product manager with 8+ years in SaaS and enterprise software. Passionate about user experience and data-driven product decisions.",
    joinDate: "March 2022",
  }

  const userSettings = {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: "team" as const,
      showEmail: true,
      showLocation: true,
    },
    preferences: {
      theme: "system" as const,
      language: "en",
      timezone: "America/Los_Angeles",
    },
  }

  const teamData = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Product Manager",
      avatar: "https://github.com/shadcn.png",
      status: "online" as const,
      department: "Product",
      skills: ["Product Strategy", "User Research", "Agile"],
      lastActive: "2 minutes ago",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Lead Developer",
      avatar: "https://github.com/shadcn.png",
      status: "online" as const,
      department: "Engineering",
      skills: ["React", "TypeScript", "Node.js"],
      lastActive: "5 minutes ago",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "UX Designer",
      avatar: "https://github.com/shadcn.png",
      status: "away" as const,
      department: "Design",
      skills: ["Figma", "User Testing", "Prototyping"],
      lastActive: "1 hour ago",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Data Scientist",
      avatar: "https://github.com/shadcn.png",
      status: "offline" as const,
      department: "Data",
      skills: ["Python", "Machine Learning", "SQL"],
      lastActive: "3 hours ago",
    },
    {
      id: "5",
      name: "Lisa Thompson",
      role: "Marketing Manager",
      avatar: "https://github.com/shadcn.png",
      status: "online" as const,
      department: "Marketing",
      skills: ["Digital Marketing", "Analytics", "Content Strategy"],
      lastActive: "10 minutes ago",
    },
    {
      id: "6",
      name: "Alex Wong",
      role: "DevOps Engineer",
      avatar: "https://github.com/shadcn.png",
      status: "offline" as const,
      department: "Engineering",
      skills: ["AWS", "Docker", "Kubernetes"],
      lastActive: "1 day ago",
    },
  ]

  const handleEditUser = (userId: string) => {
    console.log("Editing user:", userId)
  }

  const handleViewProfile = (memberId: string) => {
    console.log("Viewing profile:", memberId)
  }

  const handleMessage = (memberId: string) => {
    console.log("Messaging member:", memberId)
  }

  const handleInvite = () => {
    setShowInviteForm(true)
  }

  const handleSaveSettings = (settings: {
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    privacy: {
      profileVisibility: "public" | "private" | "team"
      showEmail: boolean
      showLocation: boolean
    }
    preferences: {
      theme: "light" | "dark" | "system"
      language: string
      timezone: string
    }
  }) => {
    console.log("Saving settings:", settings)
  }

  const handleInviteSubmit = (data: {
    email: string
    name: string
    role: string
    department: string
    message: string
  }) => {
    console.log("Inviting user:", data)
    setShowInviteForm(false)
  }

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="User Management Components"
              description="Comprehensive user management system for building team collaboration, user profiles, settings, and administration interfaces."
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="user-settings-line" className="h-5 w-5" />
                  User Management System Overview
                </CardTitle>
                <CardDescription>
                  Our user management components provide everything you need to build comprehensive team collaboration and user administration systems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="user-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">User Profiles</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      User profiles, settings panels, and account management
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="team-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Team Management</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Team member cards, collaboration tools, and team administration
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="user-add-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">User Administration</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      User invitations, role management, and access control
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* User Management Components Showcase */}
          <Section paddingY="lg">
            <ResponsiveTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="profiles">Profiles</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="settings">Settings</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="team">Team</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="admin">Admin</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* User Profiles Showcase */}
              <ResponsiveTabsContent value="profiles" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Profile Components</CardTitle>
                    <CardDescription>
                      User profile cards and detailed user information displays
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* User Profile */}
                    <div>
                      <H3 className="mb-6">User Profile Card</H3>
                      <div className="max-w-2xl">
                        <UserProfile
                          user={sampleUser}
                          onEdit={handleEditUser}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Team Member Cards */}
                    <div>
                      <H3 className="mb-6">Team Member Cards</H3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamData.slice(0, 6).map((member) => (
                          <TeamMember
                            key={member.id}
                            member={member}
                            onViewProfile={handleViewProfile}
                            onMessage={handleMessage}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Settings Showcase */}
              <ResponsiveTabsContent value="settings" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Settings Components</CardTitle>
                    <CardDescription>
                      Account settings, preferences, and privacy controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* User Settings */}
                    <div>
                      <H3 className="mb-6">User Settings Panel</H3>
                      <div className="max-w-4xl">
                        <UserSettings
                          user={sampleUser}
                          settings={userSettings}
                          onSave={handleSaveSettings}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Team Management Showcase */}
              <ResponsiveTabsContent value="team" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Management Components</CardTitle>
                    <CardDescription>
                      Team member management, collaboration tools, and team administration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Team Management */}
                    <div>
                      <H3 className="mb-6">Team Management</H3>
                      <TeamManagement
                        team={teamData}
                        onViewProfile={handleViewProfile}
                        onMessage={handleMessage}
                        onInvite={handleInvite}
                      />
                    </div>

                    <Separator />

                    {/* Team Member Grid */}
                    <div>
                      <H3 className="mb-6">Team Member Grid</H3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamData.map((member) => (
                          <TeamMember
                            key={member.id}
                            member={member}
                            onViewProfile={handleViewProfile}
                            onMessage={handleMessage}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Admin Showcase */}
              <ResponsiveTabsContent value="admin" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Administration Components</CardTitle>
                    <CardDescription>
                      User invitations, role management, and administrative tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* User Invite Form */}
                    <div>
                      <H3 className="mb-6">User Invitation Form</H3>
                      <div className="max-w-2xl">
                        <UserInviteForm
                          onSubmit={handleInviteSubmit}
                          isLoading={false}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* User Management Table */}
                    <div>
                      <H3 className="mb-6">User Management Table</H3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 p-4 border-b">
                          <div className="flex items-center justify-between">
                            <H4>All Users</H4>
                            <Button size="sm" onClick={handleInvite}>
                              <Icon name="user-add-line" className="h-4 w-4 mr-1" />
                              Invite User
                            </Button>
                          </div>
                        </div>
                        <div className="divide-y">
                          {teamData.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-4 hover:bg-muted/25">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                  <Icon name="user-line" className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <BodySmall className="text-muted-foreground">
                                    {member.role} • {member.department}
                                  </BodySmall>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">{member.status}</Badge>
                                <Button size="sm" variant="outline">
                                  <Icon name="settings-3-line" className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Role Management */}
                    <div>
                      <H3 className="mb-6">Role Management</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">User Roles</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                { role: "Admin", count: 2, color: "bg-red-500" },
                                { role: "Manager", count: 3, color: "bg-blue-500" },
                                { role: "Member", count: 8, color: "bg-green-500" },
                                { role: "Viewer", count: 5, color: "bg-gray-500" },
                              ].map((item) => (
                                <div key={item.role} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                    <BodySmall className="font-medium">{item.role}</BodySmall>
                                  </div>
                                  <Badge variant="secondary">{item.count}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Departments</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                { dept: "Engineering", count: 4, color: "bg-blue-500" },
                                { dept: "Product", count: 2, color: "bg-purple-500" },
                                { dept: "Design", count: 2, color: "bg-pink-500" },
                                { dept: "Marketing", count: 1, color: "bg-green-500" },
                                { dept: "Data", count: 1, color: "bg-orange-500" },
                              ].map((item) => (
                                <div key={item.dept} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                    <BodySmall className="font-medium">{item.dept}</BodySmall>
                                  </div>
                                  <Badge variant="secondary">{item.count}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
