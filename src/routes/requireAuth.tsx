import React from 'react'
import { Navigate } from 'react-router'
import useUserStore from '@/stores/user'

type Props = {
  admin?: boolean
  children: React.ReactNode
}

const App: React.FC<Props> = ({ children }) => {
  const { token } = useUserStore()

  if (token) return <Navigate to="/login" />

  return children
}

export default App
