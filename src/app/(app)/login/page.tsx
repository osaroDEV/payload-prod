import React, { ReactElement } from 'react'
import LoginForm from './components/LoginForm'

const page = async (): Promise<ReactElement> => {
    
  return (
    <div className='h-[calc(100vh-3rem)]'><LoginForm /></div>
  )
}

export default page