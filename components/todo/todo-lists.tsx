'use client'

// TODO: right now we have this flicker when we first load our data, meaning initial todos rendering, to prevent that we do server side rendering -> next work that.
import { serverClient } from '@/app/_trpc/server-client'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { trpc } from '@/app/_trpc/client'
import z from 'zod'

export const TodoLists = ({ initialTodos }: { initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>> }) => {
	// first argument is paremeter that you send to the query, in this case it is undefined, coz i want all todos not given id todo
	/**
	 * @example
	 *
	 * refetchOnMount: false,
	 * refetchOnReconnect: false
	 * We do this coz to make that extract call when comp mount every thime, and when we connect to app everytime.
	 * But when we add new todo then it will make the call.
	 */

	const getTodos = trpc.getTodos.useQuery(undefined, {
		initialData: initialTodos,
		refetchOnMount: false,
		refetchOnReconnect: false
	})
	const addTodo = trpc.addTodo.useMutation({
		onSettled: () => {
			getTodos.refetch()
		}
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const { data, error, success } = z.object({
			title: z.string(),
			description: z.string(),
			task: z.string(),
		}).safeParse({
			title: formData.get("title"),
			description: formData.get("description"),
			task: formData.get("task"),
		})

		if (!success) {
			return {
				message: error.format()
			}
		}

		addTodo.mutate({ title: data.title, description: data.description, task: data.task })
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex gap-2">
					<Input type="text" name="title" placeholder="title" />
					<Input type="text" name="description" placeholder="description" />
				</div>
				<Input type="text" name="task" placeholder="task" />

				<div className="flex justify-end">
					<Button type="submit">
						Create
					</Button>
				</div>
			</form>

			{getTodos.data && (
				getTodos.data.map((todo) => (
					<div key={todo.title} className="border border-green-200/20 rounded-md px-4">
						<h2>s{todo.title}</h2>
						<h3>s{todo.description}</h3>
						<p>s{todo.task}</p>
					</div>
				))
			)}
		</div>
	);
}
