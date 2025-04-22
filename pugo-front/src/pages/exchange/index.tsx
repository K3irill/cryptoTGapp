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

const ExchangePage = () => {
	const { t } = useTranslation('common')

	const PAGES_CONTENT = t('pages', { returnObjects: true }) as PagesTypes
	const HEADER_CONTENT = t('header', { returnObjects: true }) as HeaderContent
	const FOOTER_CONTENT = t('footer', { returnObjects: true }) as FooterContent

	return (
		<MainLayout header={HEADER_CONTENT} footer={FOOTER_CONTENT}>
			<Exchange data={PAGES_CONTENT.exchange} />
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
