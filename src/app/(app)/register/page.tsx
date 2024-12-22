import React, { ReactElement } from 'react'
import RegisterForm from './components/RegisterForm'

const page = async (): Promise<ReactElement> => {
  return (
    <div className="h-[calc(100vh-3rem)]">
      <RegisterForm />
    </div>
  )
}

export default page
