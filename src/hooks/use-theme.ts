"use client"

import { useTheme } from "next-themes"

export function useThemeProvider() {
  const { theme, setTheme, systemTheme, themes } = useTheme()
  
  return {
    theme,
    setTheme,
    systemTheme,
    themes,
    isDark: theme === "dark" || (theme === "system" && systemTheme === "dark"),
    isLight: theme === "light" || (theme === "system" && systemTheme === "light"),
  }
}
