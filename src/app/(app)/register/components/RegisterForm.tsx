'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent, ReactElement } from 'react'
import { RegisterResponse } from '../actions/register'
import register from '../actions/register'
import SubmitButton from '../../components/SubmitButton'
import Link from 'next/link'

const RegisterForm = (): ReactElement => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsPending(true)
    setError(null) // Reset error state

    const formData = new FormData(event.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsPending(false)
      return
    }

    const result: RegisterResponse = await register({ firstName, lastName, email, password })
    setIsPending(false)

    console.log(result)

    if (result.success) {
      // Redirect manually after successful login
      router.push('/dashboard')
    } else {
      // Display the error message
      setError(result.error || 'Login failed')
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Sign Up</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="w-full textInput"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="w-full textInput"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="w-full textInput" required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full textInput"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full textInput"
              required
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <SubmitButton loading={isPending} text="Register" />
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-headBlue-500 hover:text-headBlue-400">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
