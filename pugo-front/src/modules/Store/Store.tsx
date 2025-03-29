/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent, useState } from 'react'
import {
	StoreBlock,
	StoreStyled,
	StoreSliderTitle,
	StoreSliderRow,
	CaseCard,
	CaseTitle,
	StoreContainer,
	StoreContent,
	SliderSection,
	SliderTitle,
	StyledSwiper,
	LockOverlay,
} from './styled'
import { StoreProps } from './Store.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Container } from '@/styles/styled'
import { TopBorderStyled } from '../Bank/styled'
import { useRouter } from 'next/router'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { CaseModal } from '@/components/CaseModal/CaseModal'
import { Lock } from '@/components/Navigation/styled'
import { EffectCreative, Navigation } from 'swiper/modules'

export const Store: FunctionComponent<StoreProps> = ({ data }) => {
	const { id } = useSelector((state: RootState) => state.user)
	const [showModal, setShowModal] = useState(false)
	const [modalData, setModalData] = useState({})

	const handleCaseClick = (
		type: string,
		title: string,
		imgSrc: string,
		casePrice: number
	) => {
		setModalData({
			caseType: type,
			text: title,
			imgSrc: imgSrc,
			casePrice: casePrice,
		})
		setShowModal(true)
	}

	const handleModalClose = () => {
		setShowModal(false)
	}

	// Данные для кейсов
	const cases = [
		{
			type: 'coins',
			title: 'BIFS COINS',
			img: '/store/cases/case-1.png',
			price: 1000,
			color: '#4f046c',
			locked: false,
		},
		{
			type: 'days',
			title: 'AUTOMINING',
			img: '/store/cases/case-3.png',
			price: 4000,
			color: '#d1ce105c',
			locked: false,
		},
		{
			type: 'ships',
			title: 'SPACESHIPS',
			img: '/store/cases/case-2.png',
			price: 2500,
			color: '#045885',
			locked: true,
		},
		{
			type: 'secret',
			title: 'ЗАТЕРЯЛОСЬ В КОСМОСЕ',
			img: '/store/secret.png',
			price: 0,
			color: '#045885',
			locked: true,
		},
	]

	// Данные для наборов
	const packs = [
		{
			type: 'privileges',
			title: 'PRIVILEGES',
			img: '/store/cards/card-2.png',
			price: 100000,
			color: '#f9090987',
			locked: false,
		},
		{
			type: 'cards',
			title: 'BIFS CARDS',
			img: '/store/cards/card-1.png',
			price: 0,
			color: '#045885',
			locked: true,
		},
		{
			type: 'secret',
			title: 'ЗАТЕРЯЛОСЬ В КОСМОСЕ',
			img: '/store/secret.png',
			price: 0,
			color: '#045885',
			locked: true,
		},
	]

	return (
		<StoreContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<TopPageInfo data={data.top_section} />

			{/* Секция кейсов */}

			<SliderSection
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<SliderTitle>Кейсы</SliderTitle>
				<StyledSwiper
					slidesPerView={'auto'}
					spaceBetween={20}
					navigation
					modules={[Navigation, EffectCreative]}
				>
					{cases.map((item, index) => (
						<SwiperSlide key={index}>
							<CaseCard
								$shadowColor={item.color}
								$disabled={item.locked}
								onClick={() =>
									!item.locked &&
									handleCaseClick(item.type, item.title, item.img, item.price)
								}
							>
								{item.locked && (
									<LockOverlay>
										<img src='/icons/lock.svg' alt='locked' />
									</LockOverlay>
								)}
								<img src={item.img} alt={item.title} />
								<CaseTitle>{item.title}</CaseTitle>
							</CaseCard>
						</SwiperSlide>
					))}
				</StyledSwiper>
			</SliderSection>

			{/* Секция наборов */}
			<SliderSection
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<SliderTitle>Особые Наборы</SliderTitle>
				<StyledSwiper
					slidesPerView={'auto'}
					spaceBetween={20}
					navigation
					modules={[Navigation, EffectCreative]}
				>
					{packs.map((item, index) => (
						<SwiperSlide key={index}>
							<CaseCard
								$shadowColor={item.color}
								$disabled={item.locked}
								onClick={() =>
									!item.locked &&
									handleCaseClick(item.type, item.title, item.img, item.price)
								}
							>
								{item.locked && (
									<LockOverlay>
										<img src='/icons/lock.svg' alt='locked' />
									</LockOverlay>
								)}
								<img src={item.img} alt={item.title} />
								<CaseTitle>{item.title}</CaseTitle>
							</CaseCard>
						</SwiperSlide>
					))}
				</StyledSwiper>
			</SliderSection>

			{showModal && (
				<CaseModal
					caseType={modalData.caseType}
					isVisible={showModal}
					onClose={handleModalClose}
					text={modalData.text}
					imgSrc={modalData.imgSrc}
					casePrice={modalData.casePrice}
				/>
			)}
		</StoreContainer>
	)
}
