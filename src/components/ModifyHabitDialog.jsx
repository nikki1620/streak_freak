import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Trash2, CalendarCheck } from 'lucide-react'
import { useHabits } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'
import CalendarEditor from './CalendarEditor'

export default function ModifyHabitDialog({ habit, onClose }) {
  const { updateHabit, deleteHabit } = useHabits()
  const [name, setName] = useState(habit.name)
  const [streakStartDate, setStreakStartDate] = useState(habit.streakStartDate)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showCalendarEditor, setShowCalendarEditor] = useState(false)
  const dialogRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  const handleSave = () => {
    updateHabit(habit.id, {
      name: name.trim(),
      streakStartDate: streakStartDate,
    })
    onClose()
  }

  const handleDelete = () => {
    deleteHabit(habit.id)
    onClose()
  }

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ]

    const focusFirstElement = () => {
      if (!dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(focusableSelectors.join(','))
      if (focusable.length > 0) {
        focusable[0].focus()
      } else {
        dialogRef.current.focus()
      }
    }

    const trapFocus = (event) => {
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(focusableSelectors.join(','))
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      trapFocus(event)
    }

    focusFirstElement()
    document.addEventListener('keydown', handleKeyDown, true)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = ''
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus()
      }
    }
  }, [onClose])

  const modalContent = (
    <>
      <div
        className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-xl z-[13000] flex items-center justify-center p-4 transition-opacity duration-200 pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modify-habit-title"
        onClick={onClose}
      >
        <div
          ref={dialogRef}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 max-w-2xl w-full shadow-2xl text-white focus:outline-none transition-transform duration-200"
          tabIndex={-1}
        >
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Habit Settings</p>
            <h2 id="modify-habit-title" className="text-3xl font-bold text-white mt-2">
              Modify Habit
            </h2>
            <p className="text-sm text-white/70">Adjust the essentials for this habit.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm((prev) => !prev)}
              className="p-2 rounded-xl border border-white/20 bg-white/5 text-red-200 hover:bg-red-500/10 hover:text-red-100 transition-colors"
              aria-label="Delete habit"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close modify habit dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Habit Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Enter habit name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Streak Start Date</label>
            <input
              type="date"
              value={streakStartDate}
              onChange={(e) => setStreakStartDate(e.target.value)}
              max={formatDate(new Date())}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Edit Calendar</label>
            <button
              type="button"
              onClick={() => setShowCalendarEditor(true)}
              className="w-full flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white/90 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Mark Progress</p>
                  <p className="text-xs text-white/60">Open the calendar to toggle completed days.</p>
                </div>
              </div>
              <span className="text-white/60 text-sm">Open</span>
            </button>
          </div>

          {showDeleteConfirm && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4">
              <p className="text-sm text-white/80 mb-3">Are you sure you want to delete this habit?</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-500/70 hover:bg-red-500 text-white font-semibold transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-2xl bg-white/25 hover:bg-white/35 text-white font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
      </div>

      {showCalendarEditor && (
        <CalendarEditor
          habit={habit}
          onClose={() => setShowCalendarEditor(false)}
        />
      )}
    </>
  )

  // Render modal & overlay at the document root to avoid stacking issues
  return createPortal(modalContent, document.body)
}

