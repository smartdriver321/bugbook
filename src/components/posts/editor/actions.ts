'use server'

import { validateRequest } from '@/auth'
import prisma from '@/lib/prisma'
import { createPostSchema } from '@/lib/validation'
import { getPostDataInclude } from '@/types/types'

export async function submitPost(input: string) {
	const { user } = await validateRequest()

	if (!user) throw new Error('Unauthorized')

	const { content } = createPostSchema.parse({ content: input })

	const newPost = await prisma.post.create({
		data: {
			content,
			userId: user.id,
		},
		include: getPostDataInclude(user.id),
	})

	return newPost
}
