import { useState, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, Check, Flame } from 'lucide-react'
import { useHabits } from '../contexts/HabitContext'
import { startOfWeek, addDays, format, subWeeks, addWeeks, isSameDay } from 'date-fns'
import { formatDate } from '../utils/streakCalculator'
import { motion } from 'framer-motion'

export default function WeeklyProgress({ onClose }) {
    const { habits } = useHabits()
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i))
    }, [currentWeekStart])

    const handlePrevWeek = () => setCurrentWeekStart(prev => subWeeks(prev, 1))
    const handleNextWeek = () => setCurrentWeekStart(prev => addWeeks(prev, 1))

    return (
        <div className="dialog-overlay">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="dialog-content w-full max-w-5xl p-8 max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Weekly Progress</h2>
                        <p className="text-white/60">Track your consistency across the week.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center justify-between mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <button
                        onClick={handlePrevWeek}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h3 className="text-xl font-bold text-white">
                        {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
                    </h3>
                    <button
                        onClick={handleNextWeek}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-x-auto pb-4">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="text-left py-4 px-4 text-white/50 font-medium w-64">Habit</th>
                                {weekDays.map((day) => (
                                    <th key={day.toString()} className="text-center py-4 px-2">
                                        <div className={`
                      flex flex-col items-center justify-center w-12 h-16 rounded-xl border
                      ${isSameDay(day, new Date())
                                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-200'
                                                : 'bg-white/5 border-white/10 text-white/60'
                                            }
                    `}>
                                            <span className="text-xs font-bold uppercase">{format(day, 'EEE')}</span>
                                            <span className="text-lg font-bold">{format(day, 'd')}</span>
                                        </div>
                                    </th>
                                ))}
                                <th className="text-center py-4 px-4 text-white/50 font-medium w-24">Total</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {habits.map((habit) => {
                                const weeklyCompletions = weekDays.filter(day =>
                                    habit.completedDates?.includes(formatDate(day))
                                ).length

                                return (
                                    <tr key={habit.id} className="group hover:bg-white/5 transition-colors rounded-xl">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{habit.emoji}</span>
                                                <span className="font-medium text-white truncate max-w-[180px]">{habit.name}</span>
                                            </div>
                                        </td>
                                        {weekDays.map((day) => {
                                            const isCompleted = habit.completedDates?.includes(formatDate(day))
                                            return (
                                                <td key={day.toString()} className="py-3 px-2 text-center">
                                                    <div className="flex items-center justify-center">
                                                        {isCompleted ? (
                                                            <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                                                <Check className="w-6 h-6" strokeWidth={3} />
                                                            </div>
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-white/10" />
                                                        )}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                        <td className="py-3 px-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-bold">
                                                <Flame className="w-4 h-4 text-orange-400" />
                                                {weeklyCompletions}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
