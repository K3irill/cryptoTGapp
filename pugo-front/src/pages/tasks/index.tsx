import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Tasks } from '@/modules/Tasks/Tasks'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface TasksPageProps {
	content: ContentData
}

const TasksPage: NextPage<TasksPageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Tasks data={content.pages.tasks} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<TasksPageProps> = async () => {
	let content: ContentData

	try {
		content = (await getContent()) || STATIC_CONTENT
	} catch (error) {
		console.error('Error fetching content:', error)
		content = STATIC_CONTENT as unknown as ContentData
	}
	console.log(content)
	return {
		props: { content },
		revalidate: 60,
	}
}

export default TasksPage
