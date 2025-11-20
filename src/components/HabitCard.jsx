import { useState } from 'react'
import { Flame, Calendar } from 'lucide-react'
import { calculateStreak } from '../utils/streakCalculator'
import KebabMenu from './KebabMenu'
import CalendarEditor from './CalendarEditor'

export default function HabitCard({ habit }) {
  const streak = calculateStreak(habit)
  const [showCalendarEditor, setShowCalendarEditor] = useState(false)

  const priorityColors = {
    high: 'bg-red-500/30 border-red-500/50 text-red-300',
    medium: 'bg-yellow-500/30 border-yellow-500/50 text-yellow-300',
    low: 'bg-blue-500/30 border-blue-500/50 text-blue-300',
  }

  const priorityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{habit.name}</h3>
            {habit.description && (
              <p className="text-white/70 text-sm mb-2">{habit.description}</p>
            )}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                <span className="text-3xl font-bold text-white drop-shadow-md">{streak}</span>
                <span className="text-white/70 text-sm">day{streak !== 1 ? 's' : ''}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${priorityColors[habit.priority]}`}>
                {priorityLabels[habit.priority]} Priority
              </span>
            </div>
          </div>
          <div className="relative flex-shrink-0 ml-2">
            <KebabMenu habit={habit} />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <button
            onClick={() => setShowCalendarEditor(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white/90 hover:text-white transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Mark Progress on Calendar</span>
          </button>
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
}

