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

const defaultHabits = [
  {
    id: '1',
    name: 'Gym',
    streakStartDate: formatDate(new Date()),
    priority: 'medium',
    completedDates: [],
  },
  {
    id: '2',
    name: 'Meditate',
    streakStartDate: formatDate(new Date()),
    priority: 'medium',
    completedDates: [],
  },
  {
    id: '3',
    name: 'Drink Water',
    streakStartDate: formatDate(new Date()),
    priority: 'medium',
    completedDates: [],
  },
]

export function HabitProvider({ children }) {
  const [habits, setHabits] = useLocalStorage('habits', defaultHabits)

  const addHabit = useCallback((habit) => {
    const newHabit = {
      id: Date.now().toString(),
      name: habit.name,
      streakStartDate: habit.streakStartDate || formatDate(new Date()),
      priority: habit.priority || 'medium',
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

