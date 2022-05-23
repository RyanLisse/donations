import { checkoutRouter } from '././checkout/index'
import * as trpc from '@trpc/server'

export const appRouter = trpc.router().merge('checkout.', checkoutRouter)

export type AppRouter = typeof appRouter
