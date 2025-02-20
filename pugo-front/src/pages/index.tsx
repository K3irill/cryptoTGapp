import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'
import { Container } from '@/styles/styled'
import { ContentData } from '@/types/types'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

interface HomePageProps {
	content: ContentData
}

const HomePage: FunctionComponent<HomePageProps> = ({ content }) => {
	console.log(content)
	return (
		<MainLayout header={content?.header} footer={content?.footer}>
			<Container>Home page</Container>
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
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

export default HomePage
