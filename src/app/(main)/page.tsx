import PostEditor from '@/components/posts/editor/PostEditor'

export default function HomePage() {
	return (
		<main className='flex w-full min-w-0 gap-5'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
			</div>
		</main>
	)
}
