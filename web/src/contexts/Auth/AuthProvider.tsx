import { useEffect, useState } from 'react'

import { useApi } from '../../hooks/useApi'
import { User } from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null)
  const api = useApi()

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken')
      if (storageData) {
        const data = await api.validateToken(storageData)
        if (data.user) {
          setUser(data.user)
        }
      }
    }
    validateToken()
  }, [])

  const signin = async (username: string, password: string) => {
    const data = await api.signin(username, password)
    if (data.user && data.token) {
      setUser(data.user)
      setToken(data.token) // salvando o token no localStorage
      // Pode escolher salvar o token em cookies
      console.log('enviou true')
      return true
    }
    return false
  }

  const signout = async () => {
    console.log('signout está sendo executada.')
    setUser(null)
    setToken('')
    await api.logout()
  }

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>
}
