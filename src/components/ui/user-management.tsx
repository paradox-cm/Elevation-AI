"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { H3, H4, BodySmall } from "@/components/ui/typography"

// User Profile Card Component
interface UserProfileProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
    status: "active" | "inactive" | "pending"
    department?: string
    location?: string
    bio?: string
    joinDate: string
  }
  onEdit?: (userId: string) => void
  className?: string
}

export function UserProfile({
  user,
  onEdit,
  className,
}: UserProfileProps) {
  const statusConfig = {
    active: { label: "Active", color: "bg-green-500" },
    inactive: { label: "Inactive", color: "bg-gray-500" },
    pending: { label: "Pending", color: "bg-yellow-500" },
  }

  const config = statusConfig[user.status]

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="user-line" className="h-5 w-5" />
            User Profile
          </CardTitle>
          {onEdit && (
            <Button size="sm" variant="outline" onClick={() => onEdit(user.id)}>
              <Icon name="edit-line" className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <H4 className="font-semibold">{user.name}</H4>
            <BodySmall className="text-muted-foreground">{user.email}</BodySmall>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{user.role}</Badge>
              <div className={cn("w-2 h-2 rounded-full", config.color)} />
              <BodySmall className="text-muted-foreground">{config.label}</BodySmall>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.department && (
            <div>
              <BodySmall className="text-muted-foreground font-medium">Department</BodySmall>
              <BodySmall>{user.department}</BodySmall>
            </div>
          )}
          {user.location && (
            <div>
              <BodySmall className="text-muted-foreground font-medium">Location</BodySmall>
              <BodySmall>{user.location}</BodySmall>
            </div>
          )}
          <div>
            <BodySmall className="text-muted-foreground font-medium">Member Since</BodySmall>
            <BodySmall>{user.joinDate}</BodySmall>
          </div>
        </div>

        {user.bio && (
          <>
            <Separator />
            <div>
              <BodySmall className="text-muted-foreground font-medium mb-2">Bio</BodySmall>
              <BodySmall>{user.bio}</BodySmall>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// User Settings Panel Component
interface UserSettingsProps {
  user: {
    id: string
    name: string
    email: string
  }
  settings: {
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
  }
  onSave?: (settings: UserSettingsProps['settings']) => void
  className?: string
}

export function UserSettings({
  user,
  settings,
  onSave,
  className,
}: UserSettingsProps) {
  const [currentSettings, setCurrentSettings] = React.useState(settings)

  const handleSave = () => {
    onSave?.(currentSettings)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="settings-3-line" className="h-5 w-5" />
          Account Settings
        </CardTitle>
        <CardDescription>
          Manage your account preferences and privacy settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <BodySmall className="text-muted-foreground">
                    Receive notifications via email
                  </BodySmall>
                </div>
                <Switch
                  id="email-notifications"
                  checked={currentSettings.notifications.email}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      notifications: { ...currentSettings.notifications, email: checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <BodySmall className="text-muted-foreground">
                    Receive push notifications in browser
                  </BodySmall>
                </div>
                <Switch
                  id="push-notifications"
                  checked={currentSettings.notifications.push}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      notifications: { ...currentSettings.notifications, push: checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <BodySmall className="text-muted-foreground">
                    Receive notifications via SMS
                  </BodySmall>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={currentSettings.notifications.sms}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      notifications: { ...currentSettings.notifications, sms: checked }
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Profile Visibility</Label>
                <RadioGroup
                  value={currentSettings.privacy.profileVisibility}
                  onValueChange={(value: "public" | "private" | "team") =>
                    setCurrentSettings({
                      ...currentSettings,
                      privacy: { ...currentSettings.privacy, profileVisibility: value }
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public - Anyone can see your profile</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team - Only team members can see</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private - Only you can see</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-email"
                  checked={currentSettings.privacy.showEmail}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      privacy: { ...currentSettings.privacy, showEmail: checked as boolean }
                    })
                  }
                />
                <Label htmlFor="show-email">Show email address on profile</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-location"
                  checked={currentSettings.privacy.showLocation}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      privacy: { ...currentSettings.privacy, showLocation: checked as boolean }
                    })
                  }
                />
                <Label htmlFor="show-location">Show location on profile</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Theme</Label>
                <RadioGroup
                  value={currentSettings.preferences.theme}
                  onValueChange={(value: "light" | "dark" | "system") =>
                    setCurrentSettings({
                      ...currentSettings,
                      preferences: { ...currentSettings.preferences, theme: value }
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="language" className="mb-3 block">Language</Label>
                <select
                  id="language"
                  value={currentSettings.preferences.language}
                  onChange={(e) =>
                    setCurrentSettings({
                      ...currentSettings,
                      preferences: { ...currentSettings.preferences, language: e.target.value }
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone" className="mb-3 block">Timezone</Label>
                <select
                  id="timezone"
                  value={currentSettings.preferences.timezone}
                  onChange={(e) =>
                    setCurrentSettings({
                      ...currentSettings,
                      preferences: { ...currentSettings.preferences, timezone: e.target.value }
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>
            <Icon name="save-line" className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Team Member Card Component
interface TeamMemberProps {
  member: {
    id: string
    name: string
    role: string
    avatar?: string
    status: "online" | "offline" | "away"
    department: string
    skills: string[]
    lastActive: string
  }
  onViewProfile?: (memberId: string) => void
  onMessage?: (memberId: string) => void
  className?: string
}

export function TeamMember({
  member,
  onViewProfile,
  onMessage,
  className,
}: TeamMemberProps) {
  const statusConfig = {
    online: { color: "bg-green-500", label: "Online" },
    offline: { color: "bg-gray-500", label: "Offline" },
    away: { color: "bg-yellow-500", label: "Away" },
  }

  const config = statusConfig[member.status]

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white", config.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <H4 className="font-medium truncate">{member.name}</H4>
            <BodySmall className="text-muted-foreground">{member.role}</BodySmall>
            <BodySmall className="text-muted-foreground">{member.department}</BodySmall>
          </div>
          <div className="flex flex-col gap-1">
            {onViewProfile && (
              <Button size="sm" variant="ghost" onClick={() => onViewProfile(member.id)}>
                <Icon name="user-line" className="h-4 w-4" />
              </Button>
            )}
            {onMessage && (
              <Button size="sm" variant="ghost" onClick={() => onMessage(member.id)}>
                <Icon name="message-2-line" className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {member.skills.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{member.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-2 flex items-center justify-between">
          <BodySmall className="text-muted-foreground">{config.label}</BodySmall>
          <BodySmall className="text-muted-foreground text-xs">
            Last active {member.lastActive}
          </BodySmall>
        </div>
      </CardContent>
    </Card>
  )
}

// Team Management Component
interface TeamManagementProps {
  team: Array<{
    id: string
    name: string
    role: string
    avatar?: string
    status: "online" | "offline" | "away"
    department: string
    skills: string[]
    lastActive: string
  }>
  onViewProfile?: (memberId: string) => void
  onMessage?: (memberId: string) => void
  onInvite?: () => void
  className?: string
}

export function TeamManagement({
  team,
  onViewProfile,
  onMessage,
  onInvite,
  className,
}: TeamManagementProps) {
  const onlineCount = team.filter(member => member.status === "online").length

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="team-line" className="h-5 w-5" />
              Team Members
            </CardTitle>
            <CardDescription>
              {team.length} members • {onlineCount} online
            </CardDescription>
          </div>
          {onInvite && (
            <Button size="sm" onClick={onInvite}>
              <Icon name="user-add-line" className="h-4 w-4 mr-1" />
              Invite Member
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
              onViewProfile={onViewProfile}
              onMessage={onMessage}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// User Invite Form Component
interface UserInviteFormProps {
  onSubmit: (data: {
    email: string
    name: string
    role: string
    department: string
    message: string
  }) => void
  isLoading?: boolean
  className?: string
}

export function UserInviteForm({
  onSubmit,
  isLoading = false,
  className,
}: UserInviteFormProps) {
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    role: "",
    department: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="user-add-line" className="h-5 w-5" />
          Invite Team Member
        </CardTitle>
        <CardDescription>
          Send an invitation to join your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invite-name">Full Name</Label>
              <Input
                id="invite-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invite-role">Role</Label>
              <select
                id="invite-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div>
              <Label htmlFor="invite-department">Department</Label>
              <Input
                id="invite-department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="invite-message">Personal Message (Optional)</Label>
            <Textarea
              id="invite-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Add a personal message to your invitation..."
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="loader-4-line" className="h-4 w-4 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Icon name="send-plane-line" className="h-4 w-4 mr-1" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
