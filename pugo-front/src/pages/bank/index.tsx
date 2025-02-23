import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Bank } from '@/components/Bank/Bank'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface BankPageProps {
	content: ContentData
}

const BankPage: NextPage<BankPageProps> = ({ content }) => (
	<MainLayout header={content.header} footer={content.footer}>
		<Bank data={content.pages.bank} />
	</MainLayout>
)

export const getStaticProps: GetStaticProps<BankPageProps> = async () => {
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

export default BankPage
