"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Square, RotateCcw, Plus } from "lucide-react"

interface JupyterCell {
  type: "code" | "markdown"
  content: string
  output?: any
}

interface JupyterNotebookProps {
  cells: JupyterCell[]
  onCellChange?: (index: number, content: string) => void
  onRunCell?: (index: number) => void
}

export function JupyterNotebook({ cells, onCellChange, onRunCell }: JupyterNotebookProps) {
  const [activeCellIndex, setActiveCellIndex] = useState(0)
  const [cellOutputs, setCellOutputs] = useState<{ [key: number]: any }>({})

  const executeCode = async (cellIndex: number, code: string) => {
    try {
      // Simular execução de código Python
      let output = null

      if (code.includes("import pandas as pd")) {
        output = "Pandas imported successfully"
      } else if (code.includes("df_repair = pd.read_csv")) {
        output = "Dataset loaded successfully"
      } else if (code.includes("df_repair.head()")) {
        output = {
          type: "dataframe",
          columns: [
            "country",
            "product_category",
            "brand",
            "year_of_manufacture",
            "product_age",
            "repair_status",
            "year_repaired",
          ],
          data: [
            ["gor", "airconditioner", "delonghi", "2013.0", "6.0", "end of life", "2019"],
            ["nld", "kettle", "royal swiss", "2019.0", "0.0", "fixed", "2019"],
            ["swe", "mobile", "apple", "2015.0", "3.0", "repairable", "2018"],
            ["ita", "desktop computer", "dell", "2011.0", "10.0", "fixed", "2021"],
            ["bel", "power tool", "makita", "2015.0", "4.0", "end of life", "2019"],
          ],
        }
      } else if (code.includes("print(")) {
        const match = code.match(/print$$['"](.+?)['"]$$/)
        output = match ? match[1] : "Hello World"
      } else {
        // Executar código JavaScript como fallback
        try {
          const result = eval(code)
          output = String(result)
        } catch (e) {
          output = `Error: ${e.message}`
        }
      }

      setCellOutputs((prev) => ({
        ...prev,
        [cellIndex]: output,
      }))

      onRunCell?.(cellIndex)
    } catch (error) {
      setCellOutputs((prev) => ({
        ...prev,
        [cellIndex]: `Error: ${error.message}`,
      }))
    }
  }

  const renderOutput = (output: any) => {
    if (!output) return null

    if (output.type === "dataframe") {
      return (
        <div className="mt-2 border border-gray-300 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {output.columns.map((col: string, i: number) => (
                  <th key={i} className="px-3 py-2 text-left font-medium text-gray-700 border-r border-gray-200">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {output.data.map((row: string[], i: number) => (
                <tr key={i} className="border-t border-gray-200">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className="px-3 py-2 border-r border-gray-200 text-gray-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded text-sm font-mono text-gray-800">{output}</div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Jupyter Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#F37626"
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700">jupyter</span>
              <span className="text-sm text-gray-500">notebook</span>
              <span className="text-xs text-gray-400">Last Checkpoint: 05/02/2022 (autosaved)</span>
            </div>
            <div className="text-sm text-gray-500">Python 3 (ipykernel)</div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Not Trusted</span>
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* Jupyter Toolbar */}
        <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => executeCode(activeCellIndex, cells[activeCellIndex]?.content || "")}
          >
            <Play className="h-4 w-4" />
          </Button>
          <div className="mx-2 h-4 w-px bg-gray-300"></div>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Code</option>
            <option>Markdown</option>
          </select>
        </div>
      </div>

      {/* Notebook Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-1">
          {cells.map((cell, index) => (
            <div
              key={index}
              className={`border-l-4 ${
                activeCellIndex === index ? "border-blue-500 bg-blue-50/30" : "border-transparent"
              } hover:border-gray-300 transition-colors`}
              onClick={() => setActiveCellIndex(index)}
            >
              <div className="flex">
                {/* Cell Input */}
                <div className="flex-shrink-0 w-16 text-right pr-2 py-2">
                  <span className="text-sm text-gray-500 font-mono">In [{index + 1}]:</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="border border-gray-200 rounded">
                    <textarea
                      value={cell.content}
                      onChange={(e) => onCellChange?.(index, e.target.value)}
                      className="w-full p-3 font-mono text-sm border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-gray-900 bg-white"
                      rows={cell.content.split("\n").length}
                      style={{ minHeight: "40px" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          e.preventDefault()
                          executeCode(index, cell.content)
                        }
                      }}
                    />
                  </div>

                  {/* Cell Output */}
                  {(cellOutputs[index] || cell.output) && (
                    <div className="mt-1">
                      <div className="flex">
                        <div className="flex-shrink-0 w-16 text-right pr-2 py-2">
                          <span className="text-sm text-red-600 font-mono">Out[{index + 1}]:</span>
                        </div>
                        <div className="flex-1">{renderOutput(cellOutputs[index] || cell.output)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
