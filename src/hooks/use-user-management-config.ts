"use client"

import { useState, useCallback } from "react"
import {
  userManagementConfig,
  UserProfileConfig,
  UserSettingsConfig,
  TeamManagementConfig,
  UserRoleConfig,
  UserInviteConfig,
  UserPermissionsConfig,
  UserAdminConfig,
  getUserProfileType,
  getUserSettingsType,
  getTeamManagementType,
  getUserRoleType,
  getUserInviteType,
  getUserPermissionsType,
  getUserAdminType
} from "@/lib/user-management-config"

interface UseUserManagementConfigReturn {
  // Configuration object
  config: typeof userManagementConfig
  
  // User Profile configurations
  userProfileConfig: UserProfileConfig
  updateUserProfileConfig: (config: Partial<UserProfileConfig>) => void
  getUserProfileType: typeof getUserProfileType
  
  // User Settings configurations
  userSettingsConfig: UserSettingsConfig
  updateUserSettingsConfig: (config: Partial<UserSettingsConfig>) => void
  getUserSettingsType: typeof getUserSettingsType
  
  // Team Management configurations
  teamManagementConfig: TeamManagementConfig
  updateTeamManagementConfig: (config: Partial<TeamManagementConfig>) => void
  getTeamManagementType: typeof getTeamManagementType
  
  // User Role configurations
  userRoleConfig: UserRoleConfig
  updateUserRoleConfig: (config: Partial<UserRoleConfig>) => void
  getUserRoleType: typeof getUserRoleType
  
  // User Invite configurations
  userInviteConfig: UserInviteConfig
  updateUserInviteConfig: (config: Partial<UserInviteConfig>) => void
  getUserInviteType: typeof getUserInviteType
  
  // User Permissions configurations
  userPermissionsConfig: UserPermissionsConfig
  updateUserPermissionsConfig: (config: Partial<UserPermissionsConfig>) => void
  getUserPermissionsType: typeof getUserPermissionsType
  
  // User Admin configurations
  userAdminConfig: UserAdminConfig
  updateUserAdminConfig: (config: Partial<UserAdminConfig>) => void
  getUserAdminType: typeof getUserAdminType
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useUserManagementConfig(): UseUserManagementConfigReturn {
  // User Profile state
  const [userProfileConfig, setUserProfileConfig] = useState<UserProfileConfig>(
    userManagementConfig.profiles.defaultConfig
  )

  // User Settings state
  const [userSettingsConfig, setUserSettingsConfig] = useState<UserSettingsConfig>(
    userManagementConfig.settings.defaultConfig
  )

  // Team Management state
  const [teamManagementConfig, setTeamManagementConfig] = useState<TeamManagementConfig>(
    userManagementConfig.teamManagement.defaultConfig
  )

  // User Role state
  const [userRoleConfig, setUserRoleConfig] = useState<UserRoleConfig>(
    userManagementConfig.roles.defaultConfig
  )

  // User Invite state
  const [userInviteConfig, setUserInviteConfig] = useState<UserInviteConfig>(
    userManagementConfig.invites.defaultConfig
  )

  // User Permissions state
  const [userPermissionsConfig, setUserPermissionsConfig] = useState<UserPermissionsConfig>(
    userManagementConfig.permissions.defaultConfig
  )

  // User Admin state
  const [userAdminConfig, setUserAdminConfig] = useState<UserAdminConfig>(
    userManagementConfig.admin.defaultConfig
  )

  // Update functions
  const updateUserProfileConfig = useCallback((config: Partial<UserProfileConfig>) => {
    setUserProfileConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateUserSettingsConfig = useCallback((config: Partial<UserSettingsConfig>) => {
    setUserSettingsConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateTeamManagementConfig = useCallback((config: Partial<TeamManagementConfig>) => {
    setTeamManagementConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateUserRoleConfig = useCallback((config: Partial<UserRoleConfig>) => {
    setUserRoleConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateUserInviteConfig = useCallback((config: Partial<UserInviteConfig>) => {
    setUserInviteConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateUserPermissionsConfig = useCallback((config: Partial<UserPermissionsConfig>) => {
    setUserPermissionsConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateUserAdminConfig = useCallback((config: Partial<UserAdminConfig>) => {
    setUserAdminConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setUserProfileConfig(userManagementConfig.profiles.defaultConfig)
    setUserSettingsConfig(userManagementConfig.settings.defaultConfig)
    setTeamManagementConfig(userManagementConfig.teamManagement.defaultConfig)
    setUserRoleConfig(userManagementConfig.roles.defaultConfig)
    setUserInviteConfig(userManagementConfig.invites.defaultConfig)
    setUserPermissionsConfig(userManagementConfig.permissions.defaultConfig)
    setUserAdminConfig(userManagementConfig.admin.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      userProfileConfig,
      userSettingsConfig,
      teamManagementConfig,
      userRoleConfig,
      userInviteConfig,
      userPermissionsConfig,
      userAdminConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    userProfileConfig,
    userSettingsConfig,
    teamManagementConfig,
    userRoleConfig,
    userInviteConfig,
    userPermissionsConfig,
    userAdminConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.userProfileConfig) {
        setUserProfileConfig(importedConfig.userProfileConfig)
      }
      if (importedConfig.userSettingsConfig) {
        setUserSettingsConfig(importedConfig.userSettingsConfig)
      }
      if (importedConfig.teamManagementConfig) {
        setTeamManagementConfig(importedConfig.teamManagementConfig)
      }
      if (importedConfig.userRoleConfig) {
        setUserRoleConfig(importedConfig.userRoleConfig)
      }
      if (importedConfig.userInviteConfig) {
        setUserInviteConfig(importedConfig.userInviteConfig)
      }
      if (importedConfig.userPermissionsConfig) {
        setUserPermissionsConfig(importedConfig.userPermissionsConfig)
      }
      if (importedConfig.userAdminConfig) {
        setUserAdminConfig(importedConfig.userAdminConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: userManagementConfig,
    
    // User Profile
    userProfileConfig,
    updateUserProfileConfig,
    getUserProfileType,
    
    // User Settings
    userSettingsConfig,
    updateUserSettingsConfig,
    getUserSettingsType,
    
    // Team Management
    teamManagementConfig,
    updateTeamManagementConfig,
    getTeamManagementType,
    
    // User Role
    userRoleConfig,
    updateUserRoleConfig,
    getUserRoleType,
    
    // User Invite
    userInviteConfig,
    updateUserInviteConfig,
    getUserInviteType,
    
    // User Permissions
    userPermissionsConfig,
    updateUserPermissionsConfig,
    getUserPermissionsType,
    
    // User Admin
    userAdminConfig,
    updateUserAdminConfig,
    getUserAdminType,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
