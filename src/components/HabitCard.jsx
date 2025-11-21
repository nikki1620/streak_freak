import { useState } from 'react'
import { Check, Flame, Calendar, MoreHorizontal, Edit2 } from 'lucide-react'
import { useHabits } from '../contexts/HabitContext'
import { calculateStreak, formatDate } from '../utils/streakCalculator'
import useDailyReset from '../hooks/useDailyReset'
import confetti from 'canvas-confetti'
import ModifyHabitDialog from './ModifyHabitDialog'
import CalendarEditor from './CalendarEditor'

export default function HabitCard({ habit }) {
  const { toggleDateCompletion } = useHabits()
  const [showModifyDialog, setShowModifyDialog] = useState(false)
  const [showCalendarEditor, setShowCalendarEditor] = useState(false)

  // Use our custom hook to get the current date and ensure re-renders at midnight
  const today = useDailyReset()
  const todayStr = formatDate(today)
  const isCompletedToday = habit.completedDates?.includes(todayStr)
  const streak = calculateStreak(habit)

  const handleToggleToday = () => {
    const wasCompleted = isCompletedToday
    toggleDateCompletion(habit.id, today)

    if (!wasCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#60A5FA', '#A78BFA', '#34D399', '#FBBF24']
      })
    }
  }

  const priorityColors = {
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  }

  return (
    <>
      <div className="group relative glass-panel rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl filter drop-shadow-lg">{habit.emoji}</span>
              <h3 className="text-xl font-bold text-white truncate leading-tight">
                {habit.name}
              </h3>
            </div>

            {habit.description && (
              <p className="text-white/60 text-sm line-clamp-2 mb-3 font-medium">
                {habit.description}
              </p>
            )}

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${priorityColors[habit.priority]}`}>
                {habit.priority}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-orange-300">
                <Flame className="w-3.5 h-3.5 fill-orange-300/20" />
                <span className="text-xs font-bold">{streak} Day Streak</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowModifyDialog(true)}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Edit habit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={() => setShowCalendarEditor(true)}
            className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </button>

          <button
            onClick={handleToggleToday}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300
              ${isCompletedToday
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20 hover:bg-green-400'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }
            `}
          >
            {isCompletedToday ? (
              <>
                <Check className="w-4 h-4" />
                Done Today
              </>
            ) : (
              <>
                <div className="w-4 h-4 rounded-md border-2 border-white/40" />
                Mark Done
              </>
            )}
          </button>
        </div>
      </div>

      {showModifyDialog && (
        <ModifyHabitDialog
          habit={habit}
          onClose={() => setShowModifyDialog(false)}
        />
      )}

      {showCalendarEditor && (
        <CalendarEditor
          habit={habit}
          onClose={() => setShowCalendarEditor(false)}
        />
      )}
    </>
  )
}

