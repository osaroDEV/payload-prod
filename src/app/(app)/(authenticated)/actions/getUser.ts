'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Payload } from 'payload'
import { Customer } from '@/payload-types'

export async function getUser(): Promise<Customer | null> {
  const headers = await getHeaders()
  const payload: Payload = await getPayload({ config: await configPromise })
  
  const authHeader = headers.get('authorization')
  if (!authHeader) {
    return null
  }

  const token = authHeader.split(' ')[1]
  const user = await payload.find({
    collection: 'customers',
    where: {
      token: {
        equals: token,
      },
    },
  })

  return user.docs[0] || null
}
