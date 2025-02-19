import MainLayout from '@/components/Layouts/MainLayouts'
import { Container } from '@/styles/styled'
import { ContentData } from '@/types/types'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

interface HomeProps {
	content: ContentData
}

const Home: FunctionComponent<HomeProps> = ({ content }) => {
	console.log(content)
	return (
		<MainLayout header={content?.header} footer={content?.footer}>
			<Container>Home</Container>
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const res = await fetch('http://localhost:4000/api/content')

	console.log('Response status:', res.status)
	const text = await res.text()
	console.log('Response text:', text)

	try {
		const content: ContentData = text ? JSON.parse(text) : {}
		return {
			props: { content },
			revalidate: 60,
		}
	} catch (error) {
		console.error('Error parsing JSON:', error)

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

export default Home
