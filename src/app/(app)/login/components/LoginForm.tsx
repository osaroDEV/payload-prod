'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, ReactElement, useState } from 'react'
import SubmitButton from '../../components/SubmitButton'
import login, { LoginResponse } from '../actions/login'
import Link from 'next/link'

const LoginForm = (): ReactElement => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsPending(false)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input className="w-full textInput" name="email" type="email" />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="password">Password</label>
            <input className="w-full textInput" name="password" type="password" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <SubmitButton loading={isPending} text="Login" />
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link className="text-blue-500" href="/register">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
