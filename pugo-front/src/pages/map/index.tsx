import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Map } from '@/modules/Map/Map'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface MapPageProps {
	content: ContentData
}

const MapPage: NextPage<MapPageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Map data={content.pages.map} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<MapPageProps> = async () => {
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

export default MapPage
