import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatDate } from '../utils/streakCalculator'

const HabitContext = createContext()

export function useHabits() {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabits must be used within HabitProvider')
  }
  return context
}

export const CATEGORIES = [
  'Health & Fitness',
  'Learning & Growth',
  'Money & Mindset',
  'Creativity',
  'Other',
  'Successful'
]

export function HabitProvider({ children }) {
  const [habits, setHabits] = useLocalStorage('habits', [])

  const addHabit = useCallback((habit) => {
    const newHabit = {
      id: Date.now().toString(),
      name: habit.name,
      description: habit.description || '',
      frequency: habit.frequency || 'daily',
      streakStartDate: habit.streakStartDate || formatDate(new Date()),
      hasEndDate: habit.hasEndDate || false,
      streakEndDate: habit.streakEndDate || null,
      priority: habit.priority || 'medium',
      category: habit.category || 'Other',
      emoji: habit.emoji || '✨',
      completedDates: [],
    }
    setHabits((prev) => [...prev, newHabit])
  }, [setHabits])

  const updateHabit = useCallback((id, updates) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, ...updates } : habit
      )
    )
  }, [setHabits])

  const deleteHabit = useCallback((id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }, [setHabits])

  const toggleDateCompletion = useCallback((habitId, date) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit

        const dateStr = formatDate(date)
        const completedDates = habit.completedDates || []
        const isCompleted = completedDates.includes(dateStr)

        return {
          ...habit,
          completedDates: isCompleted
            ? completedDates.filter((d) => d !== dateStr)
            : [...completedDates, dateStr],
        }
      })
    )
  }, [setHabits])

  const setPriority = useCallback((id, priority) => {
    updateHabit(id, { priority })
  }, [updateHabit])

  const setStreakStartDate = useCallback((id, date) => {
    updateHabit(id, { streakStartDate: formatDate(date) })
  }, [updateHabit])

  const value = {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleDateCompletion,
    setPriority,
    setStreakStartDate,
  }

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
}

