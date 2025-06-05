import { initTRPC } from '@trpc/server'
import { todosTable } from '@/db/schema'
import { db } from '@/db'
import z from 'zod'

import { drizzle } from 'drizzle-orm/node-postgres'
// initilize trpc
const t = initTRPC.create()

// get back router and publicprocedure->(are function which is exposed to client, either of this are exposed Query, Mutation, Subscription)
export const router = t.router
export const publicProcedure = t.procedure

// next trpc router that has procedure on it

export const appRouter = router({
	// query is best for fetching data
	getTodos: publicProcedure.query(async () => {
		return await db.select().from(todosTable)
	}),
	// mutation
	addTodo: publicProcedure.input(z.object({
		title: z.string(),
		description: z.string(),
		task: z.string(),
	})).mutation(async ({ input }) => {
		await db.insert(todosTable).values({ title: input.title, description: input.description, task: input.task })
		return true;
	})
})

export type AppRouter = typeof appRouter;
