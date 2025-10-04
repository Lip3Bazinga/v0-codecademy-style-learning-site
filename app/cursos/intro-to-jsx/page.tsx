import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, Play } from "lucide-react"

export default function IntroToJSXCoursePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">Curso Gratuito</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Introdução ao JSX</h1>
            <p className="text-xl mb-8 text-white/90">
              Aprenda os fundamentos do JSX e como renderizar elementos React de forma prática e interativa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/aprender/intro-to-jsx">
                <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 font-semibold">
                  <Play className="h-5 w-5 mr-2" />
                  Começar Curso
                </Button>
              </Link>
              <div className="flex items-center space-x-4 text-white/80">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>2-3 horas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>1.2k estudantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>Sobre este curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    JSX é uma extensão de sintaxe para JavaScript que permite escrever elementos HTML dentro do código
                    JavaScript. Neste curso, você aprenderá os conceitos fundamentais do JSX e como utilizá-lo para
                    criar interfaces de usuário dinâmicas com React.
                  </p>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardHeader>
                  <CardTitle>Currículo do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">O que é JSX?</h4>
                          <p className="text-sm text-muted-foreground">Introdução aos conceitos básicos</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Leitura</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Rendering JSX</h4>
                          <p className="text-sm text-muted-foreground">Aprenda a renderizar elementos JSX</p>
                        </div>
                      </div>
                      <Badge>Prática</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">JSX Elements</h4>
                          <p className="text-sm text-muted-foreground">Estrutura e sintaxe dos elementos</p>
                        </div>
                      </div>
                      <Badge>Prática</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações do Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="font-medium">2-3 horas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nível</span>
                    <Badge variant="outline">Iniciante</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Aulas</span>
                    <span className="font-medium">14 lições</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificado</span>
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pré-requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Conhecimento básico de HTML</li>
                    <li>• Fundamentos de JavaScript</li>
                    <li>• Familiaridade com ES6+</li>
                  </ul>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-red-50 to-yellow-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Pronto para começar?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Inicie sua jornada no desenvolvimento React</p>
                  <Link href="/aprender/intro-to-jsx">
                    <Button className="w-full bg-red-600 hover:bg-red-700">Começar Agora</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
