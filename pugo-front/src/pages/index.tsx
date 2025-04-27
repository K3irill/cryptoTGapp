import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Home } from '../modules/Home/Home'
import MainLayout from '@/components/Layouts/MainLayouts'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'
import NoobSlider from '@/components/NoobSlider/NoobSlider'
import {
	ContentData,
	FooterContent,
	HeaderContent,
	PagesTypes,
} from '@/types/types'

const HomePage = () => {
	const { t, ready } = useTranslation('common')
	const [isFirstTime, setIsFirstTime] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
		const firstTimeStatus = localStorage.getItem('isFirstTime')
		if (firstTimeStatus !== 'false') setIsFirstTime(true)
		setIsLoading(false)
	}, [])

	const handleSliderClose = () => {
		localStorage.setItem('isFirstTime', 'false')
		setIsFirstTime(false)
	}

	if (!ready || !isClient || isLoading) return <Loader />
	const content = t('content', { returnObjects: true }) as ContentData
	if (isFirstTime)
		return <NoobSlider content={content} onClose={handleSliderClose} />

	if (!content?.pages?.home) {
		console.error('Invalid content structure:', content)
		return <div>Error loading content</div>
	}

	return (
		<MainLayout
			header={content.header || STATIC_CONTENT.header}
			footer={content.footer || STATIC_CONTENT.footer}
		>
			<Home data={content.pages.home} />
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en', ['common'])),
	},
	revalidate: 60,
})

export default HomePage
