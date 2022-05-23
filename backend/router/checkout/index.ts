import * as trpc from '@trpc/server'
import getSessionById from './getCheckout'
import { createOneTimeDonation } from './create-checkout'
import { z } from 'zod'

export const checkoutRouter = trpc
  .router()
  .query('get-session', {
    input: z.object({
      session_id: z.string().refine((id) => id.startsWith('cs_')),
    }),
    async resolve({ input }) {
      return await getSessionById(input.session_id)
    },
  })
  .mutation('create-onetime-donation', {
    input: z.object({
      amount: z.number(),
    }),
    async resolve({ input }) {
      return await createOneTimeDonation(input.amount)
    },
  })
