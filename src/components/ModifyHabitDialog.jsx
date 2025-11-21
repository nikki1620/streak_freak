import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Trash2 } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { useHabits, CATEGORIES } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'
import PrioritySelector from './PrioritySelector'
import { motion, AnimatePresence } from 'framer-motion'

export default function ModifyHabitDialog({ habit, onClose }) {
  const { updateHabit, deleteHabit } = useHabits()
  const [name, setName] = useState(habit.name)
  const [description, setDescription] = useState(habit.description || '')
  const [emoji, setEmoji] = useState(habit.emoji || '🔥')
  const [category, setCategory] = useState(habit.category || CATEGORIES[0])
  const [streakStartDate, setStreakStartDate] = useState(habit.streakStartDate)
  const [priority, setPriority] = useState(habit.priority || 'medium')
  const [hasEndDate, setHasEndDate] = useState(habit.hasEndDate || false)
  const [streakEndDate, setStreakEndDate] = useState(habit.streakEndDate || '')

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showPrioritySelector, setShowPrioritySelector] = useState(false)
  const dialogRef = useRef(null)

  // Disable body and root scroll when dialog is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('root').style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
      document.getElementById('root').style.overflow = 'unset'
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    updateHabit(habit.id, {
      name: name.trim(),
      description: description.trim(),
      emoji: emoji,
      category: category,
      streakStartDate: streakStartDate,
      priority: priority,
      hasEndDate: hasEndDate,
      streakEndDate: hasEndDate ? streakEndDate : null,
    })
    onClose()
  }

  const handleDelete = () => {
    deleteHabit(habit.id)
    onClose()
  }

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

  const modalContent = (
    <div className="dialog-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="dialog-content w-full max-w-lg md:max-w-2xl max-h-[90dvh] flex flex-col"
        ref={dialogRef}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50 font-bold">Habit Settings</p>
            <h2 className="text-2xl font-bold text-white mt-1">Modify Habit</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm((prev) => !prev)}
              className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-colors"
              title="Delete Habit"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 overscroll-contain">
          <form id="modify-habit-form" onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Habit Name & Icon</label>
              <div className="flex gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl hover:bg-white/10 transition-colors"
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
                  placeholder="Enter habit name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c !== 'Successful').map((cat) => (
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
              <label className="block text-sm font-semibold text-white/80 mb-2">Streak Start Date</label>
              <input
                type="date"
                value={streakStartDate}
                onChange={(e) => setStreakStartDate(e.target.value)}
                max={formatDate(new Date())}
                className="glass-input w-full px-4 py-3 rounded-xl"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-white/80 mb-2">Select Priority</label>
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

            <div className="flex items-center justify-between">
              <label className="text-white/80 text-sm font-medium">
                Does this streak end?
              </label>
              <button
                type="button"
                onClick={() => setHasEndDate(!hasEndDate)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${hasEndDate ? 'bg-purple-500' : 'bg-white/10'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 rounded-full bg-white transition-all
                    ${hasEndDate ? 'left-7' : 'left-1'}
                  `}
                />
              </button>
            </div>

            <AnimatePresence>
              {hasEndDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Select Streak End Date
                  </label>
                  <input
                    type="date"
                    value={streakEndDate}
                    onChange={(e) => setStreakEndDate(e.target.value)}
                    min={streakStartDate}
                    className="glass-input w-full px-4 py-3 rounded-xl"
                    required={hasEndDate}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 overflow-hidden"
                >
                  <p className="text-sm text-red-200 mb-3 font-medium">Are you sure you want to delete this habit? This action cannot be undone.</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-900/20"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div className="p-6 border-t border-white/10 shrink-0 flex gap-3 bg-slate-900/50 backdrop-blur-xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="modify-habit-form"
            className="flex-1 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold transition-colors border border-white/10"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
