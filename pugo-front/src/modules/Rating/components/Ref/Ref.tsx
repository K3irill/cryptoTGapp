import React, { useEffect, useState } from 'react'
import { useGetUserInfoQuery } from '@/store/services/api/userApi'
import { RefContainer, RefName, RefTokens } from './styled'
import Label from '@/components/Label/Label'

interface RefProps {
	ref: number
}

export const Ref = ({ ref }: RefProps) => {
	const { data, error, isLoading } = useGetUserInfoQuery(ref)

	if (isLoading) {
		return (
			<RefContainer>
				<RefName>Загрузка...</RefName>
			</RefContainer>
		)
	}

	if (error) {
		return (
			<RefContainer>
				<RefName>Ошибка получении данных о реферале</RefName>
			</RefContainer>
		)
	}

	return (
		<RefContainer>
			{data && (
				<>
					<RefName>{data.userInfo.username}</RefName>
					<RefTokens>
						{`${data.userInfo.tokens} `}
						<Label size='18px' title='BIFS' />
					</RefTokens>
				</>
			)}
		</RefContainer>
	)
}
