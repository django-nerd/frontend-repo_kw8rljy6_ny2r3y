import { useState } from 'react'
import { Type, AlignLeft, Minimize2, Maximize2, List, FileText, ArrowRight } from 'lucide-react'

const MODES = [
  { key: 'clarity', label: 'Clarity', icon: AlignLeft },
  { key: 'concise', label: 'Concise', icon: Minimize2 },
  { key: 'formal', label: 'Formal', icon: Type },
  { key: 'expand', label: 'Expand', icon: Maximize2 },
  { key: 'summarize', label: 'Summarize', icon: FileText },
  { key: 'bulletize', label: 'Bulletize', icon: List },
]

export default function Editor({ initialText = '', onRewrite, loading }) {
  const [text, setText] = useState(initialText)
  const [mode, setMode] = useState('clarity')

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-3 border-b bg-white/70 backdrop-blur">
        {MODES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border ${mode===key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => onRewrite?.(text, mode)}
            disabled={loading || !text.trim()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-3 py-2 rounded-md"
          >
            Rewrite <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0 flex-1 min-h-[60vh]">
        <textarea
          className="w-full h-full resize-none p-4 font-serif text-base border-r outline-none"
          placeholder="Paste or write here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="h-full p-4 prose max-w-none overflow-auto">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Output</h4>
          {loading ? (
            <div className="animate-pulse text-gray-500">Processing...</div>
          ) : (
            <div id="rewrite-output" className="whitespace-pre-wrap"></div>
          )}
        </div>
      </div>
    </div>
  )
}
