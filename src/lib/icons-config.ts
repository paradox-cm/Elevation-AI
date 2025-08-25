// Icons Configuration - Single Source of Truth
// This file defines all icon system settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface IconItem {
  name: string
  category: string
  description: string
  usage: string[]
  tags: string[]
  style: 'line' | 'fill'
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface IconCategory {
  name: string
  description: string
  icons: string[]
  examples: string[]
  bestPractices: string[]
}

export interface IconSize {
  name: string
  value: string
  description: string
  usage: string[]
  pixelSize: number
}

export interface IconStyle {
  name: string
  suffix: string
  description: string
  usage: string[]
  examples: string[]
}

export interface IconFoundation {
  baseSize: string
  description: string
  principles: {
    consistency: string
    clarity: string
    accessibility: string
    scalability: string
  }
}

// Icon Categories Configuration
export const iconCategories: IconCategory[] = [
  {
    name: "Navigation",
    description: "Icons for navigation and wayfinding",
    icons: ["home-line", "search-line", "menu-line", "arrow-left-line", "arrow-right-line", "arrow-up-line", "arrow-down-line", "close-line", "more-line"],
    examples: ["Main navigation", "Breadcrumbs", "Pagination", "Back buttons"],
    bestPractices: ["Use consistent arrow directions", "Ensure sufficient touch targets", "Provide text labels for screen readers"]
  },
  {
    name: "Actions",
    description: "Icons for user actions and interactions",
    icons: ["add-line", "edit-line", "delete-bin-line", "save-line", "download-line", "upload-line", "share-line", "refresh-line"],
    examples: ["Form actions", "File operations", "Content management", "Data manipulation"],
    bestPractices: ["Use clear, recognizable symbols", "Provide hover states", "Include confirmation for destructive actions"]
  },
  {
    name: "Communication",
    description: "Icons for messaging and communication features",
    icons: ["mail-line", "message-line", "chat-1-line", "notification-line", "phone-line", "video-line", "mic-line"],
    examples: ["Email interfaces", "Chat applications", "Notification systems", "Contact features"],
    bestPractices: ["Use consistent notification indicators", "Provide unread state indicators", "Include accessibility labels"]
  },
  {
    name: "Files & Media",
    description: "Icons for file types and media content",
    icons: ["file-line", "file-text-line", "file-pdf-line", "file-image-line", "file-video-line", "file-music-line", "image-line", "camera-line"],
    examples: ["File browsers", "Media galleries", "Document viewers", "Upload interfaces"],
    bestPractices: ["Use standard file type associations", "Provide file size indicators", "Include preview capabilities"]
  },
  {
    name: "Settings & Preferences",
    description: "Icons for settings and configuration",
    icons: ["settings-3-line", "user-line", "lock-line", "shield-line", "key-line", "wifi-line", "bluetooth-line"],
    examples: ["User profiles", "Security settings", "Device configuration", "Privacy controls"],
    bestPractices: ["Group related settings together", "Use consistent security indicators", "Provide clear feedback"]
  },
  {
    name: "Status & Feedback",
    description: "Icons for status indicators and feedback",
    icons: ["check-line", "close-line", "star-line", "heart-line", "eye-line", "eye-off-line", "battery-line", "signal-wifi-line"],
    examples: ["Success/error states", "Favorites and likes", "Visibility toggles", "System status"],
    bestPractices: ["Use color to reinforce meaning", "Provide clear status messages", "Include loading states"]
  }
]

// Icon Sizes Configuration
export const iconSizes: IconSize[] = [
  {
    name: "Extra Small",
    value: "xs",
    description: "Very small icons for tight spaces",
    usage: ["Inline text", "Dense interfaces", "Status indicators"],
    pixelSize: 12
  },
  {
    name: "Small",
    value: "sm",
    description: "Small icons for compact layouts",
    usage: ["Secondary actions", "Form fields", "List items"],
    pixelSize: 16
  },
  {
    name: "Medium",
    value: "md",
    description: "Standard icon size for most use cases",
    usage: ["Primary actions", "Navigation", "Content areas"],
    pixelSize: 20
  },
  {
    name: "Large",
    value: "lg",
    description: "Large icons for emphasis and visibility",
    usage: ["Hero sections", "Important actions", "Feature highlights"],
    pixelSize: 24
  },
  {
    name: "Extra Large",
    value: "xl",
    description: "Very large icons for maximum visibility",
    usage: ["Empty states", "Illustrations", "Marketing content"],
    pixelSize: 32
  },
  {
    name: "2XL",
    value: "2xl",
    description: "Extra large icons for special cases",
    usage: ["Decorative elements", "Large displays", "Print materials"],
    pixelSize: 48
  }
]

// Icon Styles Configuration
export const iconStyles: IconStyle[] = [
  {
    name: "Line",
    suffix: "-line",
    description: "Outlined icons with stroke-based design",
    usage: ["Primary interfaces", "Light themes", "Subtle actions"],
    examples: ["home-line", "search-line", "settings-3-line", "user-line"]
  },
  {
    name: "Fill",
    suffix: "-fill",
    description: "Solid icons with filled design",
    usage: ["Emphasis", "Dark themes", "Active states"],
    examples: ["home-fill", "search-fill", "settings-3-fill", "user-fill"]
  }
]

// Complete Icon Lists
export const lineIcons: string[] = [
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

export const fillIcons: string[] = [
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

// Icon System Foundation
export const iconFoundation: IconFoundation = {
  baseSize: "md",
  description: "A comprehensive icon system using Remix Icons with consistent sizing, styling, and accessibility features.",
  principles: {
    consistency: "Use consistent icon styles and sizes throughout the interface",
    clarity: "Choose icons that clearly communicate their meaning",
    accessibility: "Provide proper labels and descriptions for screen readers",
    scalability: "Ensure icons remain clear at all sizes and resolutions"
  }
}

// Usage Guidelines
export const usageGuidelines = {
  do: [
    "Use consistent icon styles (line vs fill) for similar functions",
    "Provide text labels for important actions and navigation",
    "Use appropriate icon sizes for their context and importance",
    "Include proper accessibility attributes for screen readers",
    "Test icon visibility and clarity across different backgrounds",
    "Use icons to enhance, not replace, text content"
  ],
  dont: [
    "Don't use icons without proper accessibility labels",
    "Don't mix line and fill styles inconsistently",
    "Don't use icons that are too small to be clearly visible",
    "Don't rely solely on icons for critical navigation or actions",
    "Don't use icons that may be culturally inappropriate or confusing",
    "Don't use icons that don't match the overall design language"
  ]
}

// Implementation Examples
export const implementationExamples = {
  basicUsage: {
    title: "Basic Icon Usage",
    description: "Simple icon implementation with default settings",
    code: `<Icon name="home-line" />`
  },
  withSize: {
    title: "Icon with Size",
    description: "Icon with specific size for emphasis",
    code: `<Icon name="star-fill" size="xl" />`
  },
  withCustomClasses: {
    title: "Icon with Custom Classes",
    description: "Icon with custom styling classes",
    code: `<Icon name="heart-line" className="text-red-500" />`
  },
  withAccessibility: {
    title: "Icon with Accessibility",
    description: "Icon with proper accessibility attributes",
    code: `<Icon name="search-line" aria-label="Search" role="img" />`
  },
  inButton: {
    title: "Icon in Button",
    description: "Icon used within a button component",
    code: `<Button>
  <Icon name="download-line" className="mr-2" />
  Download
</Button>`
  }
}

// Helper functions
export function getIconByName(name: string): IconItem | undefined {
  const allIcons = [...lineIcons, ...fillIcons]
  if (!allIcons.includes(name)) return undefined
  
  const style = name.includes('-line') ? 'line' : 'fill'
  const baseName = name.replace(/-line$/, '').replace(/-fill$/, '')
  
  return {
    name,
    category: getIconCategory(baseName),
    description: `Icon for ${baseName.replace(/-/g, ' ')}`,
    usage: getIconUsage(baseName),
    tags: [baseName, style],
    style: style as 'line' | 'fill',
    size: 'md'
  }
}

export function getIconsByCategory(category: string): string[] {
  const categoryData = iconCategories.find(cat => cat.name.toLowerCase() === category.toLowerCase())
  return categoryData ? categoryData.icons : []
}

export function getIconsByStyle(style: 'line' | 'fill'): string[] {
  return style === 'line' ? lineIcons : fillIcons
}

export function getIconSizeByName(name: string): IconSize | undefined {
  return iconSizes.find(size => size.value === name)
}

export function getIconStyleByName(name: string): IconStyle | undefined {
  return iconStyles.find(style => style.suffix === `-${name}`)
}

export function searchIcons(query: string): string[] {
  const allIcons = [...lineIcons, ...fillIcons]
  const lowercaseQuery = query.toLowerCase()
  
  return allIcons.filter(icon => 
    icon.toLowerCase().includes(lowercaseQuery) ||
    icon.replace(/-line$/, '').replace(/-fill$/, '').replace(/-/g, ' ').toLowerCase().includes(lowercaseQuery)
  )
}

// Helper functions for internal use
function getIconCategory(baseName: string): string {
  // This would be a more sophisticated mapping in a real implementation
  const categoryMappings: Record<string, string> = {
    'home': 'Navigation',
    'search': 'Navigation',
    'settings': 'Settings & Preferences',
    'user': 'Settings & Preferences',
    'mail': 'Communication',
    'notification': 'Communication',
    'add': 'Actions',
    'star': 'Status & Feedback',
    'heart': 'Status & Feedback',
    'download': 'Actions',
    'upload': 'Actions',
    'edit': 'Actions',
    'delete': 'Actions',
    'file': 'Files & Media',
    'image': 'Files & Media',
    'video': 'Files & Media',
    'music': 'Files & Media',
    'phone': 'Communication',
    'chat': 'Communication',
    'message': 'Communication',
    'lock': 'Settings & Preferences',
    'shield': 'Settings & Preferences',
    'wifi': 'Settings & Preferences',
    'battery': 'Status & Feedback',
    'calendar': 'Actions',
    'check': 'Status & Feedback',
    'close': 'Status & Feedback',
    'arrow': 'Navigation',
    'folder': 'Files & Media',
    'save': 'Actions',
    'cloud': 'Files & Media',
    'code': 'Files & Media',
    'key': 'Settings & Preferences',
    'team': 'Communication',
    'question': 'Communication',
    'timer': 'Actions',
    'book': 'Files & Media'
  }
  
  for (const [key, category] of Object.entries(categoryMappings)) {
    if (baseName.includes(key)) {
      return category
    }
  }
  
  return 'General'
}

function getIconUsage(baseName: string): string[] {
  // This would be a more sophisticated mapping in a real implementation
  const usageMappings: Record<string, string[]> = {
    'home': ['Main navigation', 'Dashboard', 'Landing page'],
    'search': ['Search functionality', 'Filter interfaces', 'Discovery features'],
    'settings': ['Configuration pages', 'User preferences', 'System settings'],
    'user': ['User profiles', 'Account management', 'Authentication'],
    'mail': ['Email interfaces', 'Communication features', 'Notifications'],
    'notification': ['Alert systems', 'Status updates', 'User feedback'],
    'add': ['Create new items', 'Form submissions', 'Content creation'],
    'star': ['Favorites', 'Ratings', 'Bookmarks'],
    'heart': ['Likes', 'Favorites', 'Emotional responses'],
    'download': ['File downloads', 'Export features', 'Data retrieval'],
    'upload': ['File uploads', 'Import features', 'Data submission'],
    'edit': ['Content editing', 'Form modifications', 'Data updates'],
    'delete': ['Remove items', 'Data cleanup', 'Content removal'],
    'file': ['File management', 'Document handling', 'Content organization'],
    'image': ['Media galleries', 'Photo uploads', 'Visual content'],
    'video': ['Video players', 'Media content', 'Streaming features'],
    'music': ['Audio players', 'Music libraries', 'Sound content'],
    'phone': ['Contact features', 'Communication', 'Call interfaces'],
    'chat': ['Messaging systems', 'Conversations', 'Real-time communication'],
    'message': ['Text communication', 'Notifications', 'Feedback systems'],
    'lock': ['Security features', 'Privacy controls', 'Authentication'],
    'shield': ['Security indicators', 'Protection features', 'Safety controls'],
    'wifi': ['Network status', 'Connectivity', 'Device settings'],
    'battery': ['Power status', 'Device health', 'System monitoring'],
    'calendar': ['Date selection', 'Event management', 'Scheduling'],
    'check': ['Success states', 'Confirmation', 'Completion'],
    'close': ['Dismiss actions', 'Cancel operations', 'Exit features'],
    'arrow': ['Navigation', 'Direction indicators', 'Movement controls'],
    'folder': ['File organization', 'Content management', 'Storage systems'],
    'save': ['Data persistence', 'Content storage', 'Backup features'],
    'cloud': ['Cloud storage', 'Remote data', 'Sync features'],
    'code': ['Development tools', 'Technical features', 'Programming interfaces'],
    'key': ['Security access', 'Authentication', 'Permission management'],
    'team': ['Collaboration', 'Group features', 'Social interactions'],
    'question': ['Help systems', 'Support features', 'Information access'],
    'timer': ['Time tracking', 'Scheduling', 'Productivity features'],
    'book': ['Documentation', 'Learning resources', 'Content libraries']
  }
  
  for (const [key, usage] of Object.entries(usageMappings)) {
    if (baseName.includes(key)) {
      return usage
    }
  }
  
  return ['General interface', 'User interaction', 'Content display']
}
