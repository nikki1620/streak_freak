import { useState } from 'react'
import { useHabits, CATEGORIES } from './contexts/HabitContext'
import HabitCard from './components/HabitCard'
import AddHabitDialog from './components/AddHabitDialog'
import WeeklyProgress from './components/WeeklyProgress'
import Navbar from './components/Navbar'
import AIInsights from './components/AIInsights'
import AuroraBackground from './components/AuroraBackground'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import { useAuth } from './contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

function AppContent() {
  const { habits } = useHabits()
  const { user, loading } = useAuth()
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [showWeeklyProgress, setShowWeeklyProgress] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  const highPriorityHabits = habits.filter(h => h.priority === 'high')

  const filteredHabits = habits.filter(h => {
    const today = new Date().toISOString().split('T')[0]
    const isSuccessful = h.hasEndDate && h.streakEndDate && h.streakEndDate < today

    // Successful Tab Logic
    if (selectedCategory === 'Successful') {
      return isSuccessful
    }

    // Exclude successful habits from other tabs
    if (isSuccessful) return false

    if (selectedCategory === 'All') {
      return h.frequency === 'daily'
    }
    return h.category === selectedCategory
  })

  return (
    <div className="min-h-screen text-white font-sans selection:bg-purple-500/30 pb-20">
      <AuroraBackground />

      <Navbar
        onAddHabit={() => setShowAddHabit(true)}
        onWeeklyProgress={() => setShowWeeklyProgress(true)}
        user={user}
      />

      <main className="container mx-auto px-4 pt-28 pb-32 max-w-5xl">
        <AIInsights />

        {/* High Priority Streaks Section */}
        {highPriorityHabits.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <span className="text-red-400">●</span>
              High Priority Streaks
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {highPriorityHabits.map((habit) => (
                  <motion.div
                    key={`high-${habit.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HabitCard habit={habit} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-purple-400">●</span>
              Your Streaks
            </h2>
            <span className="text-white/40 text-sm font-medium">
              {filteredHabits.length} {filteredHabits.length === 1 ? 'Streak' : 'Streaks'}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`
                whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all
                ${selectedCategory === 'All'
                  ? 'bg-white text-purple-900 shadow-lg shadow-white/10'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              Daily
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all
                  ${selectedCategory === cat
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

        {filteredHabits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 glass-panel rounded-3xl border-dashed border-2 border-white/10"
          >
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold text-white mb-2">No streaks found</h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              {selectedCategory === 'All'
                ? "You haven't started any daily streaks yet. This is the beginning of your journey!"
                : `You don't have any streaks in the "${selectedCategory}" category yet.`
              }
            </p>
            <button
              onClick={() => setShowAddHabit(true)}
              className="px-8 py-3 bg-white text-purple-900 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-white/10"
            >
              Create First Streak
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredHabits.map((habit) => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <HabitCard habit={habit} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />

      <AnimatePresence>
        {showAddHabit && <AddHabitDialog onClose={() => setShowAddHabit(false)} />}
        {showWeeklyProgress && <WeeklyProgress onClose={() => setShowWeeklyProgress(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return <AppContent />
}
