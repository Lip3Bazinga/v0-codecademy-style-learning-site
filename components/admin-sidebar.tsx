"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Users, BarChart3, Settings, LogOut, Home, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Cursos",
    href: "/admin/cursos",
    icon: BookOpen,
    children: [
      { name: "Todos os Cursos", href: "/admin/cursos" },
      { name: "Novo Curso", href: "/admin/cursos/novo" },
      { name: "Categorias", href: "/admin/cursos/categorias" },
    ],
  },
  {
    name: "Usuários",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    name: "Relatórios",
    href: "/admin/relatorios",
    icon: BarChart3,
  },
  {
    name: "Configurações",
    href: "/admin/configuracoes",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <div className={cn("border-r bg-muted/40 transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">Admin</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>

                  {/* Sub-navigation */}
                  {!collapsed && item.children && isActive && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-1 text-sm transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            pathname === child.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </ScrollArea>

        {/* User Info & Logout */}
        <div className="border-t p-4">
          {!collapsed && user && (
            <div className="mb-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
              <Link href="/">
                <Home className="h-4 w-4" />
                {!collapsed && <span className="ml-2">Site</span>}
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="bg-transparent">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Sair</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
