import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Home } from '../modules/Home/Home'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'
import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'
import NoobSlider from '@/components/NoobSlider/NoobSlider'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'

interface HomePageProps {
	content: ContentData
}

const HomePage: NextPage<HomePageProps> = ({ content }) => {
	const [isFirstTime, setIsFirstTime] = useState<boolean>(() => {
		if (typeof window !== 'undefined') {
			const isFirstTime = localStorage.getItem('isFirstTime')
			return isFirstTime !== 'false'
		}
		return true
	})

	const handleSliderClose = () => {
		localStorage.setItem('isFirstTime', 'false')
		setIsFirstTime(false)
	}

	if (isFirstTime) {
		return <NoobSlider onClose={handleSliderClose} />
	}

	return (
		<MainLayout header={content.header} footer={content.footer}>
			<Home data={content.pages.home} />
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	let content: ContentData

	try {
		content = (await getContent()) || STATIC_CONTENT
	} catch (error) {
		console.error('Error fetching content:', error)
		content = STATIC_CONTENT as unknown as ContentData
	}

	return {
		props: { content },
		revalidate: 60,
	}
}

export default HomePage
