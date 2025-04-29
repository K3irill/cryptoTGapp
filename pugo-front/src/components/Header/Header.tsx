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
import { changeStoreLang } from '@/store/slices/userSlice'
import { HeaderProps } from './Header.d'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { InfoModal } from '../InfoModal/InfoModal'
import { statusConfig } from '@/assets/constants/statusConfig'
import { useTranslation } from 'next-i18next'
import CustomSelect from '../LanguageSwitcher/LanguageSwitcher'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useChangeLangMutation } from '@/store/services/api/userApi'

export const Header: FunctionComponent<HeaderProps> = ({
	content,
	children,
}) => {
	const router = useRouter()
	const user = useSelector((state: RootState) => state.user)
	const [openInfoModal, setOpenInfoModal] = useState(false)
	const { t, i18n } = useTranslation()
  const [changeLang] = useChangeLangMutation()
  const dispatch = useDispatch()

  const changeLangOnServer = async (lang: string) => {
		try {
			const response = await changeLang({
				telegramId: Number(user.id),
				lang
			}).unwrap()

			if (!response.success) {
				throw new Error(response.error || 'Failed to change lang')
			}
		} catch (error) {
			console.error('Changing lang error:', error)
			throw error
		}
	}

	const languageOptions = [
		{ value: 'en', label: 'EN', icon: '🌐' },
		{ value: 'ru', label: 'RU', icon: '🪆' },
		{ value: 'ua', label: 'UA', icon: '🌻' },
		{ value: 'cn', label: 'CN', icon: '🐉' },
		{ value: 'fr', label: 'FR', icon: '🗼' },
		{ value: 'de', label: 'DE', icon: '🍪' },
		{ value: 'pt', label: 'PT', icon: '🍷' },
	]

	

	const handleLanguageChange = async (newLanguage: string) => {
		if (newLanguage === user.lang) return

		try {
			changeLangOnServer(newLanguage)
			dispatch(changeStoreLang(newLanguage))

			await i18n.changeLanguage(newLanguage)

			await router.push(router.pathname, router.asPath, {
				locale: newLanguage,
				scroll: false,
			})
		} catch (error) {
			console.error('Language change failed:', error)
		}
	}

  useEffect(() => {
    // Синхронизируем язык из URL с Redux при загрузке
    if (router.locale && router.locale !== user.lang) {
      dispatch(changeStoreLang(router.locale));
    }
  }, [router.locale]);

	useEffect(() => {
		const initializeLanguage = async () => {

			const preferredLanguage = user.lang || router.locale || 'en'

      dispatch(changeStoreLang(preferredLanguage))
			if (preferredLanguage !== user.lang) {
        changeLangOnServer(preferredLanguage)
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
						<p>🔃loading...</p>
					)}
				</UserNicknameStyled>
			</UserBlockStyled>

			<CustomSelect
				options={languageOptions}
				value={user.lang}
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
			<InfoModal
				content={content.infoModal}
				isVisible={openInfoModal}
				onClose={handleModalClose}
			/>
		</HeaderStyled>
	)
}
