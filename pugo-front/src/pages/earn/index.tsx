import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Earn } from '@/modules/Earn/Earn'
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

const EarnPage = () => {
	const { t } = useTranslation('common')

	const pagesContent = t('pages', { returnObjects: true }) as PagesTypes
	const headerContent = t('header', { returnObjects: true }) as HeaderContent
	const footerContent = t('footer', { returnObjects: true }) as FooterContent

	return (
		<MainLayout header={headerContent} footer={footerContent}>
			<Earn data={pagesContent.earn} />
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

export default EarnPage
