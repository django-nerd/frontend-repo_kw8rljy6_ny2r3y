import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

export default function History() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Load recent documents from backend
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(base + '/api/documents')
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        }
      } catch (e) {
        // ignore for now
      }
    }
    load()
  }, [])

  return (
    <div className="bg-white/70 backdrop-blur rounded-md border border-gray-200 p-3">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} />
        <h3 className="text-sm font-semibold text-gray-700">Recent documents</h3>
      </div>
      <ul className="divide-y">
        {items.length === 0 && (
          <li className="py-6 text-sm text-gray-500 text-center">No documents yet</li>
        )}
        {items.map((it) => (
          <li key={it.id} className="py-2">
            <div className="text-sm font-medium text-gray-900">{it.title || 'Untitled'}</div>
            <div className="text-xs text-gray-500">{new Date(it.created_at?.$date || Date.now()).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
