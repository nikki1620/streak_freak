import { useHabits } from '../contexts/HabitContext'
import { generateInsights } from '../utils/aiInsights'
import { Sparkles } from 'lucide-react'

export default function AIInsights() {
  const { habits } = useHabits()
  const insights = generateInsights(habits)

  return (
    <div className="mb-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        <h2 className="text-xl font-bold text-white drop-shadow-md">AI Insights</h2>
      </div>
      <div className="space-y-3">
        <p className="text-white/90 text-lg font-semibold">{insights.message}</p>
        <p className="text-white/80 italic">"{insights.affirmation}"</p>
        {insights.stats && Object.keys(insights.stats).length > 0 && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
            {insights.stats.longestStreak !== undefined && (
              <div>
                <span className="text-white/60 text-sm">Longest Streak</span>
                <p className="text-white font-bold text-lg">{insights.stats.longestStreak} days</p>
              </div>
            )}
            {insights.stats.activeHabits !== undefined && (
              <div>
                <span className="text-white/60 text-sm">Active Habits</span>
                <p className="text-white font-bold text-lg">{insights.stats.activeHabits}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

