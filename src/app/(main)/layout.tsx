import { redirect } from 'next/navigation'
import React from 'react'
import { validateRequest } from '@/auth'

import SessionProvider from '@/provider/SessionProvider'
import Navbar from './Navbar'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await validateRequest()

	if (!session.user) redirect('/login')

	return (
		<SessionProvider value={session}>
			<div className='flex min-h-screen flex-col'>
				<Navbar />
				{children}
			</div>
		</SessionProvider>
	)
}
