// lib/fetchContent.ts
import { ContentData } from '@/types/types'

export async function getContent(): Promise<ContentData> {
	const res = await fetch('https://pugo.onrende2r.com/api/content')
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
	}
	const content: ContentData = await res.json()
	return content
}
