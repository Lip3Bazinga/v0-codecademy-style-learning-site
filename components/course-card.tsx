import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    level: string
    duration: string
    rating: number
    students: number
    price: string
    category: string
    image: string
    topics: string[]
  }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
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

        <CardTitle className="text-lg group-hover:text-primary transition-colors">{course.title}</CardTitle>

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
}
