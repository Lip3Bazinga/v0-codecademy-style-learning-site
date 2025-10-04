"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Star, Play, CheckCircle, Award, Target } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { allCourses } from "@/lib/mock-data"

export default function CoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const course = allCourses[courseId as keyof typeof allCourses]

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
            <Button asChild>
              <Link href="/cursos">Voltar aos cursos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const totalLessons = course.curriculum
    ? course.curriculum.reduce((acc, module) => acc + module.lessons.length, 0)
    : course.totalLessons || 0

  const completedLessons = course.curriculum
    ? course.curriculum.reduce((acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length, 0)
    : 0

  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-background to-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-balance">{course.title}</h1>

                <p className="text-xl text-muted-foreground">{course.description}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} estudantes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link href={`/aprender/${course.id}`}>
                      <Play className="h-5 w-5 mr-2" />
                      Começar Curso Gratuito
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                    <span className="text-lg font-bold">100% Gratuito</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                    <Play className="h-6 w-6 mr-2" />
                    Preview do Curso
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="curriculum">Currículo</TabsTrigger>
                    <TabsTrigger value="instructor">Instrutor</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />O que você vai aprender
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.whatYouWillLearn?.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Requisitos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {course.requirements?.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-4">
                    {course.curriculum?.map((module, moduleIndex) => (
                      <Card key={moduleIndex}>
                        <CardHeader>
                          <CardTitle className="text-lg">{module.module}</CardTitle>
                          <CardDescription>{module.lessons.length} aulas</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-3 rounded-lg border"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Play className="h-5 w-5 text-muted-foreground" />
                                  )}
                                  <span className="font-medium">{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="instructor">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <img
                            src={course.instructor?.avatar || "/placeholder.svg"}
                            alt={course.instructor?.name || "Instrutor"}
                            className="w-16 h-16 rounded-full"
                          />
                          <div>
                            <CardTitle>{course.instructor?.name}</CardTitle>
                            <CardDescription>{course.instructor?.bio}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Instrutor experiente com foco em desenvolvimento e educação em tecnologia. Já ensinou milhares
                          de estudantes e tem paixão por tornar a programação acessível para todos.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progresso do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Concluído</span>
                        <span>
                          {completedLessons}/{totalLessons} aulas
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/aprender/${course.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Continuar Aprendendo
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete o curso e receba um certificado reconhecido pelo mercado.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Ver Certificado
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compartilhar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Compartilhe este curso com seus amigos</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Compartilhar Curso
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
