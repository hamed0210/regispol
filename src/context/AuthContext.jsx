import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../supabase/supabase.config'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const navigate = useNavigate()
  const [sessionUser, setSessionUser] = useState(null)

  useEffect(() => {
    // data: authListener = Cambiar nombre de data
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'INITIAL_SESSION') {
          setSessionUser(session)
        } else if (event === 'SIGNED_IN') {
          setSessionUser(session)
          // console.log(event, session)
        } else if (event === 'SIGNED_OUT') {
          setSessionUser(null)
        } else if (event === 'PASSWORD_RECOVERY') {
          // handle password recovery event
        } else if (event === 'TOKEN_REFRESHED') {
          // handle token refreshed event
        } else if (event === 'USER_UPDATED') {
          // handle user updated event
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={sessionUser}>{children}</AuthContext.Provider>
  )

}

export const UserAuth = () => {
  return useContext(AuthContext)
}
