import { useMemo } from 'react'
import { HabitProvider, useHabits } from './contexts/HabitContext'
import HabitCard from './components/HabitCard'
import AIInsights from './components/AIInsights'
import AuroraBackground from './components/AuroraBackground'
import { calculateStreak } from './utils/streakCalculator'

function AppContent() {
  const { habits } = useHabits()

  const sortedHabits = useMemo(() => {
    const habitsWithStreaks = habits.map(habit => ({
      ...habit,
      streak: calculateStreak(habit),
    }))

    // Sort: High priority first, then by streak length
    const highPriority = habitsWithStreaks
      .filter(h => h.priority === 'high')
      .sort((a, b) => b.streak - a.streak)
    
    const mediumPriority = habitsWithStreaks
      .filter(h => h.priority === 'medium')
      .sort((a, b) => b.streak - a.streak)
    
    const lowPriority = habitsWithStreaks
      .filter(h => h.priority === 'low')
      .sort((a, b) => b.streak - a.streak)

    return [...highPriority, ...mediumPriority, ...lowPriority]
  }, [habits])

  const top3HighPriority = sortedHabits.filter(h => h.priority === 'high').slice(0, 3)
  const remainingHabits = sortedHabits.filter(h => !top3HighPriority.includes(h))

  return (
    <div className="min-h-screen relative">
      <AuroraBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Streak Freak
          </h1>
          <p className="text-white/80 text-lg">Your Personal Habit Tracker for Wellness</p>
        </header>

        <AIInsights />

        {top3HighPriority.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              Top 3 High Priority Streaks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {top3HighPriority.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </section>
        )}

        {remainingHabits.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">All Habits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {remainingHabits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </section>
        )}

        {habits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg">No habits yet. Start tracking your wellness journey!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <HabitProvider>
      <AppContent />
    </HabitProvider>
  )
}

export default App

