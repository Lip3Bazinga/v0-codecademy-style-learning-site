"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        // TODO: Check for existing session/token
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      if (email === "admin@codelearn.com" && password === "admin123") {
        const adminUser: User = {
          id: "1",
          name: "Administrador",
          email: "admin@codelearn.com",
          role: "admin",
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        return true
      } else if (email && password) {
        const studentUser: User = {
          id: "2",
          name: "Estudante",
          email: email,
          role: "student",
        }
        setUser(studentUser)
        localStorage.setItem("user", JSON.stringify(studentUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
