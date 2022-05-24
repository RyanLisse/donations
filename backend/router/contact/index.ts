import * as trpc from '@trpc/server'

import { DonateContact } from './create-contact'

import { z } from 'zod'

export const contactRouter = trpc.router().mutation('donate-contact', {
  input: z.object({
    name: z.string(),
    email: z.string(),
    donation: z.number(),
    customer_id: z.string(),
    message: z.string(),
    complete: z.boolean(),
  }),
  async resolve({ input }) {
    return await DonateContact(
      input.name,
      input.email,
      input.donation,
      input.customer_id,
      input.message,
      input.complete
    )
  },
})
