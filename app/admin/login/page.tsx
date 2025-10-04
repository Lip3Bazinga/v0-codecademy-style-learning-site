"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement admin authentication logic
    console.log("Admin login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">CodeLearn</span>
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
            <CardDescription>Entre com suas credenciais de administrador</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email do administrador</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@codelearn.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha de administrador"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Entrar como Admin
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ← Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">Área restrita para administradores autorizados</div>
      </div>
    </div>
  )
}
