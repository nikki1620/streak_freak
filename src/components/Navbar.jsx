import { useState, useEffect } from 'react'
import { Menu, X, Plus, BarChart2, LogIn, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileMenu from './Auth/ProfileMenu'

export default function Navbar({ onAddHabit, onWeeklyProgress, onLogin, user }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav
                className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
                        ? 'bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-purple-900/10 py-3'
                        : 'bg-transparent py-5'
                    }
        `}
            >
                <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-xl">⚡️</span>
                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight group-hover:to-white transition-all">
                            Streak Freak
                        </span>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={onWeeklyProgress}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                            <BarChart2 className="w-4 h-4" />
                            Weekly Progress
                        </button>

                        <button
                            onClick={onAddHabit}
                            className="relative group px-5 py-2.5 rounded-xl bg-white text-purple-900 font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <Plus className="w-4 h-4" strokeWidth={3} />
                            Add Habit
                        </button>

                        <div className="w-px h-6 bg-white/10 mx-1" />

                        {user ? (
                            <ProfileMenu user={user} />
                        ) : (
                            <button
                                onClick={onLogin}
                                className="px-4 py-2 rounded-xl text-sm font-bold text-white border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 rounded-xl text-white/80 hover:bg-white/10 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[#0f172a] border-l border-white/10 shadow-2xl p-6 md:hidden"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-lg font-bold text-white">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        onAddHabit()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Habit
                                </button>

                                <button
                                    onClick={() => {
                                        onWeeklyProgress()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full py-3 px-4 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-3"
                                >
                                    <BarChart2 className="w-5 h-5 text-purple-400" />
                                    Weekly Progress
                                </button>

                                <div className="h-px bg-white/10 my-4" />

                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 px-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                {user.email[0].toUpperCase()}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-bold text-white truncate">{user.email}</p>
                                                <p className="text-xs text-white/50">Logged in</p>
                                            </div>
                                        </div>
                                        {/* Logout logic would go here */}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            onLogin()
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className="w-full py-3 px-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
