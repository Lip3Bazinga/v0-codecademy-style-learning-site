"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, TrendingUp, DollarSign, Plus, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total de Usuários",
    value: "2,847",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Cursos Ativos",
    value: "24",
    change: "+3",
    icon: BookOpen,
  },
  {
    title: "Taxa de Conclusão",
    value: "68%",
    change: "+5%",
    icon: TrendingUp,
  },
  {
    title: "Receita Mensal",
    value: "R$ 45.2k",
    change: "+18%",
    icon: DollarSign,
  },
]

const recentCourses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    students: 1234,
    status: "Ativo",
    created: "2024-01-15",
  },
  {
    id: 2,
    title: "React Avançado",
    students: 987,
    status: "Ativo",
    created: "2024-01-10",
  },
  {
    id: 3,
    title: "Python para Iniciantes",
    students: 2156,
    status: "Rascunho",
    created: "2024-01-08",
  },
]

const recentUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    joined: "2024-01-20",
    courses: 3,
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    joined: "2024-01-19",
    courses: 1,
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    joined: "2024-01-18",
    courses: 2,
  },
]

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-background">
        <AdminSidebar />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
                <p className="text-muted-foreground">Gerencie sua plataforma educacional</p>
              </div>
              <Button asChild>
                <Link href="/admin/cursos/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Curso
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">{stat.change}</span> em relação ao mês anterior
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Cursos Recentes</CardTitle>
                  <CardDescription>Últimos cursos criados na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{course.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{course.students} estudantes</span>
                            <span>Criado em {course.created}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={course.status === "Ativo" ? "default" : "secondary"}>{course.status}</Badge>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/admin/cursos">Ver Todos os Cursos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Usuários Recentes</CardTitle>
                  <CardDescription>Novos usuários cadastrados na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{user.email}</span>
                            <span>{user.courses} cursos</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Entrou em {user.joined}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/admin/usuarios">Ver Todos os Usuários</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
