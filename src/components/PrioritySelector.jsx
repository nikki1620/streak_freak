import { Check } from 'lucide-react'

export default function PrioritySelector({ priority, onSelect, onClose }) {
  const priorities = [
    { value: 'high', label: 'High', color: 'text-red-400', bg: 'bg-red-500/20' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    { value: 'low', label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  ]

  return (
    <div className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 min-w-[150px]">
      {priorities.map((p) => (
        <button
          key={p.value}
          onClick={() => {
            onSelect(p.value)
            onClose()
          }}
          className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
            priority === p.value ? p.bg : ''
          }`}
        >
          <span className={`${p.color} font-medium`}>{p.label}</span>
          {priority === p.value && <Check className="w-4 h-4 text-white" />}
        </button>
      ))}
    </div>
  )
}

