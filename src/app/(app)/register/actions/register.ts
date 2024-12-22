'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Customer } from '@/payload-types'
import { cookies } from 'next/headers'

interface RegisterParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface RegisterResponse {
  success: boolean
  error?: string
}

type Result = {
  exp?: number
  token?: string
  user?: Customer
}

const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams): Promise<RegisterResponse> => {
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'customers',
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    })
    const result: Result = await payload.login({
      collection: 'customers',
      data: {
        email,
        password,
      },
    })
    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set({
        name: 'payload-token',
        value: result.token,
        path: '/',
        httpOnly: true,
      })
      return { success: true }
    } else {
      return { success: false, error: 'Login failed' }
    }
  } catch (_error) {
    return { success: false, error: 'Registration failed' }
  }
}

export default register
