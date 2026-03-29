import { createContext, useContext, useState, useEffect } from 'react'
import { initialClaims } from '../data/claims'
import { useAuth } from './AuthContext'

const ClaimsContext = createContext(null)

export function ClaimsProvider({ children }) {
  const { currentUser } = useAuth()

  const [allClaims, setAllClaims] = useState(() => {
    try {
      const saved = localStorage.getItem('claimtrack-claims')
      return saved ? JSON.parse(saved) : initialClaims
    } catch {
      return initialClaims
    }
  })

  // Persist all claims to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('claimtrack-claims', JSON.stringify(allClaims))
  }, [allClaims])

  // Only expose claims belonging to the current user
  const claims = currentUser
    ? allClaims.filter((c) => c.userId === currentUser.id)
    : []

  const addClaim = (formData) => {
    const nextNum = allClaims.length + 1
    const id = `CLM-${String(nextNum).padStart(3, '0')}`
    const dateStr = new Date().toISOString().split('T')[0]

    const newClaim = {
      ...formData,
      id,
      userId: currentUser.id,
      status: 'Open',
      amount: parseFloat(formData.amount),
      date: dateStr,
    }

    setAllClaims((prev) => [newClaim, ...prev])
    return id
  }

  const getClaimById = (id) => claims.find((c) => c.id === id)

  return (
    <ClaimsContext.Provider value={{ claims, addClaim, getClaimById }}>
      {children}
    </ClaimsContext.Provider>
  )
}

export function useClaims() {
  const ctx = useContext(ClaimsContext)
  if (!ctx) throw new Error('useClaims must be used within ClaimsProvider')
  return ctx
}
