import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Trash2, CalendarCheck } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { useHabits, CATEGORIES } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'
import CalendarEditor from './CalendarEditor'
import { motion, AnimatePresence } from 'framer-motion'

export default function ModifyHabitDialog({ habit, onClose }) {
  const { updateHabit, deleteHabit } = useHabits()
  const [name, setName] = useState(habit.name)
  const [emoji, setEmoji] = useState(habit.emoji || '🔥')
  const [category, setCategory] = useState(habit.category || CATEGORIES[0])
  const [streakStartDate, setStreakStartDate] = useState(habit.streakStartDate)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showCalendarEditor, setShowCalendarEditor] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const dialogRef = useRef(null)

  const handleSave = () => {
    updateHabit(habit.id, {
      name: name.trim(),
      emoji: emoji,
      category: category,
      streakStartDate: streakStartDate,
    })
    onClose()
  }

  const handleDelete = () => {
    deleteHabit(habit.id)
    onClose()
  }

  // Focus trap logic omitted for brevity but should be included in production
  // For this implementation, we'll rely on the modal overlay to block interaction

  const modalContent = (
    <div className="dialog-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="dialog-content w-full max-w-2xl p-8"
        ref={dialogRef}
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50 font-bold">Habit Settings</p>
            <h2 className="text-3xl font-bold text-white mt-2">Modify Habit</h2>
            <p className="text-sm text-white/60 mt-1">Adjust the essentials for this habit.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm((prev) => !prev)}
              className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-colors"
              title="Delete Habit"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Habit Name & Icon</label>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="w-14 h-14 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-3xl hover:bg-white/10 transition-colors"
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
                className="glass-input flex-1 px-4 py-3 rounded-xl text-lg"
                placeholder="Enter habit name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Category</label>
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
            <label className="block text-sm font-semibold text-white/80 mb-2">Streak Start Date</label>
            <input
              type="date"
              value={streakStartDate}
              onChange={(e) => setStreakStartDate(e.target.value)}
              max={formatDate(new Date())}
              className="glass-input w-full px-4 py-3 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Edit Calendar</label>
            <button
              type="button"
              onClick={() => setShowCalendarEditor(true)}
              className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white/90 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold text-white">Mark Progress</p>
                  <p className="text-xs text-white/50">Open the calendar to toggle completed days.</p>
                </div>
              </div>
              <span className="text-white/40 text-sm font-medium group-hover:text-white/80 transition-colors">Open</span>
            </button>
          </div>

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
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-900/20"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex gap-3 justify-end pt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold transition-colors border border-white/10"
          >
            Save Changes
          </button>
        </div>
      </motion.div>

      {showCalendarEditor && (
        <CalendarEditor
          habit={habit}
          onClose={() => setShowCalendarEditor(false)}
        />
      )}
    </div>
  )

  return createPortal(modalContent, document.body)
}
