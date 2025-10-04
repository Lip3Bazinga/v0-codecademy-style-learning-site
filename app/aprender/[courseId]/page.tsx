"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles, RefreshCw, Settings } from "lucide-react"
import { allCourses } from "@/lib/mock-data"
import { JupyterNotebook } from "@/components/jupyter-notebook"

export default function CodecademyLearningPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = allCourses[courseId as keyof typeof allCourses]

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [jupyterCells, setJupyterCells] = useState<any[]>([])

  const currentLesson = course?.lessons?.[currentLessonIndex]

  useEffect(() => {
    if (currentLesson?.codeExercise) {
      setCode(currentLesson.codeExercise.initialCode)
      setOutput("")
      setShowHint(false)
      setHintIndex(0)
    }

    if (currentLesson?.jupyterNotebook) {
      setJupyterCells(currentLesson.jupyterNotebook.cells)
    }
  }, [currentLessonIndex, currentLesson])

  if (!course) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
          <Button asChild>
            <a href="/cursos" className="bg-primary text-white hover:bg-primary/90">
              Voltar aos cursos
            </a>
          </Button>
        </div>
      </div>
    )
  }

  const totalLessons = course.lessons?.length || course.totalLessons || 0
  const progress = totalLessons > 0 ? ((currentLessonIndex + 1) / totalLessons) * 100 : 0

  const runCode = () => {
    try {
      const mockConsole = {
        log: (...args: any[]) => {
          setOutput((prev) => prev + args.join(" ") + "\n")
        },
      }
      setOutput("")
      const userFunction = new Function("console", code)
      userFunction(mockConsole)
    } catch (error) {
      setOutput(`Erro: ${error}`)
    }
  }

  const nextLesson = () => {
    if (course.lessons && currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleJupyterCellChange = (index: number, content: string) => {
    const newCells = [...jupyterCells]
    newCells[index].content = content
    setJupyterCells(newCells)
  }

  const handleRunJupyterCell = (index: number) => {
    console.log(`Executando célula ${index}:`, jupyterCells[index].content)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-lg">LEVEL USP</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-primary font-semibold text-lg">{course.title}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              <Sparkles className="h-4 w-4 mr-2" />
              Ask the AI Learning Assistant
            </Button>

            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-400">●</span>
              <span>Get Unstuck</span>
              <span className="text-slate-400">Tools</span>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">U</span>
              </div>
              <Button className="bg-primary text-white hover:bg-primary/90 font-semibold">Start free trial</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Learn</span>
            </div>
            <div className="text-sm text-slate-300 mb-1">{course.title.toUpperCase()}</div>
            <h2 className="text-xl font-bold">{currentLesson?.title || "Bem-vindo ao curso"}</h2>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center space-x-1 text-sm text-slate-400">
                <span>{currentLesson?.duration || "Carregando..."}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-4">
              {currentLesson?.content?.sections?.map((section, index) => (
                <div key={index}>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              )) || (
                <div className="text-center py-8">
                  <p className="text-slate-400">Carregando conteúdo da aula...</p>
                </div>
              )}

              {currentLesson?.codeExercise && (
                <div className="mt-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm font-medium">Instructions</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          The following code will render a JSX expression:
                        </p>

                        <div className="mt-3 bg-slate-900 rounded-lg p-4 border border-slate-700">
                          <pre className="text-sm text-slate-300 font-mono">
                            {`const container = document.getElementById('app');
const root = createRoot(container);
root.render(<h1>Hello world</h1>);`}
                          </pre>
                        </div>

                        <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                          Starting on line 5, carefully copy the above code into the code editor. We'll go over how it
                          works in the next exercise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showHint && currentLesson?.codeExercise && (
                <div className="mt-6 bg-primary/20 border border-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-primary font-medium text-sm">Stuck? Get a hint</span>
                  </div>
                  <p className="text-primary/80 text-sm">{currentLesson.codeExercise.hints?.[hintIndex]}</p>
                </div>
              )}

              <div className="mt-8">
                <div className="flex items-center space-x-2 mb-3">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">Concept Review</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Want to quickly review some of the concepts you've been learning? Take a look at this material's
                  cheatsheet!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {currentLesson?.type === "jupyter" ? (
            <JupyterNotebook
              cells={jupyterCells}
              onCellChange={handleJupyterCellChange}
              onRunCell={handleRunJupyterCell}
            />
          ) : (
            <>
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-400 text-sm">app.js</span>
                  </div>
                  <div className="text-sm text-slate-400">Codecademy Web Browser</div>
                </div>
              </div>

              <div className="flex-1 relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 bg-slate-900 text-slate-100 font-mono text-sm border-0 resize-none focus:outline-none"
                  style={{
                    lineHeight: "1.6",
                    tabSize: 2,
                  }}
                  spellCheck={false}
                />

                <div className="absolute left-0 top-0 p-4 pointer-events-none text-slate-500 font-mono text-sm select-none">
                  {code.split("\n").map((_, index) => (
                    <div key={index} style={{ lineHeight: "1.6" }}>
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="bg-slate-800 border-t border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {currentLesson?.type === "jupyter" ? (
                  <Button className="bg-primary text-white hover:bg-primary/90 font-semibold">Test Work</Button>
                ) : (
                  <>
                    <Button onClick={runCode} className="bg-primary text-white hover:bg-primary/90 font-semibold">
                      Run
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-slate-400 text-sm">
                  {currentLessonIndex + 1}/{totalLessons}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={prevLesson}
                    disabled={currentLessonIndex === 0}
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={nextLesson}
                    disabled={!course.lessons || currentLessonIndex === course.lessons.length - 1}
                    className="bg-primary text-white hover:bg-primary/90 font-semibold"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
