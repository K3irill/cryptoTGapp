// lib/fetchContent.ts
import { ContentData } from '@/types/types'
import { REQUEST_LINK } from '../../constant'

export async function getContent(): Promise<ContentData> {
	const res = await fetch(`${REQUEST_LINK}/api/content`)
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
	}
	const content: ContentData = await res.json()
	return content
}
