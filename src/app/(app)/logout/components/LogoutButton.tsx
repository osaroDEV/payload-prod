'use client'

import { ReactElement } from 'react'
import { useRouter } from 'next/navigation'

// interface LogoutResponse {
//   success: boolean
//   error?: string
// }

const LogoutButton = (): ReactElement => {
  const router = useRouter()

  const handleLogout = async (): Promise<void> => {
    try {
      const res = await fetch('https://payload-prod.vercel.app/api/customers/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json() // Try to parse error response
        throw new Error(errorData.error || 'An error occurred during logout.')
      }

     
      router.push('/login') // Redirect to login page
    } catch (error: any) {
      // Type the error
      console.error('Logout error:', error)
      alert(error?.message || 'An error occurred during logout.')
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}

// payload-prod.vercel.app
// localhost:3000

export default LogoutButton
