import { calculateStreak } from './streakCalculator'

const affirmations = [
  "You're building something amazing, one day at a time!",
  "Every small step counts - you've got this!",
  "Consistency is your superpower!",
  "You're stronger than you think!",
  "Progress, not perfection - you're doing great!",
  "Your future self will thank you for today!",
  "You're creating positive change in your life!",
  "Keep going - you're on the right track!",
  "Small daily improvements lead to big results!",
  "You're capable of incredible things!",
]

const motivationalMessages = {
  highStreak: [
    "🔥 Incredible! You're on fire with your streaks!",
    "🌟 Outstanding consistency! You're a habit master!",
    "💪 Your dedication is inspiring! Keep it up!",
  ],
  mediumStreak: [
    "✨ Great progress! You're building momentum!",
    "🎯 You're doing well! Keep the consistency going!",
    "📈 Nice work! Your habits are taking shape!",
  ],
  lowStreak: [
    "🌱 Every journey starts with a single step!",
    "💫 You're getting started - that's the hardest part!",
    "🚀 Building new habits takes time - you've got this!",
  ],
  missedDays: [
    "🔄 Don't worry about yesterday - focus on today!",
    "💪 One missed day doesn't break your progress!",
    "🌟 Get back on track - you can do this!",
  ],
}

export function generateInsights(habits) {
  if (!habits || habits.length === 0) {
    return {
      message: "Start your wellness journey by tracking your habits!",
      affirmation: affirmations[0],
      stats: {},
    }
  }

  const streaks = habits.map(habit => ({
    habit: habit.name,
    streak: calculateStreak(habit),
    priority: habit.priority,
  }))

  const totalStreaks = streaks.reduce((sum, h) => sum + h.streak, 0)
  const longestStreak = Math.max(...streaks.map(h => h.streak), 0)
  const highPriorityStreaks = streaks
    .filter(h => h.priority === 'high')
    .map(h => h.streak)
  const avgHighPriorityStreak = highPriorityStreaks.length > 0
    ? highPriorityStreaks.reduce((a, b) => a + b, 0) / highPriorityStreaks.length
    : 0

  // Determine overall performance
  let performanceCategory = 'lowStreak'
  if (longestStreak >= 7) {
    performanceCategory = 'highStreak'
  } else if (longestStreak >= 3) {
    performanceCategory = 'mediumStreak'
  }

  // Check for missed days (habits with low streaks but high priority)
  const hasMissedDays = highPriorityStreaks.some(s => s < 3) && longestStreak > 0

  const messages = hasMissedDays
    ? motivationalMessages.missedDays
    : motivationalMessages[performanceCategory]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]

  return {
    message: randomMessage,
    affirmation: randomAffirmation,
    stats: {
      totalStreaks,
      longestStreak,
      activeHabits: habits.length,
      avgHighPriorityStreak: Math.round(avgHighPriorityStreak * 10) / 10,
    },
  }
}

