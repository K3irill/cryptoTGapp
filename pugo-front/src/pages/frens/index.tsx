import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Frens } from '@/modules/Frens/Frens'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface FrensPageProps {
	content: ContentData
}

const FrensPage: NextPage<FrensPageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Frens data={content.pages.frens} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<FrensPageProps> = async () => {
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

export default FrensPage
