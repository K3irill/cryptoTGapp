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
import { Navigation } from 'swiper/modules'

export const Store: FunctionComponent<StoreProps> = ({ data, children }) => {
	const { id } = useSelector((state: RootState) => state.user)
	const router = useRouter()
	const [showModal, setShowModal] = useState<boolean>(false)
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

	return (
		<StoreStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<TopBorderStyled src='./grey-top-border.svg' alt='border' />
				<StoreBlock>
					<StoreSliderRow>
						<StoreSliderTitle>Кейсы</StoreSliderTitle>

						<Swiper
							spaceBetween={5}
							slidesPerView={2}
							loop={true}
							navigation
							modules={[Navigation]}
						>
							<SwiperSlide>
								<CaseCard
									shadowColor='#4f046c'
									onClick={() =>
										handleCaseClick(
											'coins',
											'BIFS COINS',
											'/store/cases/case-1.png',
											500
										)
									}
								>
									<img src='/store/cases/case-1.png' alt='' />
									<CaseTitle>BIFS COINS</CaseTitle>
								</CaseCard>
							</SwiperSlide>
							<SwiperSlide>
								<CaseCard
									shadowColor='#92210d'
									onClick={() =>
										handleCaseClick(
											'days',
											'AUTOMINING',
											'/store/cases/case-3.png',
											300
										)
									}
								>
									<img src='/store/cases/case-3.png' alt='' />
									<CaseTitle>AUTOMINING</CaseTitle>
								</CaseCard>
							</SwiperSlide>
							<SwiperSlide>
								<CaseCard
									disabled
									shadowColor='#045885'
									onClick={() =>
										handleCaseClick(
											'ships',
											'SPACESHIPS',
											'/store/cases/case-2.png',
											1000
										)
									}
								>
									<Lock
										style={{ width: '70%', top: '0%', filter: 'none' }}
										src='/icons/lock.svg'
										alt='locked'
									/>
									<img src='/store/cases/case-2.png' alt='' />
									<CaseTitle>SPACESHIPS</CaseTitle>
								</CaseCard>
							</SwiperSlide>
						</Swiper>
					</StoreSliderRow>
				</StoreBlock>
			</Container>

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
		</StoreStyled>
	)
}
