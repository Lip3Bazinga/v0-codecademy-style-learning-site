import { Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/level-usp-logo.png" alt="LEVEL USP" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold">LEVEL USP</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Plataforma educacional da Universidade de São Paulo para ensino de programação prática e interativa.
            </p>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Cursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cursos/javascript" className="hover:text-foreground transition-colors">
                  JavaScript
                </Link>
              </li>
              <li>
                <Link href="/cursos/react" className="hover:text-foreground transition-colors">
                  React
                </Link>
              </li>
              <li>
                <Link href="/cursos/python" className="hover:text-foreground transition-colors">
                  Python
                </Link>
              </li>
              <li>
                <Link href="/cursos/nodejs" className="hover:text-foreground transition-colors">
                  Node.js
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Universidade</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/sobre" className="hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/pesquisa" className="hover:text-foreground transition-colors">
                  Pesquisa
                </Link>
              </li>
              <li>
                <Link href="/publicacoes" className="hover:text-foreground transition-colors">
                  Publicações
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Redes Sociais</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LEVEL USP - Universidade de São Paulo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
