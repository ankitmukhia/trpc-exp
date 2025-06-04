'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'

import { trpc } from './client'

interface Props {
	children: Readonly<React.ReactNode>
}

// (Wrapper) makes trpc client accessible via React Context to all your components
export default function Provider({ children }: Props) {
	const [queryClient] = useState(() => new QueryClient({}))
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/api/trpc"
				})
			]
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	)
}
