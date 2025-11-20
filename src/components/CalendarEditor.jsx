import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, startOfDay } from 'date-fns'
import { X, Check } from 'lucide-react'
import { useHabits } from '../contexts/HabitContext'
import { formatDate } from '../utils/streakCalculator'

export default function CalendarEditor({ habit, onClose }) {
  const { toggleDateCompletion } = useHabits()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const streakStart = parseISO(habit.streakStartDate)
  const today = new Date()
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  
  // Get all days in the month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Filter to only show days from streak start date onwards
  const visibleDays = daysInMonth.filter(day => {
    const dayStart = startOfDay(day)
    const streakStartDay = startOfDay(streakStart)
    const todayDay = startOfDay(today)
    return dayStart >= streakStartDay && dayStart <= todayDay
  })

  const isCompleted = (date) => {
    const dateStr = formatDate(date)
    return habit.completedDates?.includes(dateStr) || false
  }

  const handleDateClick = (date) => {
    toggleDateCompletion(habit.id, date)
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    const nextMonthStart = startOfMonth(nextMonth)
    const todayStart = startOfMonth(today)
    if (nextMonthStart <= todayStart) {
      setCurrentMonth(nextMonth)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[14000] flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white pr-2">
            <span className="hidden sm:inline">Edit Calendar - </span>
            {habit.name}
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors flex-shrink-0 p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between gap-2">
          <button
            onClick={goToPreviousMonth}
            disabled={currentMonth <= startOfMonth(streakStart)}
            className="px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            <span className="hidden sm:inline">← Previous</span>
            <span className="sm:hidden">←</span>
          </button>
          <h3 className="text-lg md:text-xl font-semibold text-white text-center flex-1">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={goToNextMonth}
            disabled={currentMonth >= startOfMonth(today)}
            className="px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            <span className="hidden sm:inline">Next →</span>
            <span className="sm:hidden">→</span>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-white/80 text-sm font-semibold py-2 tracking-wide">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day, idx) => {
            const isVisible = visibleDays.some(d => isSameDay(d, day))
            const completed = isCompleted(day)
            const isToday = isSameDay(day, today)
            const isInMonth = isSameMonth(day, currentMonth)

            if (!isInMonth || !isVisible) {
              return <div key={idx} className="aspect-square" />
            }

            return (
              <button
                key={idx}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square rounded-xl transition-all border border-white/10
                  ${completed
                    ? 'bg-green-500/90 hover:bg-green-500 text-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/15 text-white/90'
                  }
                  ${isToday ? 'ring-2 ring-yellow-300' : ''}
                  flex items-center justify-center
                `}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">{format(day, 'd')}</span>
                  {completed && <Check className="w-3 h-3 mt-0.5" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

