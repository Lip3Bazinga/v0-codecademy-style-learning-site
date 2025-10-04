import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"

interface LessonContentProps {
  lesson:
    | {
        id: string
        title: string
        duration: string
        type: string
        content: {
          title: string
          description: string
          sections: Array<{
            type: string
            content: string
          }>
        }
      }
    | undefined
}

export function LessonContent({ lesson }: LessonContentProps) {
  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Selecione uma aula para começar</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant={lesson.type === "coding" ? "default" : "secondary"}>
            {lesson.type === "coding" ? "Prática" : "Leitura"}
          </Badge>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">{lesson.content.title}</h1>
        <p className="text-xl text-muted-foreground">{lesson.content.description}</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {lesson.content.sections.map((section, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              {section.type === "text" && (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div
                    className="text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: section.content
                        .replace(/\n\n/g, "</p><p>")
                        .replace(/^/, "<p>")
                        .replace(/$/, "</p>")
                        .replace(/## (.*?)\n/g, '<h2 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h2>')
                        .replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
                        .replace(
                          /```javascript\n([\s\S]*?)\n```/g,
                          '<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>',
                        )
                        .replace(/- (.*?)(?=\n|$)/g, '<li class="ml-4">$1</li>')
                        .replace(/(<li.*<\/li>)/s, '<ul class="list-disc space-y-1 my-3">$1</ul>'),
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reading Progress */}
      {lesson.type === "reading" && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Progresso da Leitura</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Marque como concluído quando terminar de ler o conteúdo.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Marcar como Concluído
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
