'use server'

import z from 'zod'

export const createTodo = async (state: any, formData: FormData) => {
	// zoe validation
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

	console.log("zod: ", data)

	// here call trpc fetch function	or mutation function
}
