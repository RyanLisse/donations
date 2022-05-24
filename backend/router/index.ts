import { checkoutRouter } from '././checkout/index'
import { contactRouter } from './contact'
import * as trpc from '@trpc/server'

export const appRouter = trpc
  .router()
  .merge('checkout.', checkoutRouter)
  .merge('contact.', contactRouter)

export type AppRouter = typeof appRouter
