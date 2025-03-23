import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Store } from '@/modules/Store/Store'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface StorePageProps {
	content: ContentData
}

const StorePage: NextPage<StorePageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Store data={content.pages.store} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<StorePageProps> = async () => {
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

export default StorePage
