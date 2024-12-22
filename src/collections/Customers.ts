import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true, // customers can create
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
  ],
}
