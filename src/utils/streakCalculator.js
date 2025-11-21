import { format, isAfter, isBefore, parseISO, startOfDay, subDays } from 'date-fns'

export function calculateStreak(habit) {
  if (!habit.completedDates || habit.completedDates.length === 0) {
    return 0
  }

  const today = startOfDay(new Date())
  const streakStart = startOfDay(parseISO(habit.streakStartDate))
  
  // Sort dates in descending order
  const sortedDates = [...habit.completedDates]
    .map(date => startOfDay(parseISO(date)))
    .sort((a, b) => b - a)

  if (sortedDates.length === 0) {
    return 0
  }

  // Check if today is completed
  const todayCompleted = sortedDates[0].getTime() === today.getTime()
  
  // Start counting from today or yesterday
  let currentDate = todayCompleted ? today : subDays(today, 1)
  let streak = 0
  let dateIndex = 0

  // Count consecutive days backwards
  while (dateIndex < sortedDates.length) {
    const checkDate = startOfDay(currentDate)
    const completedDate = sortedDates[dateIndex]

    if (checkDate.getTime() === completedDate.getTime()) {
      streak++
      dateIndex++
      currentDate = subDays(currentDate, 1)
    } else if (isBefore(checkDate, completedDate)) {
      // Skip ahead to the next completed date
      dateIndex++
    } else {
      // Gap found, streak is broken
      break
    }

    // Don't count before streak start date
    if (isBefore(currentDate, streakStart)) {
      break
    }
  }

  return streak
}

export function formatDate(date) {
  return format(date, 'yyyy-MM-dd')
}

