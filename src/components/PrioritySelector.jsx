import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Check, X, Flame, Zap, Droplets } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
    {
      value: 'high',
      label: 'High Priority',
      icon: Flame,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      desc: 'Daily essential habit'
    },
    {
      value: 'medium',
      label: 'Medium Priority',
      icon: Zap,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      desc: 'Important but flexible'
    },
    {
      value: 'low',
      label: 'Low Priority',
      icon: Droplets,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      desc: 'Maintain when possible'
    },
  ]

  return createPortal(
    <div
      className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm mx-4 rounded-3xl border border-white/20 bg-[#0f172a] shadow-2xl text-white overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Select Level</p>
            <h3 className="text-lg font-bold">Set Priority</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {priorities.map((p) => {
            const isActive = priority === p.value
            const Icon = p.icon
            return (
              <button
                key={p.value}
                onClick={() => onSelect(p.value)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200
                  ${isActive
                    ? `${p.bg} ${p.border} shadow-lg`
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-white/10' : 'bg-white/5'} ${p.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className={`font-bold ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {p.label}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">{p.desc}</p>
                  </div>
                </div>
                {isActive && (
                  <div className={`p-1 rounded-full ${p.color} bg-white/10`}>
                    <Check className="w-5 h-5" strokeWidth={3} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
