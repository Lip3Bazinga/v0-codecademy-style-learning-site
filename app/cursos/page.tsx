"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  ArrowRight,
  Code,
  Database,
  Globe,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { allCourses } from "@/lib/mock-data"

const courses = Object.values(allCourses).map((course) => ({
  ...course,
  icon:
    course.category === "Frontend"
      ? Code
      : course.category === "Backend"
        ? Database
        : course.category === "Mobile"
          ? Smartphone
          : Globe,
}))

const categories = ["Todos", "Frontend", "Backend", "Fullstack", "Mobile"]
const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedLevel, setSelectedLevel] = useState("Todos")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "Todos" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/50">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Explore Nossos <span className="text-primary">Cursos</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Descubra cursos práticos e interativos para acelerar sua carreira em tecnologia
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-4 border-b">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtros:</span>
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Mostrando {filteredCourses.length} de {courses.length} cursos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const IconComponent = course.icon
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant={course.price === "Gratuito" ? "secondary" : "default"}>{course.price}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          {course.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{course.level}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>

                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5" />
                          {course.title}
                        </div>
                      </CardTitle>

                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Topics */}
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.topics.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students} estudantes</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button className="w-full" asChild>
                        <Link href={`/cursos/${course.id}`}>
                          Ver Curso
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum curso encontrado</h3>
                <p className="text-muted-foreground">Tente ajustar os filtros ou termo de busca</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Não encontrou o que procurava?</h2>
              <p className="text-xl text-muted-foreground">Sugerir um novo curso ou entre em contato conosco</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/sugerir-curso">Sugerir Curso</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contato">Falar Conosco</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
