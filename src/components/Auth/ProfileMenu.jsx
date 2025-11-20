import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        logout()
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold">{user.email[0].toUpperCase()}</span>
                </div>
                <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                    {user.email.split('@')[0]}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-xs text-white/50">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}
