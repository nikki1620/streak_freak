import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/auth'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = (user) => {
            if (user && user.email !== 'putcha.nikhila3@gmail.com') {
                alert('You are not Nikhila. Sorry about that.')
                authService.signOut()
                setUser(null)
                setLoading(false)
                return
            }
            setUser(user)
            setLoading(false)
        }

        // Check active session
        authService.getUser().then(({ user }) => {
            checkUser(user)
        })

        // Listen for changes
        const { data: subscription } = authService.onAuthStateChange((event, user) => {
            checkUser(user)
        })

        return () => {
            subscription?.subscription?.unsubscribe()
        }
    }, [])

    const signup = (email, password) => authService.signUp(email, password)
    const login = (email, password) => authService.signIn(email, password)
    const logout = () => authService.signOut().then(() => setUser(null))

    const value = {
        user,
        signup,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
