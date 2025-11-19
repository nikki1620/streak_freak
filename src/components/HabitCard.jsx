import { Flame } from 'lucide-react'
import { calculateStreak } from '../utils/streakCalculator'
import KebabMenu from './KebabMenu'

export default function HabitCard({ habit }) {
  const streak = calculateStreak(habit)

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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-visible">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{habit.name}</h3>
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
        <div className="relative z-10">
          <KebabMenu habit={habit} />
        </div>
      </div>
    </div>
  )
}

