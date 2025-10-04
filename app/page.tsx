import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Users, Trophy, ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    // Fixed header alignment by adding proper flex display
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/50">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                🚀 Plataforma educacional da USP
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Aprenda programação de forma <span className="text-primary">prática e interativa</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Domine as tecnologias mais demandadas do mercado com nossa metodologia hands-on desenvolvida na USP.
                Código na prática, desde o primeiro dia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/cursos">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Explorar Cursos
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">
                    <Play className="h-5 w-5 mr-2" />
                    Ver Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Por que escolher a LEVEL USP?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma foi desenvolvida na USP para acelerar seu aprendizado em programação
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Editor Integrado</CardTitle>
                  <CardDescription>Pratique código diretamente na plataforma com nosso editor avançado</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Comunidade Acadêmica</CardTitle>
                  <CardDescription>Conecte-se com estudantes da USP e tire dúvidas em tempo real</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Certificação USP</CardTitle>
                  <CardDescription>
                    Receba certificados da Universidade de São Paulo ao concluir os cursos
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Cursos Populares</h2>
              <p className="text-xl text-muted-foreground">Comece sua jornada com nossos cursos mais procurados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "JavaScript Fundamentals",
                  description: "Aprenda os conceitos básicos da linguagem mais popular da web",
                  level: "Iniciante",
                  duration: "8 semanas",
                  rating: 4.9,
                  students: 1234,
                },
                {
                  title: "React do Zero ao Avançado",
                  description: "Domine a biblioteca mais usada para desenvolvimento frontend",
                  level: "Intermediário",
                  duration: "12 semanas",
                  rating: 4.8,
                  students: 987,
                },
                {
                  title: "Python para Iniciantes",
                  description: "Comece sua jornada na programação com Python",
                  level: "Iniciante",
                  duration: "10 semanas",
                  rating: 4.9,
                  students: 2156,
                },
              ].map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{course.duration}</span>
                      <span>{course.students} estudantes</span>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/cursos/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        Começar Curso
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/cursos">
                  Ver Todos os Cursos
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Pronto para começar sua jornada?</h2>
              <p className="text-xl text-muted-foreground">
                Junte-se a milhares de estudantes que já transformaram suas carreiras com a LEVEL USP
              </p>
              <Button size="lg" asChild>
                <Link href="/cadastro">
                  Criar Conta Gratuita
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
