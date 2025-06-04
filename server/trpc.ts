import { initTRPC } from '@trpc/server'

// initilize trpc
const t = initTRPC.create()

// get back router and publicprocedure->(are function which is exposed to client, either of this are exposed Query, Mutation, Subscription)
export const router = t.router
export const publicProcedure = t.procedure

// next trpc router that has procedure on it

export const appRouter = router({
	// query is best for fetching data
	getTodos: publicProcedure.query(async () => {
		return {
			message: "Hello trpc."
		}
	})
})

export type AppRouter = typeof appRouter;
