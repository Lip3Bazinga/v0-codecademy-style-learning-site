"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NewCoursePage() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    image: "",
    requirements: [""],
    whatYouWillLearn: [""],
  })

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "",
      type: "reading",
      duration: "",
      content: "",
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: "requirements" | "whatYouWillLearn", index: number, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "requirements" | "whatYouWillLearn") => {
    setCourseData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "requirements" | "whatYouWillLearn", index: number) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const addLesson = () => {
    setLessons((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        type: "reading",
        duration: "",
        content: "",
      },
    ])
  }

  const removeLesson = (id: number) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id))
  }

  const handleLessonChange = (id: number, field: string, value: string) => {
    setLessons((prev) => prev.map((lesson) => (lesson.id === id ? { ...lesson, [field]: value } : lesson)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement course creation logic
    console.log("Course data:", courseData)
    console.log("Lessons:", lessons)
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-background">
        <AdminSidebar />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/cursos">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Criar Novo Curso</h1>
                  <p className="text-muted-foreground">Preencha as informações do curso</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="bg-transparent">
                  Salvar Rascunho
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  Publicar Curso
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="lessons">Aulas</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações do Curso</CardTitle>
                      <CardDescription>Dados básicos que serão exibidos na página do curso</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Título do Curso *</Label>
                          <Input
                            id="title"
                            placeholder="Ex: JavaScript Fundamentals"
                            value={courseData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration">Duração *</Label>
                          <Input
                            id="duration"
                            placeholder="Ex: 8 semanas"
                            value={courseData.duration}
                            onChange={(e) => handleInputChange("duration", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição *</Label>
                        <Textarea
                          id="description"
                          placeholder="Descreva o que os alunos vão aprender neste curso..."
                          value={courseData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria *</Label>
                          <Select
                            value={courseData.category}
                            onValueChange={(value) => handleInputChange("category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="frontend">Frontend</SelectItem>
                              <SelectItem value="backend">Backend</SelectItem>
                              <SelectItem value="fullstack">Fullstack</SelectItem>
                              <SelectItem value="mobile">Mobile</SelectItem>
                              <SelectItem value="data">Data Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="level">Nível *</Label>
                          <Select value={courseData.level} onValueChange={(value) => handleInputChange("level", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="iniciante">Iniciante</SelectItem>
                              <SelectItem value="intermediario">Intermediário</SelectItem>
                              <SelectItem value="avancado">Avançado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price">Preço</Label>
                          <Input
                            id="price"
                            placeholder="Ex: R$ 199 ou Gratuito"
                            value={courseData.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">URL da Imagem</Label>
                        <Input
                          id="image"
                          placeholder="https://exemplo.com/imagem.jpg"
                          value={courseData.image}
                          onChange={(e) => handleInputChange("image", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>O que você vai aprender</CardTitle>
                      <CardDescription>Liste os principais tópicos que serão abordados</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {courseData.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder="Ex: Sintaxe básica do JavaScript"
                            value={item}
                            onChange={(e) => handleArrayChange("whatYouWillLearn", index, e.target.value)}
                          />
                          {courseData.whatYouWillLearn.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem("whatYouWillLearn", index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayItem("whatYouWillLearn")}
                        className="bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Item
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requisitos</CardTitle>
                      <CardDescription>O que os alunos precisam saber antes de começar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {courseData.requirements.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder="Ex: Conhecimento básico de HTML e CSS"
                            value={item}
                            onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                          />
                          {courseData.requirements.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem("requirements", index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayItem("requirements")}
                        className="bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Requisito
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lessons" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Aulas do Curso</CardTitle>
                      <CardDescription>Organize o conteúdo em aulas sequenciais</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {lessons.map((lesson, index) => (
                        <Card key={lesson.id} className="border-2 border-dashed">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Aula {index + 1}</span>
                                <Badge variant={lesson.type === "coding" ? "default" : "secondary"}>
                                  {lesson.type === "coding" ? "Prática" : "Leitura"}
                                </Badge>
                              </div>
                              {lessons.length > 1 && (
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeLesson(lesson.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Título da Aula</Label>
                                <Input
                                  placeholder="Ex: Introdução ao JavaScript"
                                  value={lesson.title}
                                  onChange={(e) => handleLessonChange(lesson.id, "title", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Tipo</Label>
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value) => handleLessonChange(lesson.id, "type", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="reading">Leitura</SelectItem>
                                    <SelectItem value="coding">Prática</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Duração</Label>
                                <Input
                                  placeholder="Ex: 15 min"
                                  value={lesson.duration}
                                  onChange={(e) => handleLessonChange(lesson.id, "duration", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Conteúdo</Label>
                              <Textarea
                                placeholder="Conteúdo da aula..."
                                value={lesson.content}
                                onChange={(e) => handleLessonChange(lesson.id, "content", e.target.value)}
                                rows={3}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button type="button" variant="outline" onClick={addLesson} className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Aula
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações do Curso</CardTitle>
                      <CardDescription>Configurações avançadas e publicação</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Configurações adicionais serão implementadas aqui.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
