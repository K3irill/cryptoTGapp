import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Frens } from '@/modules/Frens/Frens'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	ContentData,
	FooterContent,
	HeaderContent,
	PagesTypes,
} from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

interface FrensPageProps {
	content: ContentData
}

const FrensPage: NextPage<FrensPageProps> = ({ content }) => {
	const { t } = useTranslation('common')
	const PAGES_CONTENT = t('pages', { returnObjects: true }) as PagesTypes
	const HEADER_CONTENT = t('header', { returnObjects: true }) as HeaderContent
	const FOOTER_CONTENT = t('footer', { returnObjects: true }) as FooterContent

	return (
		<MainLayout header={HEADER_CONTENT} footer={FOOTER_CONTENT}>
			<Frens data={PAGES_CONTENT.frens} />
		</MainLayout>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en', ['common'])),
	},
	revalidate: 60,
})

export default FrensPage
