import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'

export const useAuthStore = create((set, get) => {
    const navigate = useNavigate()()
    signInWithEmail: async (dataProps) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: dataProps.email,
                password: dataProps.password,
            })
            if (error) return null
        } catch (error) {

        }
    }
    signOuth: async () => {
        try {
            const { error } = await supabase.auth.signOut()
        } catch (error) {

        }
    }
}) 
