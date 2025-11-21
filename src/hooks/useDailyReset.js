import { useState, useEffect } from 'react'
import { startOfDay } from 'date-fns'

export default function useDailyReset() {
  const [today, setToday] = useState(startOfDay(new Date()))

  useEffect(() => {
    const checkDate = () => {
      const now = new Date()
      const currentStartOfDay = startOfDay(now)

      if (currentStartOfDay.getTime() !== today.getTime()) {
        setToday(currentStartOfDay)
      }
    }

    // Check every minute to be safe, but calculate delay to next midnight for efficiency could be added.
    // For simplicity and robustness against sleep/wake cycles, a polling interval is good.
    const interval = setInterval(checkDate, 60000)

    // Also check on focus/visibility change to handle tab switching/waking up
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkDate()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [today])

  return today
}
