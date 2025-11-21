import { useState } from 'react'
import { X, Mail, Lock, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'

export default function LoginModal({ onClose, onSwitchToSignup }) {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            onClose()
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="dialog-overlay">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="dialog-content w-full max-w-md p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-white/80 mb-2 text-sm font-medium">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white/80 mb-2 text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/60 text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitchToSignup}
                            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
