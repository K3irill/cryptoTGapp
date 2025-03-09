import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Exchange } from '@/modules/Exchange/Exchange'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface ExchangePageProps {
	content: ContentData
}

const ExchangePage: NextPage<ExchangePageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Exchange data={content.pages.exchange} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<ExchangePageProps> = async () => {
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

export default ExchangePage
