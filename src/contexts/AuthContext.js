"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock users - in real app, this would be API call
    const mockUsers = [
      { id: 1, email: "admin@example.com", password: "admin123", role: "admin", name: "Admin User" },
      { id: 2, email: "user@example.com", password: "user123", role: "user", name: "Regular User" },
    ]

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return { success: true }
    } else {
      return { success: false, error: "Invalid credentials" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
