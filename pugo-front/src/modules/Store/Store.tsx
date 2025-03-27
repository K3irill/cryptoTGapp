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

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { BasicModal } from '@/components/CenterModal/CenterModal'
import { CaseModal } from '@/components/CaseModal/CaseModal'
import { Lock } from '@/components/Navigation/styled'

export const Store: FunctionComponent<StoreProps> = ({ data, children }) => {
	const { id } = useSelector((state: RootState) => state.user)
	const router = useRouter()
	const [showModal, setShowModal] = useState<boolean>(false)

	const handleCaseClick = (type: string) => {
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

						<Swiper spaceBetween={15} slidesPerView={3} loop={true}>
							<SwiperSlide>
								<CaseCard
									shadowColor='#4f046c'
									onClick={() => handleCaseClick('tokens')}
								>
									<img src='/store/cases/case-1.png' alt='' />
									<CaseTitle>BIFS COINS</CaseTitle>
								</CaseCard>
							</SwiperSlide>
							<SwiperSlide>
								<CaseCard
									disabled
									shadowColor='#045885'
									onClick={() => handleCaseClick('ships')}
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
							<SwiperSlide>
								<CaseCard
									disabled
									shadowColor='#92210d'
									onClick={() => handleCaseClick('mining')}
								>
									<Lock
										style={{ width: '70%', top: '0%', filter: 'none' }}
										src='/icons/lock.svg'
										alt='locked'
									/>
									<img src='/store/cases/case-3.png' alt='' />
									<CaseTitle>AUTOMINING</CaseTitle>
								</CaseCard>
							</SwiperSlide>
						</Swiper>
					</StoreSliderRow>
					<StoreSliderRow>
						{/* <StoreSliderTitle>Наборы карточек</StoreSliderTitle> */}

						<Swiper spaceBetween={15} slidesPerView={3} loop={true}></Swiper>
					</StoreSliderRow>
					<StoreSliderRow>
						{/* <StoreSliderTitle>Наборы с привилегиями</StoreSliderTitle> */}

						<Swiper spaceBetween={15} slidesPerView={3} loop={true}></Swiper>
					</StoreSliderRow>
				</StoreBlock>
			</Container>
			{showModal && (
				<CaseModal
					caseType='coins'
					isVisible={showModal}
					onClose={handleModalClose}
				/>
			)}
		</StoreStyled>
	)
}
