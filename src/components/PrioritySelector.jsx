import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Check, X } from 'lucide-react'

export default function PrioritySelector({ priority, onSelect, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const priorities = [
    { value: 'high', label: 'High Priority', emoji: '🔥', border: 'border-red-400/60' },
    { value: 'medium', label: 'Medium Priority', emoji: '⚡️', border: 'border-yellow-300/70' },
    { value: 'low', label: 'Low Priority', emoji: '🌊', border: 'border-blue-300/70' },
  ]

  return createPortal(
    <div
      className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/70 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-3xl border border-white/20 bg-slate-900/95 shadow-2xl text-white overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Set Priority</p>
            <p className="text-lg font-semibold">Choose importance level</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close priority selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col divide-y divide-white/5">
          {priorities.map((p) => {
            const isActive = priority === p.value
            return (
              <button
                key={p.value}
                onClick={() => onSelect(p.value)}
                className={`flex items-center justify-between px-6 py-4 text-left transition-colors
                  ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl" aria-hidden>{p.emoji}</span>
                  <div>
                    <p className="text-base font-semibold">{p.label}</p>
                    <p className="text-xs text-white/70">
                      {p.value === 'high' && 'Daily essential habit'}
                      {p.value === 'medium' && 'Important but flexible'}
                      {p.value === 'low' && 'Maintain when possible'}
                    </p>
                  </div>
                </div>
                {isActive && <Check className="w-5 h-5 text-white" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

