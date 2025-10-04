"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Play, BookOpen, Code, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonSidebarProps {
  course: {
    id: string
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
      type: string
      completed: boolean
    }>
  }
  currentLessonIndex: number
  onLessonSelect: (index: number) => void
  isOpen: boolean
  onClose: () => void
}

export function LessonSidebar({ course, currentLessonIndex, onLessonSelect, isOpen, onClose }: LessonSidebarProps) {
  const completedLessons = course.lessons.filter((lesson) => lesson.completed).length
  const progress = (completedLessons / course.lessons.length) * 100

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "w-80 border-r bg-background flex flex-col transition-transform duration-300 z-50",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen
            ? "fixed left-0 top-0 h-full translate-x-0"
            : "fixed left-0 top-0 h-full -translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">{course.title}</h2>
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-muted rounded">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso do Curso</span>
              <span>
                {completedLessons}/{course.lessons.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Lessons List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {course.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => {
                  onLessonSelect(index)
                  onClose()
                }}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-colors",
                  "hover:bg-muted/50",
                  currentLessonIndex === index ? "bg-primary/10 border-primary" : "border-border",
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : lesson.type === "coding" ? (
                      <Code className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium truncate">{lesson.title}</span>
                      <Badge variant={lesson.type === "coding" ? "default" : "secondary"} className="text-xs">
                        {lesson.type === "coding" ? "Código" : "Leitura"}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                  </div>

                  {currentLessonIndex === index && <Play className="h-4 w-4 text-primary flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
