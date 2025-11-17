import { Menu, PenSquare, Settings } from 'lucide-react'

export default function Navbar({ onNew, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-gray-100"><Menu size={20} /></button>
          <div className="font-semibold text-gray-900 tracking-tight">Inkflow</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNew} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md">
            <PenSquare size={16} /> New Document
          </button>
          <button onClick={onOpenSettings} className="p-2 rounded hover:bg-gray-100">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
