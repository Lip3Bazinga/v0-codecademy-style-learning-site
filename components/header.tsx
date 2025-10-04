"use client"

import { Button } from "@/components/ui/button"
import { User, LogIn, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/level-usp-logo.png" alt="LEVEL USP" width={40} height={40} className="rounded-lg" />
          <span className="text-xl font-bold text-foreground">LEVEL USP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/cursos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cursos
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contato
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/cadastro">
              <User className="h-4 w-4 mr-2" />
              Cadastrar
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-3">
            <Link href="/cursos" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Cursos
            </Link>
            <Link href="/sobre" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Sobre
            </Link>
            <Link href="/contato" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Contato
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/cadastro">
                  <User className="h-4 w-4 mr-2" />
                  Cadastrar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
