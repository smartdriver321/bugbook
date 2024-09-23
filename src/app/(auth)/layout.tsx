import { redirect } from 'next/navigation'
import React from 'react'

import { validateRequest } from '@/auth'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { user } = await validateRequest()

	if (user) redirect('/')

	return <>{children}</>
}
