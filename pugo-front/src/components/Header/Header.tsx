/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent, useEffect, useState } from 'react'
import {
	HeaderStyled,
	UserAvatarStyled,
	UserBlockStyled,
	UserNicknameStyled,
	UserAvatarContainer,
	StatusBadge,
	UserAvatarWrap,
	OutButton,
} from './styled'
import { HeaderProps } from './Header.d'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { InfoModal } from '../InfoModal/InfoModal'
import { statusConfig } from '@/assets/constants/statusConfig'
import { useTranslation } from 'next-i18next'
import CustomSelect from '../LanguageSwitcher/LanguageSwitcher'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
	const router = useRouter()
	const user = useSelector((state: RootState) => state.user)
	const [openInfoModal, setOpenInfoModal] = useState(false)
	const { t, i18n } = useTranslation()

	const languageOptions = [
		{ value: 'en', label: 'EN', icon: '🌐' },
		{ value: 'ru', label: 'RU', icon: '🪆' },
		{ value: 'ua', label: 'UA', icon: '🌻' },
		{ value: 'cn', label: 'CN', icon: '🐉' },
		{ value: 'fn', label: 'FN', icon: '🗼' },
		{ value: 'de', label: 'DE', icon: '🍪' },
		{ value: 'pt', label: 'PT', icon: '🍷' },
	]

	const [currentLanguage, setCurrentLanguage] = useState(router.locale || 'en')

	const handleLanguageChange = async (newLanguage: string) => {
		if (newLanguage === currentLanguage) return

		try {
			localStorage.setItem('language', newLanguage)

			setCurrentLanguage(newLanguage)

			await i18n.changeLanguage(newLanguage)

			await router.push(router.pathname, router.asPath, {
				locale: newLanguage,
				scroll: false,
			})
		} catch (error) {
			console.error('Language change failed:', error)
		}
	}

	// Синхронизация при монтировании компонента
	useEffect(() => {
		const initializeLanguage = async () => {
			// Приоритеты: 1. localStorage 2. Роутер 3. Дефолтный 'en'
			const savedLanguage = localStorage.getItem('language')
			const preferredLanguage = savedLanguage || router.locale || 'en'

			if (preferredLanguage !== currentLanguage) {
				setCurrentLanguage(preferredLanguage)
				await i18n.changeLanguage(preferredLanguage)
			}
		}

		initializeLanguage()
	}, [])

	const handleModalClose = () => {
		setOpenInfoModal(false)
	}

	return (
		<HeaderStyled>
			<UserBlockStyled>
				<UserAvatarWrap>
					<UserAvatarContainer status={user.status || 1}>
						<UserAvatarStyled
							src={user.photoUrl || '/coin-c.png'}
							alt='User avatar'
						/>
					</UserAvatarContainer>
					<StatusBadge as='div' status={user.status || 1}>
						{statusConfig[user.status || 1].name}
					</StatusBadge>
				</UserAvatarWrap>

				<UserNicknameStyled>
					{user.username || user.firstName ? (
						<>
							{user.username && <p>{'@' + user.username}</p>}
							{user.firstName && <h3>{user.firstName}</h3>}
						</>
					) : (
						<p>{t('header.not_found')}</p>
					)}
				</UserNicknameStyled>
			</UserBlockStyled>

			<CustomSelect
				options={languageOptions}
				value={currentLanguage}
				onChange={handleLanguageChange}
			/>

			<OutButton
				onClick={() => setOpenInfoModal(prev => !prev)}
				whileHover={{ rotate: 15 }}
				whileTap={{ scale: 0.9 }}
			>
				<img src='/icons/info.svg' alt={t('header.info')} />
			</OutButton>

			{children}
			<InfoModal isVisible={openInfoModal} onClose={handleModalClose} />
		</HeaderStyled>
	)
}
