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
			<Container></Container>
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	try {
		const res = await fetch('https://pugo.onrender.com/api/content')
		if (!res.ok) {
			throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
		}
		const content: ContentData = await res.json()
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

export default Home
