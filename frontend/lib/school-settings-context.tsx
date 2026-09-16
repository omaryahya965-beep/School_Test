"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useLanguage } from "@/lib/i18n/context"

const STORAGE_KEY = "settings_schoolName"
const DEFAULT_AR  = "مدرسة كفر عقب الأساسية المختلطة"
const DEFAULT_EN  = "Kafr Aqab Mixed Basic School"

interface SchoolSettingsCtx {
  schoolName: string
  setSchoolName: (name: string) => void
}

const SchoolSettingsContext = createContext<SchoolSettingsCtx>({
  schoolName: DEFAULT_AR,
  setSchoolName: () => {},
})

export function SchoolSettingsProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  // Only a value the user explicitly typed overrides the language-based default
  const [customName, setCustomName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEY)
  })

  const schoolName = customName ?? (language === "ar" ? DEFAULT_AR : DEFAULT_EN)

  const setSchoolName = useCallback((name: string) => {
    setCustomName(name)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, name)
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: name }))
    }
  }, [])

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue !== null) {
        setCustomName(e.newValue)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  return (
    <SchoolSettingsContext.Provider value={{ schoolName, setSchoolName }}>
      {children}
    </SchoolSettingsContext.Provider>
  )
}

export function useSchoolName() {
  return useContext(SchoolSettingsContext)
}

export { DEFAULT_AR, DEFAULT_EN, STORAGE_KEY }
