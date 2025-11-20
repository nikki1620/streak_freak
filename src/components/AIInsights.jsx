import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Trophy, CheckCircle, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHabits } from '../contexts/HabitContext'
import { calculateStreak, formatDate } from '../utils/streakCalculator'

export default function AIInsights() {
  const { habits } = useHabits()
  const [isExpanded, setIsExpanded] = useState(true)

  // Calculate stats
  const activeHabits = habits.length
  const longestStreak = Math.max(0, ...habits.map(h => calculateStreak(h)))
  const todayStr = formatDate(new Date())
  const doneToday = habits.filter(h => h.completedDates?.includes(todayStr)).length

  return (
    <div className="glass-panel rounded-3xl p-1 mb-10 overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors rounded-2xl group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white">Hey Nikhila, seize the day! 🚀</h2>
            {!isExpanded && (
              <p className="text-xs text-white/50 font-medium">Click to view your daily briefing</p>
            )}
          </div>
        </div>
        <div className="p-2 rounded-full bg-white/5 text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full -mr-10 -mt-10" />
                <p className="text-lg text-white/90 font-medium leading-relaxed relative z-10">
                  "Discipline is the bridge between goals and accomplishment. You're building that bridge every single day. Keep pushing, the momentum is on your side!"
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <div className="mb-2 p-2 rounded-full bg-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-white mb-0.5">{longestStreak}</span>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Best Streak</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <div className="mb-2 p-2 rounded-full bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-white mb-0.5">{doneToday}</span>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Done Today</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <div className="mb-2 p-2 rounded-full bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-white mb-0.5">{activeHabits}</span>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Active Habits</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExpanded && (
        <div className="px-6 pb-4 flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-medium text-white/60">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span>Best: <span className="text-white">{longestStreak}</span></span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-sm font-medium text-white/60">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Today: <span className="text-white">{doneToday}</span></span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-sm font-medium text-white/60">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Active: <span className="text-white">{activeHabits}</span></span>
          </div>
        </div>
      )}
    </div>
  )
}
