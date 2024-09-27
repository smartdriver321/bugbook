import Link from 'next/link'
import { Bookmark, Home } from 'lucide-react'

import { validateRequest } from '@/auth'
import prisma from '@/lib/prisma'
import streamServerClient from '@/lib/stream'
import NotificationsButton from './NotificationsButton'
import MessagesButton from './MessagesButton'
import { Button } from '@/components/ui/button'

interface MenuBarProps {
	className?: string
}

export default async function Menubar({ className }: MenuBarProps) {
	const { user } = await validateRequest()

	if (!user) return null

	const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
		prisma.notification.count({
			where: {
				recipientId: user.id,
				read: false,
			},
		}),
		(await streamServerClient.getUnreadCount(user.id)).total_unread_count,
	])

	return (
		<div className={className}>
			<Button
				variant='ghost'
				className='flex items-center justify-start gap-3'
				title='Home'
				asChild
			>
				<Link href='/'>
					<Home />
					<span className='hidden lg:inline'>Home</span>
				</Link>
			</Button>
			<NotificationsButton
				initialState={{ unreadCount: unreadNotificationsCount }}
			/>
			<MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
			<Button
				variant='ghost'
				className='flex items-center justify-start gap-3'
				title='Bookmarks'
				asChild
			>
				<Link href='/bookmarks'>
					<Bookmark />
					<span className='hidden lg:inline'>Bookmarks</span>
				</Link>
			</Button>
		</div>
	)
}
