import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Exchange } from '@/modules/Exchange/Exchange'
import MainLayout from '@/components/Layouts/MainLayouts'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	ContentData,
	FooterContent,
	HeaderContent,
	PagesTypes,
} from '@/types/types'
import { GetStaticProps, NextPage } from 'next'
import Loader from '@/components/Loader/Loader'

const ExchangePage = () => {
	const { t, ready } = useTranslation('common')
	if (!ready) return <Loader />

	const content = t('content', { returnObjects: true }) as ContentData

	if (!content?.pages?.exchange) {
		console.error('Invalid content structure:', content)
		return <div>Error loading content</div>
	}
	return (
		<MainLayout
			header={content.header || STATIC_CONTENT.header}
			footer={content.footer || STATIC_CONTENT.footer}
		>
			<Exchange data={content.pages.exchange} />
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
		},
		revalidate: 60,
	}
}

export default ExchangePage
