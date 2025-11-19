import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useHabits } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'

export default function ModifyHabitDialog({ habit, onClose }) {
  const { updateHabit, deleteHabit } = useHabits()
  const [name, setName] = useState(habit.name)
  const [streakStartDate, setStreakStartDate] = useState(habit.streakStartDate)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Modify Habit</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white/90 mb-2 font-medium">Habit Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter habit name"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2 font-medium">Streak Start Date</label>
            <input
              type="date"
              value={streakStartDate}
              onChange={(e) => setStreakStartDate(e.target.value)}
              max={formatDate(new Date())}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div className="pt-4 border-t border-white/20">
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-300 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Habit
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-white/80 text-sm mb-2">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 border border-red-500/50 rounded-lg text-red-300 font-medium transition-colors"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

