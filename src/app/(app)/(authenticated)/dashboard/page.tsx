'use client'
import React, { useState, useEffect } from 'react'
import LogoutButton from '../../logout/components/LogoutButton'

interface UserData {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
const Page = () => {
  const [data, setData] = useState<UserData | null>(null)

  useEffect(() => {
    handleCheck()
  }, [])

  const handleCheck = async () => {
    try {
      const req = await fetch('https://payload-prod.vercel.app/api/customers/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await req.json()
      setData(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>Dashboard</div>
      <div>
        {data ? (<p>Welcome {data?.user?.firstName} {data?.user?.lastName}, good to see you!</p>) : (<p>Loading...</p>)}
      </div>
      <LogoutButton />
    </>
  )
}

// payload-prod.vercel.app
// localhost:3000

export default Page
