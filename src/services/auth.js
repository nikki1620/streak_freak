import { supabase, isSupabaseConfigured } from './supabase'

// Mock Auth Service (LocalStorage)
const MockAuth = {
    async signUp(email, password) {
        const user = { id: 'mock-user-id', email }
        localStorage.setItem('mock_user', JSON.stringify(user))
        return { user, error: null }
    },

    async signIn(email, password) {
        const user = { id: 'mock-user-id', email }
        localStorage.setItem('mock_user', JSON.stringify(user))
        return { user, error: null }
    },

    async signOut() {
        localStorage.removeItem('mock_user')
        return { error: null }
    },

    async getUser() {
        const userStr = localStorage.getItem('mock_user')
        return { user: userStr ? JSON.parse(userStr) : null }
    },

    onAuthStateChange(callback) {
        // Simple mock implementation
        const userStr = localStorage.getItem('mock_user')
        callback('SIGNED_IN', userStr ? JSON.parse(userStr) : null)
        return { data: { subscription: { unsubscribe: () => { } } } }
    }
}

// Supabase Auth Service
const SupabaseAuth = {
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({ email, password })
        return { user: data.user, error }
    },

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        return { user: data.user, error }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    async getUser() {
        const { data: { user } } = await supabase.auth.getUser()
        return { user }
    },

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session?.user ?? null)
        })
    }
}

export const authService = isSupabaseConfigured() ? SupabaseAuth : MockAuth
