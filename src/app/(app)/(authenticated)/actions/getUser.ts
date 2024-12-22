'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Payload } from 'payload'
import { Customer } from '@/payload-types'

// export async function getUser(): Promise<Customer | null> {
//   const headers = await getHeaders()
//   const payload: Payload = await getPayload({ config: await configPromise })
//   const { user } = await payload.auth({ headers })

//   return user || null
// }

export async function getUser(): Promise<Customer | null> {
  const headers = await getHeaders()
  const payload: Payload = await getPayload({ config: await configPromise })
  const { user } = await payload.auth({ headers })

  // Use the UsersSelect interface to select only the firstName and lastName fields
  interface UsersSelect<T> {
    firstName: string;
    lastName: string;
  }
  if (!user) {
    return null;
  }

  const { firstName, lastName } = user as UsersSelect<{ firstName: string; lastName: string }>

  // Create a new Customer object with the selected fields
  const customer: Customer = { 
    id: user.id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    email: user.email,
    firstName, 
    lastName 
  }

  return customer
}
