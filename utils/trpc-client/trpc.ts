import { createTRPCReact } from '@trpc/react-query'

import { AppRouter } from '@/server/trpc'

// trpc react client initilization
export const trpc = createTRPCReact<AppRouter>({})
