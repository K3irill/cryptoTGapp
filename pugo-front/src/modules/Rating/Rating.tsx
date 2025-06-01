import React, { FunctionComponent, useEffect, useState } from 'react'
import {
	RatingContainer,
	Header,
	BestPlayerContainer,
	HeaderBorderImg,
	HeaderInfoRow,
	HeaderInfoItemWrap,
	HeaderInfoItem,
	SubTitle,
	BestPlayersList,
} from './styled'
import { RatingProps } from './Rating.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Toaster, toast } from 'react-hot-toast'
import { USER_LIST } from './users'
import { IUser } from '@/types/user'
import PlayerItem from './components/PlayerItem/PlayerItem'
import { useGetUsersListQuery } from '@/store/services/api/userApi'
import { TasksContainer } from '../Tasks/styled'
import Loader from '@/components/Loader/Loader'
import Error from '@/components/Error/Error'

export const Rating: FunctionComponent<RatingProps> = ({ data }) => {
	const { id } = useSelector((state: RootState) => state.user)
	const { data: USER_LIST, error, isLoading } = useGetUsersListQuery(undefined)
	const [currentUserIndex, setCurrentUserIndex] = useState<number>()
	const [currentUser, setCurrentUser] = useState<IUser | null>()
	const [sortedUsers, setSortedUsers] = useState<IUser[]>([])
	useEffect(() => {
		if (USER_LIST) {
			setSortedUsers(
				[...USER_LIST.data].sort((a, b) => {
					if (b.tokens !== a.tokens) {
						return Number(b.tokens) - Number(a.tokens)
					}

					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					)
				})
			)

			setCurrentUserIndex(sortedUsers.findIndex(user => user.telegramId === id))

			const currentUserLocal =
				currentUserIndex !== -1 ? sortedUsers[currentUserIndex as number] : null
			setCurrentUser(currentUserLocal)
		}
	}, [USER_LIST, error, isLoading])

	if (isLoading)
		return (
			<TasksContainer>
				<Loader />
			</TasksContainer>
		)
	if (error)
		return (
			<TasksContainer>
				<Error />
			</TasksContainer>
		)

	return (
		<RatingContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<TopPageInfo data={data.top_section} />
			<BestPlayerContainer>
				<Header
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<HeaderBorderImg src='/grey-top-border.svg' alt='border' />
					<HeaderInfoRow>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Avatar</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Name/coins</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Position</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
					</HeaderInfoRow>
				</Header>
				<BestPlayersList>
					{sortedUsers.length > 0 &&
						sortedUsers
							.splice(0, 5)
							.map((user, index) => (
								<PlayerItem
									key={user.telegramId}
									user={user}
									position={index}
								/>
							))}
				</BestPlayersList>
			</BestPlayerContainer>
			{currentUser && (
				<Header
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<HeaderBorderImg
						perevertish
						src='/grey-top-border.svg'
						alt='border'
					/>
					<HeaderInfoRow flat>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Your position:</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
					</HeaderInfoRow>
					<PlayerItem
						key={currentUser.telegramId}
						user={currentUser}
						position={(currentUserIndex as number) + 1}
					/>
				</Header>
			)}
			<Toaster position='top-center' />
		</RatingContainer>
	)
}
