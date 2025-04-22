import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Tasks } from '@/modules/Tasks/Tasks'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'

import {
	ContentData,
	FooterContent,
	HeaderContent,
	PagesTypes,
} from '@/types/types'
import { GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const TasksPage = () => {
	const { t } = useTranslation('common')
	const PAGES_CONTENT = t('pages', { returnObjects: true }) as PagesTypes
	const HEADER_CONTENT = t('header', { returnObjects: true }) as HeaderContent
	const FOOTER_CONTENT = t('footer', { returnObjects: true }) as FooterContent

	return (
		<>
			<MainLayout header={HEADER_CONTENT} footer={FOOTER_CONTENT}>
				<Tasks data={PAGES_CONTENT.tasks} />
			</MainLayout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en', ['common'])),
	},
	revalidate: 60,
})

export default TasksPage
