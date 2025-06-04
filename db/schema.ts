import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const todosTable = pgTable('todos', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar({ length: 20 }).notNull(),
	description: varchar({ length: 40 }).notNull(),
	task: varchar({ length: 40 }).notNull(),
})
