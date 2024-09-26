import Link from 'next/link'
import { Bookmark, Home, Mail } from 'lucide-react'

import { validateRequest } from '@/auth'
import prisma from '@/lib/prisma'
import NotificationsButton from './NotificationsButton'
import { Button } from '@/components/ui/button'

interface MenuBarProps {
	className?: string
}

export default async function MenuBar({ className }: MenuBarProps) {
	const { user } = await validateRequest()

	if (!user) return null

	const [unreadNotificationsCount] = await Promise.all([
		prisma.notification.count({
			where: {
				recipientId: user.id,
				read: false,
			},
		}),
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
			<Button
				variant='ghost'
				className='flex items-center justify-start gap-3'
				title='Messages'
				asChild
			>
				<Link href='/messages'>
					<Mail />
					<span className='hidden lg:inline'>Messages</span>
				</Link>
			</Button>
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
