"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const lineIcons = [
    "home-line", "search-line", "settings-3-line", "user-line", "mail-line", "notification-line", "add-line", "star-line",
    "heart-line", "download-line", "upload-line", "edit-line", "delete-bin-line", "file-copy-line", "share-line", "link",
    "calendar-line", "lock-line", "eye-line", "eye-off-line", "sun-line", "moon-line", "computer-line", "menu-line",
    "arrow-left-line", "arrow-right-line", "arrow-up-line", "arrow-down-line", "arrow-down-s-line", "arrow-up-s-line", "arrow-left-s-line", "arrow-right-s-line",
    "close-line", "check-line", "more-line", "more-2-line", "refresh-line", "external-link-line", "folder-line", "folder-open-line",
    "file-line", "file-text-line", "file-pdf-line", "file-word-line", "file-excel-line", "file-image-line", "file-video-line", "file-music-line",
    "image-line", "camera-line", "video-line", "music-line", "play-line", "pause-line", "stop-line", "skip-forward-line",
    "skip-back-line", "volume-up-line", "volume-down-line", "volume-mute-line", "headphone-line", "mic-line", "mic-off-line", "speaker-line",
    "phone-line", "smartphone-line", "tablet-line", "tv-line", "device-line", "wifi-line", "wifi-off-line", "signal-wifi-line",
    "bluetooth-line", "battery-line", "battery-low-line", "battery-charge-line", "plug-line", "flashlight-line", "bookmark-line", "bookmark-3-line",
    "flag-line", "flag-2-line", "pin-distance-line", "map-pin-line", "map-line", "road-map-line", "compass-line", "navigation-line",
    "guide-line", "global-line", "earth-line", "planet-line", "rocket-line", "spacecraft-line", "car-line", "bus-line",
    "truck-line", "train-line", "subway-line", "ship-line", "plane-line", "taxi-line", "bicycle-line", "motorbike-line",
    "walk-line", "run-line", "football-line", "basketball-line", "ping-pong-line", "billiards-line", "trophy-line", "medal-line",
    "award-line", "gift-line", "cake-line", "restaurant-line", "knife-line", "cup-line", "wine-glass-line", "beer-line",
    "coffee-line", "tea-line", "pizza-line", "hamburger-line", "bread-line", "apple-line", "leaf-line", "plant-line",
    "tree-line", "flower-line", "seedling-line", "cactus-line", "palm-tree-line", "cherry-blossom-line", "sun-cloudy-line", "cloudy-line",
    "rainy-line", "snowy-line", "thunderstorms-line", "tornado-line", "typhoon-line", "mist-line", "fire-line", "water-line",
    "drop-line", "lightbulb-line", "lightbulb-flash-line", "contrast-line", "contrast-2-line", "palette-line", "brush-line", "paint-brush-line",
    "pencil-line", "pencil-ruler-line", "ruler-line", "scissors-line", "eraser-line", "paint-line", "artboard-line", "layout-line",
    "layout-2-line", "layout-3-line", "layout-4-line", "layout-5-line", "layout-6-line", "grid-line", "dashboard-line", "stack-line",
    "inbox-line", "archive-line", "folder-received-line", "folder-transfer-line", "folder-download-line", "folder-upload-line", "folder-zip-line", "folder-settings-line",
    "folder-shield-line", "folder-lock-line", "folder-user-line", "folder-shared-line", "folders-line", "save-line", "save-2-line", "save-3-line",
    "hard-drive-line", "hard-drive-2-line", "database-line", "database-2-line", "server-line", "cloud-line", "cloud-off-line", "install-line",
    "uninstall-line", "download-cloud-line", "upload-cloud-line", "download-2-line", "upload-2-line", "terminal-line", "terminal-box-line", "code-line",
    "code-s-line", "code-s-slash-line", "brackets-line", "parentheses-line", "function-line", "variable-line", "bug-line", "bug-2-line",
    "shield-line", "shield-check-line", "shield-cross-line", "shield-flash-line", "shield-keyhole-line", "key-line", "key-2-line", "login-box-line",
    "logout-box-line", "login-circle-line", "logout-circle-line", "account-box-line", "account-circle-line", "team-line", "group-line", "user-add-line",
    "user-follow-line", "user-unfollow-line", "user-settings-line", "user-star-line", "user-heart-line", "admin-line", "vip-line", "customer-service-line",
    "service-line", "question-line", "question-answer-line", "questionnaire-line", "feedback-line", "chat-1-line", "chat-2-line", "chat-3-line",
    "chat-4-line", "message-line", "message-2-line", "message-3-line", "discuss-line", "speak-line", "translate-line", "translate-2-line",
    "voice-recognition-line", "record-circle-line", "timer-line", "timer-2-line", "time-line", "history-line", "alarm-line", "alarm-warning-line",
    "countdown-line", "hourglass-line", "hourglass-2-line", "calendar-2-line", "calendar-event-line", "calendar-todo-line", "calendar-check-line", "todo-line",
    "list-check-line", "task-line", "clipboard-line", "article-line", "newspaper-line", "book-line", "book-open-line", "book-2-line"
  ]

  const fillIcons = [
    "home-fill", "search-fill", "settings-3-fill", "user-fill", "mail-fill", "notification-fill", "add-fill", "star-fill",
    "heart-fill", "download-fill", "upload-fill", "edit-fill", "delete-bin-fill", "file-copy-fill", "share-fill", "link",
    "calendar-fill", "lock-fill", "eye-fill", "eye-off-fill", "sun-fill", "moon-fill", "computer-fill", "menu-fill",
    "arrow-left-fill", "arrow-right-fill", "arrow-up-fill", "arrow-down-fill", "arrow-down-s-fill", "arrow-up-s-fill", "arrow-left-s-fill", "arrow-right-s-fill",
    "close-fill", "check-fill", "more-fill", "more-2-fill", "refresh-fill", "external-link-fill", "folder-fill", "folder-open-fill",
    "file-fill", "file-text-fill", "file-pdf-fill", "file-word-fill", "file-excel-fill", "file-image-fill", "file-video-fill", "file-music-fill",
    "image-fill", "camera-fill", "video-fill", "music-fill", "play-fill", "pause-fill", "stop-fill", "skip-forward-fill",
    "skip-back-fill", "volume-up-fill", "volume-down-fill", "volume-mute-fill", "headphone-fill", "mic-fill", "mic-off-fill", "speaker-fill",
    "phone-fill", "smartphone-fill", "tablet-fill", "tv-fill", "device-fill", "wifi-fill", "wifi-off-fill", "signal-wifi-fill",
    "bluetooth-fill", "battery-fill", "battery-low-fill", "battery-charge-fill", "plug-fill", "flashlight-fill", "bookmark-fill", "bookmark-3-fill",
    "flag-fill", "flag-2-fill", "pin-distance-fill", "map-pin-fill", "map-fill", "road-map-fill", "compass-fill", "navigation-fill",
    "guide-fill", "global-fill", "earth-fill", "planet-fill", "rocket-fill", "spacecraft-fill", "car-fill", "bus-fill",
    "truck-fill", "train-fill", "subway-fill", "ship-fill", "plane-fill", "taxi-fill", "bicycle-fill", "motorbike-fill",
    "walk-fill", "run-fill", "football-fill", "basketball-fill", "ping-pong-fill", "billiards-fill", "trophy-fill", "medal-fill",
    "award-fill", "gift-fill", "cake-fill", "restaurant-fill", "knife-fill", "cup-fill", "wine-glass-fill", "beer-fill",
    "coffee-fill", "tea-fill", "pizza-fill", "hamburger-fill", "bread-fill", "apple-fill", "leaf-fill", "plant-fill",
    "tree-fill", "flower-fill", "seedling-fill", "cactus-fill", "palm-tree-fill", "cherry-blossom-fill", "sun-cloudy-fill", "cloudy-fill",
    "rainy-fill", "snowy-fill", "thunderstorms-fill", "tornado-fill", "typhoon-fill", "mist-fill", "fire-fill", "water-fill",
    "drop-fill", "lightbulb-fill", "lightbulb-flash-fill", "contrast-fill", "contrast-2-fill", "palette-fill", "brush-fill", "paint-brush-fill",
    "pencil-fill", "pencil-ruler-fill", "ruler-fill", "scissors-fill", "eraser-fill", "paint-fill", "artboard-fill", "layout-fill",
    "layout-2-fill", "layout-3-fill", "layout-4-fill", "layout-5-fill", "layout-6-fill", "grid-fill", "dashboard-fill", "stack-fill",
    "inbox-fill", "archive-fill", "folder-received-fill", "folder-transfer-fill", "folder-download-fill", "folder-upload-fill", "folder-zip-fill", "folder-settings-fill",
    "folder-shield-fill", "folder-lock-fill", "folder-user-fill", "folder-shared-fill", "folders-fill", "save-fill", "save-2-fill", "save-3-fill",
    "hard-drive-fill", "hard-drive-2-fill", "database-fill", "database-2-fill", "server-fill", "cloud-fill", "cloud-off-fill", "install-fill",
    "uninstall-fill", "download-cloud-fill", "upload-cloud-fill", "download-2-fill", "upload-2-fill", "terminal-fill", "terminal-box-fill", "code-fill",
    "code-s-fill", "code-s-slash-fill", "brackets-fill", "parentheses-fill", "function-fill", "variable-fill", "bug-fill", "bug-2-fill",
    "shield-fill", "shield-check-fill", "shield-cross-fill", "shield-flash-fill", "shield-keyhole-fill", "key-fill", "key-2-fill", "login-box-fill",
    "logout-box-fill", "login-circle-fill", "logout-circle-fill", "account-box-fill", "account-circle-fill", "team-fill", "group-fill", "user-add-fill",
    "user-follow-fill", "user-unfollow-fill", "user-settings-fill", "user-star-fill", "user-heart-fill", "admin-fill", "vip-fill", "customer-service-fill",
    "service-fill", "question-fill", "question-answer-fill", "questionnaire-fill", "feedback-fill", "chat-1-fill", "chat-2-fill", "chat-3-fill",
    "chat-4-fill", "message-fill", "message-2-fill", "message-3-fill", "discuss-fill", "speak-fill", "translate-fill", "translate-2-fill",
    "voice-recognition-fill", "record-circle-fill", "timer-fill", "timer-2-fill", "time-fill", "history-fill", "alarm-fill", "alarm-warning-fill",
    "countdown-fill", "hourglass-fill", "hourglass-2-fill", "calendar-2-fill", "calendar-event-fill", "calendar-todo-fill", "calendar-check-fill", "todo-fill",
    "list-check-fill", "task-fill", "clipboard-fill", "article-fill", "newspaper-fill", "book-fill", "book-open-fill", "book-2-fill"
  ]

  const filteredLineIcons = lineIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.replace(/-line$/, '').replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFillIcons = fillIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.replace(/-fill$/, '').replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
    >
      <Container>
        <Section paddingY="xl">
          <PageHeader
            title="Icon System"
            description="Consistent icon usage and available icon sets."
            size="lg"
            centered
          />
          
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Icon name="search-line" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size="sm" />
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Section>
        
        <Grid cols={1} gap={6}>
          <Card>
            <CardHeader>
              <CardTitle>Remix Icons - Line Style ({filteredLineIcons.length} icons)</CardTitle>
              <CardDescription>Comprehensive collection of the most commonly used Remix Icons in line style</CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={8} gap={2}>
                {filteredLineIcons.map((name) => (
                  <div key={name} className="flex flex-col items-center space-y-1 p-2 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Icon name={name} size="lg" />
                    <span className="text-xs text-muted-foreground text-center leading-tight">{name.replace(/-line$/, '').replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remix Icons - Fill Style ({filteredFillIcons.length} icons)</CardTitle>
              <CardDescription>The same icons in fill (solid) style</CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={8} gap={2}>
                {filteredFillIcons.map((name) => (
                  <div key={name} className="flex flex-col items-center space-y-1 p-2 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Icon name={name} size="lg" />
                    <span className="text-xs text-muted-foreground text-center leading-tight">{name.replace(/-fill$/, '').replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icon Sizes</CardTitle>
              <CardDescription>Available icon sizes using the Icon component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-8">
                {[
                  { size: "xs", label: "Extra Small" },
                  { size: "sm", label: "Small" },
                  { size: "md", label: "Medium" },
                  { size: "lg", label: "Large" },
                  { size: "xl", label: "Extra Large" },
                  { size: "2xl", label: "2XL" },
                ].map(({ size, label }) => (
                  <div key={size} className="flex flex-col items-center space-y-2">
                    <Icon name="star-line" size={size as "xs" | "sm" | "md" | "lg" | "xl" | "2xl"} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>How to use the Icon component in your code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Basic Usage</h4>
                  <code className="text-sm">
                    {`<Icon name="home-line" />`}
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">With Size</h4>
                  <code className="text-sm">
                    {`<Icon name="star-fill" size="xl" />`}
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">With Custom Classes</h4>
                  <code className="text-sm">
                    {`<Icon name="heart-line" className="text-red-500" />`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </AppShell>
    </PageWrapper>
  )
}
