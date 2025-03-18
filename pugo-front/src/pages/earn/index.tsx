import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Earn } from '@/modules/Earn/Earn'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface EarnPageProps {
	content: ContentData
}

const EarnPage: NextPage<EarnPageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Earn data={content.pages.earn} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<EarnPageProps> = async () => {
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

export default EarnPage
