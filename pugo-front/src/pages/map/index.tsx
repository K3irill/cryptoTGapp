import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Map } from '@/modules/Map/Map'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import {
	ContentData,
	FooterContent,
	HeaderContent,
	PagesTypes,
} from '@/types/types'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Loader from '@/components/Loader/Loader'

const MapPage = () => {
	const { t, ready } = useTranslation('common')
	if (!ready) return <Loader />

	const content = t('content', { returnObjects: true }) as ContentData

	if (!content?.pages?.map) {
		console.error('Invalid content structure:', content)
		return <div>Error loading content</div>
	}
	return (
		<MainLayout
			header={content.header || STATIC_CONTENT.header}
			footer={content.footer || STATIC_CONTENT.footer}
		>
			<Map data={content.pages.map} />
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en', ['common'])),
	},
	revalidate: 60,
})

export default MapPage
