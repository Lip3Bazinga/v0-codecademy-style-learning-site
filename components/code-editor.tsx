"use client"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  readOnly?: boolean
}

export function CodeEditor({ value, onChange, language, readOnly = false }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleInput = () => {
      onChange(textarea.value)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newValue = value.substring(0, start) + "  " + value.substring(end)
        onChange(newValue)

        // Set cursor position after the inserted spaces
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
    }

    textarea.addEventListener("input", handleInput)
    textarea.addEventListener("keydown", handleKeyDown)

    return () => {
      textarea.removeEventListener("input", handleInput)
      textarea.removeEventListener("keydown", handleKeyDown)
    }
  }, [value, onChange])

  return (
    <div className="flex-1 relative">
      <textarea
        ref={textareaRef}
        value={value}
        readOnly={readOnly}
        className="w-full h-full p-4 font-mono text-sm bg-slate-900 text-slate-100 border-0 resize-none focus:outline-none focus:ring-0"
        placeholder="Digite seu código aqui..."
        spellCheck={false}
        style={{
          lineHeight: "1.5",
          tabSize: 2,
        }}
      />

      {/* Line numbers */}
      <div className="absolute left-0 top-0 p-4 pointer-events-none text-slate-500 font-mono text-sm select-none">
        {value.split("\n").map((_, index) => (
          <div key={index} style={{ lineHeight: "1.5" }}>
            {index + 1}
          </div>
        ))}
      </div>

      {/* Code content with syntax highlighting simulation */}
      <div className="absolute left-12 top-0 p-4 pointer-events-none font-mono text-sm">
        <pre className="text-transparent" style={{ lineHeight: "1.5" }}>
          {value}
        </pre>
      </div>
    </div>
  )
}
