import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { useHabits } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'
import PrioritySelector from './PrioritySelector'

export default function AddHabitDialog({ onClose }) {
  const { addHabit } = useHabits()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [priority, setPriority] = useState('medium')
  const [showPrioritySelector, setShowPrioritySelector] = useState(false)

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'custom', label: 'Custom' },
  ]

  const priorityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  }

  const priorityColors = {
    high: 'bg-red-500/30 border-red-500/50 text-red-300',
    medium: 'bg-yellow-500/30 border-yellow-500/50 text-yellow-300',
    low: 'bg-blue-500/30 border-blue-500/50 text-blue-300',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      return
    }

    addHabit({
      name: name.trim(),
      description: description.trim(),
      frequency: frequency || 'daily',
      priority: priority,
      streakStartDate: formatDate(new Date()),
    })

    // Reset form
    setName('')
    setDescription('')
    setFrequency('daily')
    setPriority('medium')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add New Habit
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 mb-2 font-medium">
              Habit Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="e.g., Exercise, Read, Meditate"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2 font-medium">
              Description <span className="text-white/50 text-sm">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              placeholder="Add a description for your habit..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2 font-medium">
              Frequency <span className="text-white/50 text-sm">(optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFrequency(option.value)}
                  className={`
                    px-2 md:px-4 py-2 rounded-lg border transition-all text-sm md:text-base
                    ${frequency === option.value
                      ? 'bg-white/20 border-white/50 text-white'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <label className="block text-white/90 mb-2 font-medium">
              Priority
            </label>
            <button
              type="button"
              onClick={() => setShowPrioritySelector(!showPrioritySelector)}
              className={`
                w-full px-4 py-2 rounded-lg border text-left transition-all
                ${priorityColors[priority]}
                hover:opacity-80
              `}
            >
              {priorityLabels[priority]} Priority
            </button>
            {showPrioritySelector && (
              <div className="absolute left-0 top-full mt-2 z-10">
                <PrioritySelector
                  priority={priority}
                  onSelect={(selectedPriority) => {
                    setPriority(selectedPriority)
                    setShowPrioritySelector(false)
                  }}
                  onClose={() => setShowPrioritySelector(false)}
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/20 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

