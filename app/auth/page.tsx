'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const encodedPassword = "K2FtYXVyeUxBRk9OVEEjIyM="

export default function AuthPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem("authenticated") === "true") {
      router.push('/admin') // Redirect to dashboard or any authenticated route
    }
  }, [router])

  const handleLogin = () => {
    if (btoa(password) === encodedPassword) {
      sessionStorage.setItem("authenticated", "true")
      router.push('/admin') // Redirect to dashboard or any authenticated route
    } else {
      setError("Invalid password")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl mb-4">Admin Login</h1>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        aria-label="Password"
        className="max-w-xs mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={handleLogin}>
        Login
      </Button>
    </div>
  )
}