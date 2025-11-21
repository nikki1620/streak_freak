import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
    "Discipline is doing what needs to be done, even if you don't want to do it.",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "The only bad workout is the one that didn't happen.",
    "Your future is created by what you do today, not tomorrow.",
    "Small habits, repeated daily, lead to massive transformation.",
    "Motivation is what gets you started. Habit is what keeps you going.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of your future is hidden in your daily routine.",
    "You don't have to be great to start, but you have to start to be great."
]

export default function Footer() {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length)
        }, 8000) // Change quote every 8 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 backdrop-blur-xl bg-black/20">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-center h-6 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentQuoteIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-sm font-medium text-white/60 text-center italic"
                        >
                            "{QUOTES[currentQuoteIndex]}"
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </footer>
    )
}
