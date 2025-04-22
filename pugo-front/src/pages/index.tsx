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
	HomeTypes,
	PagesTypes,
} from '@/types/types'

const HomePage = () => {
	const { t } = useTranslation('common')
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

	if (!isClient || isLoading) return <Loader />
	if (isFirstTime) return <NoobSlider onClose={handleSliderClose} />

	const PAGES_CONTENT = t('pages', { returnObjects: true }) as PagesTypes
	const HEADER_CONTENT = t('header', { returnObjects: true }) as HeaderContent
	const FOOTER_CONTENT = t('footer', { returnObjects: true }) as FooterContent

	return (
		<MainLayout header={HEADER_CONTENT} footer={FOOTER_CONTENT}>
			<Home data={PAGES_CONTENT.home} />
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
