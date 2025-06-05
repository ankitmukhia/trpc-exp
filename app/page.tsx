import { TodoLists } from '@/components/todo/todo-lists'

import { serverClient } from '@/app/_trpc/server-client'

export default async function Home() {
	const todos = await serverClient.getTodos()

	return (
		<main className="max-w-2xl mx-auto min-h-svh pt-2 space-y-4">
			<TodoLists initialTodos={todos} />
		</main>
	)
}
