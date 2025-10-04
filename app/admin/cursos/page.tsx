"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Frontend",
    level: "Iniciante",
    students: 1234,
    duration: "8 semanas",
    status: "Ativo",
    created: "2024-01-15",
    price: "Gratuito",
  },
  {
    id: 2,
    title: "React Avançado",
    category: "Frontend",
    level: "Avançado",
    students: 987,
    duration: "12 semanas",
    status: "Ativo",
    created: "2024-01-10",
    price: "R$ 199",
  },
  {
    id: 3,
    title: "Python para Iniciantes",
    category: "Backend",
    level: "Iniciante",
    students: 2156,
    duration: "10 semanas",
    status: "Rascunho",
    created: "2024-01-08",
    price: "R$ 149",
  },
  {
    id: 4,
    title: "Node.js e APIs",
    category: "Backend",
    level: "Intermediário",
    students: 756,
    duration: "10 semanas",
    status: "Ativo",
    created: "2024-01-05",
    price: "R$ 249",
  },
]

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "Todos" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-background">
        <AdminSidebar />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Gerenciar Cursos</h1>
                <p className="text-muted-foreground">Visualize e gerencie todos os cursos da plataforma</p>
              </div>
              <Button asChild>
                <Link href="/admin/cursos/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Curso
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar cursos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                      <SelectItem value="Arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Courses Table */}
            <Card>
              <CardHeader>
                <CardTitle>Cursos ({filteredCourses.length})</CardTitle>
                <CardDescription>Lista de todos os cursos cadastrados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Curso</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Nível</TableHead>
                      <TableHead>Estudantes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{course.level}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{course.students}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={course.status === "Ativo" ? "default" : "secondary"}>{course.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{course.price}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/cursos/${course.id}/editar`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
