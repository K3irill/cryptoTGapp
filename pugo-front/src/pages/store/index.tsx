import { CONTENT as STATIC_CONTENT } from '@/assets/constants/static_content'
import { Store } from '@/modules/Store/Store'
import MainLayout from '@/components/Layouts/MainLayouts'
import { getContent } from '@/lib/getContent'
import { useTranslation } from 'next-i18next'
import { ContentData } from '@/types/types'
import { GetStaticProps, NextPage } from 'next'
import Loader from '@/components/Loader/Loader'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface StorePageProps {
	content: ContentData
}

const StorePage: NextPage<StorePageProps> = () => {
	const { t, ready } = useTranslation('common')
	if (!ready) return <Loader />

	const content = t('content', { returnObjects: true }) as ContentData

	if (!content?.pages?.store) {
		console.error('Invalid content structure:', content)
		return <div>Error loading content</div>
	}
	return (
		<MainLayout
			header={content.header || STATIC_CONTENT.header}
			footer={content.footer || STATIC_CONTENT.footer}
		>
			<Store data={content.pages.store} />
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
export default StorePage
