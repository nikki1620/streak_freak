import { useState } from 'react'
import { X, Plus, Smile } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { useHabits, CATEGORIES } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'
import PrioritySelector from './PrioritySelector'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddHabitDialog({ onClose }) {
  const { addHabit } = useHabits()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [emoji, setEmoji] = useState('🔥')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
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
    high: 'bg-red-500/20 border-red-500/30 text-red-300',
    medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
    low: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    addHabit({
      name: name.trim(),
      description: description.trim(),
      frequency: frequency || 'daily',
      priority: priority,
      category: category,
      emoji: emoji,
      streakStartDate: formatDate(new Date()),
    })

    setName('')
    setDescription('')
    setFrequency('daily')
    setPriority('medium')
    setCategory(CATEGORIES[0])
    setEmoji('🔥')
    onClose()
  }

  return (
    <div className="dialog-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="dialog-content w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-xl">
              <Plus className="w-5 h-5" />
            </div>
            Add New Habit
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Habit Name & Icon <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-2xl hover:bg-white/10 transition-colors"
                >
                  {emoji}
                </button>
                <AnimatePresence>
                  {showEmojiPicker && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowEmojiPicker(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 z-50"
                      >
                        <EmojiPicker
                          theme="dark"
                          onEmojiClick={(emojiData) => {
                            setEmoji(emojiData.emoji)
                            setShowEmojiPicker(false)
                          }}
                          width={300}
                          height={400}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-input flex-1 px-4 py-3 rounded-xl"
                placeholder="e.g., Morning Jog"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
                    ${category === cat
                      ? 'bg-white text-purple-900 shadow-lg shadow-white/10'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Description <span className="text-white/40">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl resize-none"
              placeholder="Add a description..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFrequency(option.value)}
                  className={`
                    px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${frequency === option.value
                      ? 'bg-white/20 border border-white/30 text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Priority
            </label>
            <button
              type="button"
              onClick={() => setShowPrioritySelector(!showPrioritySelector)}
              className={`
                w-full px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between
                ${priorityColors[priority]}
                hover:opacity-80
              `}
            >
              <span>{priorityLabels[priority]} Priority</span>
              <span className="text-xs opacity-60">▼</span>
            </button>
            <AnimatePresence>
              {showPrioritySelector && (
                <div className="absolute left-0 right-0 top-full mt-2 z-10">
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
            </AnimatePresence>
          </div>

          <div className="pt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Habit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
