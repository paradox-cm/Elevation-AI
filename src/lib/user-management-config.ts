// User Management Configuration
// Defines all user management components, profiles, team management, settings, roles, and permissions

export interface UserProfileConfig {
  type: "basic" | "detailed" | "compact" | "card" | "list"
  name: string
  description: string
  display: "avatar" | "name" | "email" | "role" | "status" | "department" | "location" | "bio" | "joinDate"
  avatar: {
    size: "sm" | "md" | "lg" | "xl"
    shape: "circle" | "square" | "rounded"
    fallback: boolean
  }
  actions: {
    edit: boolean
    view: boolean
    message: boolean
    delete: boolean
  }
  status: {
    enabled: boolean
    types: "online" | "offline" | "away" | "busy" | "dnd"
    indicator: "dot" | "ring" | "badge"
  }
  layout: "horizontal" | "vertical" | "grid"
}

export interface UserSettingsConfig {
  type: "notifications" | "privacy" | "preferences" | "security" | "billing"
  name: string
  description: string
  sections: string[]
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    inApp: boolean
    frequency: "immediate" | "daily" | "weekly"
  }
  privacy: {
    profileVisibility: "public" | "private" | "team" | "custom"
    showEmail: boolean
    showLocation: boolean
    showStatus: boolean
    allowMessages: boolean
  }
  preferences: {
    theme: "light" | "dark" | "system"
    language: string
    timezone: string
    dateFormat: string
    timeFormat: "12h" | "24h"
  }
  security: {
    twoFactor: boolean
    sessionTimeout: number
    passwordExpiry: number
    loginNotifications: boolean
  }
}

export interface TeamManagementConfig {
  type: "grid" | "list" | "table" | "cards"
  name: string
  description: string
  display: "avatar" | "name" | "role" | "department" | "status" | "skills" | "lastActive"
  actions: {
    view: boolean
    message: boolean
    edit: boolean
    remove: boolean
  }
  filters: {
    department: boolean
    role: boolean
    status: boolean
    skills: boolean
  }
  search: {
    enabled: boolean
    fields: string[]
    placeholder: string
  }
  pagination: {
    enabled: boolean
    pageSize: number
    showTotal: boolean
  }
  sorting: {
    enabled: boolean
    default: string
    options: string[]
  }
}

export interface UserRoleConfig {
  type: "admin" | "manager" | "member" | "viewer" | "guest" | "custom"
  name: string
  description: string
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    admin: boolean
    invite: boolean
    manageUsers: boolean
    manageRoles: boolean
    viewAnalytics: boolean
  }
  scope: "global" | "department" | "project" | "team"
  color: string
  icon: string
  level: number
  restrictions: string[]
  features: string[]
}

export interface UserInviteConfig {
  type: "email" | "link" | "bulk" | "custom"
  name: string
  description: string
  fields: {
    email: boolean
    name: boolean
    role: boolean
    department: boolean
    message: boolean
    customFields: string[]
  }
  validation: {
    emailRequired: boolean
    nameRequired: boolean
    roleRequired: boolean
    emailFormat: string
  }
  options: {
    sendWelcomeEmail: boolean
    requireAcceptance: boolean
    setPassword: boolean
    autoActivate: boolean
  }
  templates: {
    welcomeEmail: string
    invitationEmail: string
    reminderEmail: string
  }
  expiration: {
    enabled: boolean
    days: number
    reminderDays: number[]
  }
}

export interface UserPermissionsConfig {
  type: "role-based" | "permission-based" | "attribute-based" | "hybrid"
  name: string
  description: string
  model: "RBAC" | "ABAC" | "PBAC" | "Custom"
  permissions: {
    users: {
      view: string[]
      create: string[]
      edit: string[]
      delete: string[]
    }
    teams: {
      view: string[]
      create: string[]
      edit: string[]
      delete: string[]
    }
    roles: {
      view: string[]
      create: string[]
      edit: string[]
      delete: string[]
    }
    settings: {
      view: string[]
      edit: string[]
    }
  }
  inheritance: {
    enabled: boolean
    type: "hierarchical" | "flat" | "custom"
  }
  audit: {
    enabled: boolean
    logChanges: boolean
    retention: number
  }
}

export interface UserAdminConfig {
  type: "dashboard" | "users" | "roles" | "permissions" | "audit" | "reports"
  name: string
  description: string
  features: {
    userManagement: boolean
    roleManagement: boolean
    permissionManagement: boolean
    auditLogs: boolean
    reports: boolean
    bulkActions: boolean
  }
  actions: {
    createUser: boolean
    editUser: boolean
    deleteUser: boolean
    assignRole: boolean
    revokeRole: boolean
    bulkImport: boolean
    bulkExport: boolean
  }
  views: {
    list: boolean
    grid: boolean
    table: boolean
    details: boolean
  }
  filters: {
    status: boolean
    role: boolean
    department: boolean
    dateRange: boolean
    custom: boolean
  }
  exports: {
    csv: boolean
    excel: boolean
    pdf: boolean
    json: boolean
  }
}

export interface UserManagementConfig {
  profiles: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    displays: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: UserProfileConfig
  }
  settings: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    sections: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: UserSettingsConfig
  }
  teamManagement: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    actions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: TeamManagementConfig
  }
  roles: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    permissions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: UserRoleConfig
  }
  invites: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    fields: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: UserInviteConfig
  }
  permissions: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    models: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: UserPermissionsConfig
  }
  admin: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    features: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: UserAdminConfig
  }
}

export const userManagementConfig: UserManagementConfig = {
  profiles: {
    types: [
      {
        id: "basic",
        name: "Basic Profile",
        description: "Simple user profile with essential information",
        type: "basic",
        className: "profile-basic"
      },
      {
        id: "detailed",
        name: "Detailed Profile",
        description: "Comprehensive user profile with full information",
        type: "detailed",
        className: "profile-detailed"
      },
      {
        id: "compact",
        name: "Compact Profile",
        description: "Condensed profile for space-constrained layouts",
        type: "compact",
        className: "profile-compact"
      },
      {
        id: "card",
        name: "Card Profile",
        description: "Card-based profile layout",
        type: "card",
        className: "profile-card"
      },
      {
        id: "list",
        name: "List Profile",
        description: "List-based profile layout",
        type: "list",
        className: "profile-list"
      }
    ],
    displays: [
      {
        id: "avatar",
        name: "Avatar",
        description: "User avatar image",
        className: "display-avatar"
      },
      {
        id: "name",
        name: "Name",
        description: "User full name",
        className: "display-name"
      },
      {
        id: "email",
        name: "Email",
        description: "User email address",
        className: "display-email"
      },
      {
        id: "role",
        name: "Role",
        description: "User job role or title",
        className: "display-role"
      },
      {
        id: "status",
        name: "Status",
        description: "User online/offline status",
        className: "display-status"
      },
      {
        id: "department",
        name: "Department",
        description: "User department or team",
        className: "display-department"
      },
      {
        id: "location",
        name: "Location",
        description: "User location or timezone",
        className: "display-location"
      },
      {
        id: "bio",
        name: "Bio",
        description: "User biography or description",
        className: "display-bio"
      },
      {
        id: "joinDate",
        name: "Join Date",
        description: "User join date",
        className: "display-join-date"
      }
    ],
    defaultConfig: {
      type: "basic",
      name: "User Profile",
      description: "Standard user profile display",
      display: "avatar",
      avatar: {
        size: "md",
        shape: "circle",
        fallback: true
      },
      actions: {
        edit: true,
        view: true,
        message: true,
        delete: false
      },
      status: {
        enabled: true,
        types: "online",
        indicator: "dot"
      },
      layout: "horizontal"
    }
  },
  settings: {
    types: [
      {
        id: "notifications",
        name: "Notifications",
        description: "Notification preferences and settings",
        type: "notifications",
        className: "settings-notifications"
      },
      {
        id: "privacy",
        name: "Privacy",
        description: "Privacy and visibility settings",
        type: "privacy",
        className: "settings-privacy"
      },
      {
        id: "preferences",
        name: "Preferences",
        description: "User preferences and customization",
        type: "preferences",
        className: "settings-preferences"
      },
      {
        id: "security",
        name: "Security",
        description: "Security and authentication settings",
        type: "security",
        className: "settings-security"
      },
      {
        id: "billing",
        name: "Billing",
        description: "Billing and subscription settings",
        type: "billing",
        className: "settings-billing"
      }
    ],
    sections: [
      {
        id: "account",
        name: "Account",
        description: "Account information and settings",
        className: "section-account"
      },
      {
        id: "profile",
        name: "Profile",
        description: "Profile information and settings",
        className: "section-profile"
      },
      {
        id: "security",
        name: "Security",
        description: "Security and privacy settings",
        className: "section-security"
      },
      {
        id: "notifications",
        name: "Notifications",
        description: "Notification preferences",
        className: "section-notifications"
      },
      {
        id: "preferences",
        name: "Preferences",
        description: "User preferences and customization",
        className: "section-preferences"
      }
    ],
    defaultConfig: {
      type: "notifications",
      name: "User Settings",
      description: "User account settings and preferences",
      sections: ["account", "profile", "security", "notifications", "preferences"],
      notifications: {
        email: true,
        push: true,
        sms: false,
        inApp: true,
        frequency: "immediate"
      },
      privacy: {
        profileVisibility: "team",
        showEmail: true,
        showLocation: true,
        showStatus: true,
        allowMessages: true
      },
      preferences: {
        theme: "system",
        language: "en",
        timezone: "UTC",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h"
      },
      security: {
        twoFactor: false,
        sessionTimeout: 30,
        passwordExpiry: 90,
        loginNotifications: true
      }
    }
  },
  teamManagement: {
    types: [
      {
        id: "grid",
        name: "Grid Layout",
        description: "Grid-based team member display",
        type: "grid",
        className: "team-grid"
      },
      {
        id: "list",
        name: "List Layout",
        description: "List-based team member display",
        type: "list",
        className: "team-list"
      },
      {
        id: "table",
        name: "Table Layout",
        description: "Table-based team member display",
        type: "table",
        className: "team-table"
      },
      {
        id: "cards",
        name: "Cards Layout",
        description: "Card-based team member display",
        type: "cards",
        className: "team-cards"
      }
    ],
    actions: [
      {
        id: "view",
        name: "View Profile",
        description: "View team member profile",
        className: "action-view"
      },
      {
        id: "message",
        name: "Send Message",
        description: "Send message to team member",
        className: "action-message"
      },
      {
        id: "edit",
        name: "Edit Member",
        description: "Edit team member information",
        className: "action-edit"
      },
      {
        id: "remove",
        name: "Remove Member",
        description: "Remove team member",
        className: "action-remove"
      }
    ],
    defaultConfig: {
      type: "grid",
      name: "Team Management",
      description: "Team member management interface",
      display: "avatar",
      actions: {
        view: true,
        message: true,
        edit: false,
        remove: false
      },
      filters: {
        department: true,
        role: true,
        status: true,
        skills: false
      },
      search: {
        enabled: true,
        fields: ["name", "email", "role", "department"],
        placeholder: "Search team members..."
      },
      pagination: {
        enabled: true,
        pageSize: 12,
        showTotal: true
      },
      sorting: {
        enabled: true,
        default: "name",
        options: ["name", "role", "department", "status", "lastActive"]
      }
    }
  },
  roles: {
    types: [
      {
        id: "admin",
        name: "Administrator",
        description: "Full system administrator",
        type: "admin",
        className: "role-admin"
      },
      {
        id: "manager",
        name: "Manager",
        description: "Team or department manager",
        type: "manager",
        className: "role-manager"
      },
      {
        id: "member",
        name: "Member",
        description: "Standard team member",
        type: "member",
        className: "role-member"
      },
      {
        id: "viewer",
        name: "Viewer",
        description: "Read-only access",
        type: "viewer",
        className: "role-viewer"
      },
      {
        id: "guest",
        name: "Guest",
        description: "Limited guest access",
        type: "guest",
        className: "role-guest"
      },
      {
        id: "custom",
        name: "Custom Role",
        description: "Custom defined role",
        type: "custom",
        className: "role-custom"
      }
    ],
    permissions: [
      {
        id: "read",
        name: "Read",
        description: "Read access to resources",
        className: "permission-read"
      },
      {
        id: "write",
        name: "Write",
        description: "Write access to resources",
        className: "permission-write"
      },
      {
        id: "delete",
        name: "Delete",
        description: "Delete access to resources",
        className: "permission-delete"
      },
      {
        id: "admin",
        name: "Admin",
        description: "Administrative access",
        className: "permission-admin"
      },
      {
        id: "invite",
        name: "Invite",
        description: "Invite new users",
        className: "permission-invite"
      },
      {
        id: "manageUsers",
        name: "Manage Users",
        description: "Manage user accounts",
        className: "permission-manage-users"
      },
      {
        id: "manageRoles",
        name: "Manage Roles",
        description: "Manage user roles",
        className: "permission-manage-roles"
      },
      {
        id: "viewAnalytics",
        name: "View Analytics",
        description: "View analytics and reports",
        className: "permission-view-analytics"
      }
    ],
    defaultConfig: {
      type: "member",
      name: "Team Member",
      description: "Standard team member role",
      permissions: {
        read: true,
        write: true,
        delete: false,
        admin: false,
        invite: false,
        manageUsers: false,
        manageRoles: false,
        viewAnalytics: false
      },
      scope: "team",
      color: "#3B82F6",
      icon: "user-line",
      level: 2,
      restrictions: [],
      features: ["view_team", "edit_profile", "send_messages"]
    }
  },
  invites: {
    types: [
      {
        id: "email",
        name: "Email Invite",
        description: "Email-based user invitation",
        type: "email",
        className: "invite-email"
      },
      {
        id: "link",
        name: "Link Invite",
        description: "Shareable invitation link",
        type: "link",
        className: "invite-link"
      },
      {
        id: "bulk",
        name: "Bulk Invite",
        description: "Bulk user invitation",
        type: "bulk",
        className: "invite-bulk"
      },
      {
        id: "custom",
        name: "Custom Invite",
        description: "Custom invitation process",
        type: "custom",
        className: "invite-custom"
      }
    ],
    fields: [
      {
        id: "email",
        name: "Email",
        description: "User email address",
        className: "field-email"
      },
      {
        id: "name",
        name: "Name",
        description: "User full name",
        className: "field-name"
      },
      {
        id: "role",
        name: "Role",
        description: "User role or position",
        className: "field-role"
      },
      {
        id: "department",
        name: "Department",
        description: "User department or team",
        className: "field-department"
      },
      {
        id: "message",
        name: "Message",
        description: "Personal invitation message",
        className: "field-message"
      }
    ],
    defaultConfig: {
      type: "email",
      name: "User Invitation",
      description: "Invite new users to the system",
      fields: {
        email: true,
        name: true,
        role: true,
        department: true,
        message: false,
        customFields: []
      },
      validation: {
        emailRequired: true,
        nameRequired: true,
        roleRequired: true,
        emailFormat: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      },
      options: {
        sendWelcomeEmail: true,
        requireAcceptance: true,
        setPassword: true,
        autoActivate: false
      },
      templates: {
        welcomeEmail: "Welcome to our platform!",
        invitationEmail: "You've been invited to join our team.",
        reminderEmail: "Reminder: Please accept your invitation."
      },
      expiration: {
        enabled: true,
        days: 7,
        reminderDays: [1, 3, 5]
      }
    }
  },
  permissions: {
    types: [
      {
        id: "role-based",
        name: "Role-Based Access Control",
        description: "Permissions based on user roles",
        type: "role-based",
        className: "permissions-rbac"
      },
      {
        id: "permission-based",
        name: "Permission-Based Access Control",
        description: "Granular permission system",
        type: "permission-based",
        className: "permissions-pbac"
      },
      {
        id: "attribute-based",
        name: "Attribute-Based Access Control",
        description: "Permissions based on user attributes",
        type: "attribute-based",
        className: "permissions-abac"
      },
      {
        id: "hybrid",
        name: "Hybrid Access Control",
        description: "Combination of multiple access control methods",
        type: "hybrid",
        className: "permissions-hybrid"
      }
    ],
    models: [
      {
        id: "RBAC",
        name: "Role-Based Access Control",
        description: "Traditional role-based permissions",
        className: "model-rbac"
      },
      {
        id: "ABAC",
        name: "Attribute-Based Access Control",
        description: "Attribute-based permissions",
        className: "model-abac"
      },
      {
        id: "PBAC",
        name: "Policy-Based Access Control",
        description: "Policy-based permissions",
        className: "model-pbac"
      },
      {
        id: "Custom",
        name: "Custom Access Control",
        description: "Custom permission model",
        className: "model-custom"
      }
    ],
    defaultConfig: {
      type: "role-based",
      name: "User Permissions",
      description: "User permission and access control system",
      model: "RBAC",
      permissions: {
        users: {
          view: ["admin", "manager"],
          create: ["admin"],
          edit: ["admin", "manager"],
          delete: ["admin"]
        },
        teams: {
          view: ["admin", "manager", "member"],
          create: ["admin", "manager"],
          edit: ["admin", "manager"],
          delete: ["admin"]
        },
        roles: {
          view: ["admin"],
          create: ["admin"],
          edit: ["admin"],
          delete: ["admin"]
        },
        settings: {
          view: ["admin", "manager"],
          edit: ["admin"]
        }
      },
      inheritance: {
        enabled: true,
        type: "hierarchical"
      },
      audit: {
        enabled: true,
        logChanges: true,
        retention: 365
      }
    }
  },
  admin: {
    types: [
      {
        id: "dashboard",
        name: "Admin Dashboard",
        description: "Administrative dashboard overview",
        type: "dashboard",
        className: "admin-dashboard"
      },
      {
        id: "users",
        name: "User Management",
        description: "User administration interface",
        type: "users",
        className: "admin-users"
      },
      {
        id: "roles",
        name: "Role Management",
        description: "Role administration interface",
        type: "roles",
        className: "admin-roles"
      },
      {
        id: "permissions",
        name: "Permission Management",
        description: "Permission administration interface",
        type: "permissions",
        className: "admin-permissions"
      },
      {
        id: "audit",
        name: "Audit Logs",
        description: "System audit and activity logs",
        type: "audit",
        className: "admin-audit"
      },
      {
        id: "reports",
        name: "Reports",
        description: "Administrative reports and analytics",
        type: "reports",
        className: "admin-reports"
      }
    ],
    features: [
      {
        id: "userManagement",
        name: "User Management",
        description: "Manage user accounts and profiles",
        className: "feature-user-management"
      },
      {
        id: "roleManagement",
        name: "Role Management",
        description: "Manage user roles and permissions",
        className: "feature-role-management"
      },
      {
        id: "permissionManagement",
        name: "Permission Management",
        description: "Manage system permissions",
        className: "feature-permission-management"
      },
      {
        id: "auditLogs",
        name: "Audit Logs",
        description: "View system audit logs",
        className: "feature-audit-logs"
      },
      {
        id: "reports",
        name: "Reports",
        description: "Generate administrative reports",
        className: "feature-reports"
      },
      {
        id: "bulkActions",
        name: "Bulk Actions",
        description: "Perform bulk operations on users",
        className: "feature-bulk-actions"
      }
    ],
    defaultConfig: {
      type: "dashboard",
      name: "User Administration",
      description: "Comprehensive user administration system",
      features: {
        userManagement: true,
        roleManagement: true,
        permissionManagement: true,
        auditLogs: true,
        reports: true,
        bulkActions: true
      },
      actions: {
        createUser: true,
        editUser: true,
        deleteUser: true,
        assignRole: true,
        revokeRole: true,
        bulkImport: true,
        bulkExport: true
      },
      views: {
        list: true,
        grid: true,
        table: true,
        details: true
      },
      filters: {
        status: true,
        role: true,
        department: true,
        dateRange: true,
        custom: true
      },
      exports: {
        csv: true,
        excel: true,
        pdf: true,
        json: true
      }
    }
  }
}

// Helper functions to get specific configurations
export function getUserProfileType(typeId: string) {
  return userManagementConfig.profiles.types.find(t => t.id === typeId)
}

export function getUserSettingsType(typeId: string) {
  return userManagementConfig.settings.types.find(t => t.id === typeId)
}

export function getTeamManagementType(typeId: string) {
  return userManagementConfig.teamManagement.types.find(t => t.id === typeId)
}

export function getUserRoleType(typeId: string) {
  return userManagementConfig.roles.types.find(t => t.id === typeId)
}

export function getUserInviteType(typeId: string) {
  return userManagementConfig.invites.types.find(t => t.id === typeId)
}

export function getUserPermissionsType(typeId: string) {
  return userManagementConfig.permissions.types.find(t => t.id === typeId)
}

export function getUserAdminType(typeId: string) {
  return userManagementConfig.admin.types.find(t => t.id === typeId)
}
