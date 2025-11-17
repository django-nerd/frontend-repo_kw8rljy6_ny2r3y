import { useState } from 'react'

export default function Sidebar({ outline, notes, setNotes, checklist }) {
  const [open, setOpen] = useState(true)

  return (
    <aside className={`border-r border-gray-200 bg-white/70 backdrop-blur transition-all ${open ? 'w-80' : 'w-10'}`}>
      <div className="h-14 flex items-center justify-between px-3">
        <div className="text-sm font-semibold text-gray-700">Panel</div>
        <button onClick={() => setOpen(!open)} className="text-xs text-blue-600 hover:underline">{open ? 'Hide' : 'Show'}</button>
      </div>

      {open && (
        <div className="p-3 space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Outline</h3>
            <ol className="list-decimal ml-5 text-sm space-y-1">
              {outline.map((item, i) => (
                <li key={i} className="text-gray-700">{item}</li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</h3>
            <textarea
              className="w-full h-28 text-sm rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Scratchpad..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Revision checklist</h3>
            <ul className="text-sm space-y-2">
              {checklist.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-700">{c}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </aside>
  )
}
