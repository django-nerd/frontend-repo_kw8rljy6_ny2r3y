import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import History from './components/History'

export default function App() {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const outputRef = useRef(null)

  useEffect(() => {
    outputRef.current = document.getElementById('rewrite-output')
  }, [])

  const outline = [
    'Introduction & thesis',
    'Key arguments',
    'Counterarguments',
    'Evidence & examples',
    'Conclusion',
  ]

  const checklist = [
    'Clear thesis in the introduction',
    'Each paragraph has a topic sentence',
    'Evidence cited and explained',
    'Logical transitions between ideas',
    'Conclusion reinforces the thesis without repeating',
  ]

  const handleNew = () => {
    setNotes('')
    if (outputRef.current) outputRef.current.textContent = ''
  }

  const handleSettings = () => {
    alert('Settings coming soon')
  }

  const requestRewrite = async (text, mode) => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(base + '/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode }),
      })
      if (!res.ok) throw new Error('Rewrite failed')
      const data = await res.json()
      if (outputRef.current) outputRef.current.textContent = data.rewritten
    } catch (e) {
      if (outputRef.current) outputRef.current.textContent = 'Error: ' + e.message
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50">
      <Navbar onNew={handleNew} onOpenSettings={handleSettings} />

      <main className="max-w-6xl mx-auto grid grid-cols-[20rem_1fr] gap-6 p-4">
        <Sidebar outline={outline} notes={notes} setNotes={setNotes} checklist={checklist} />

        <div className="space-y-4">
          <Editor onRewrite={requestRewrite} loading={loading} />
          <History />
        </div>
      </main>
    </div>
  )
}
