import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'
import { Container } from '@/styles/styled'
import { ContentData } from '@/types/types'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

interface BankPageProps {
	content: ContentData
}

const BankPage: FunctionComponent<BankPageProps> = ({ content }) => {
	console.log(content)
	return (
		<MainLayout header={content?.header} footer={content?.footer}>
			<Container>Bank page</Container>
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps<BankPageProps> = async () => {
	try {
		const content = await getContent()
		return {
			props: { content },
			revalidate: 60,
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		return {
			props: {
				content: {
					header: {
						site_link: 'https://pugo.ru',
						banner: { title: 'Default Title' },
					},
					footer: { navigation: { nav_elements: [] } },
					pages: {},
				},
			},
			revalidate: 60,
		}
	}
}

export default BankPage
