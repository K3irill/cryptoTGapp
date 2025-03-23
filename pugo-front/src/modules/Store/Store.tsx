import React, { FunctionComponent } from 'react'
import {
	StoreBlock,
	StoreStyled,
	GameCard,
	GCardTitle,
	StoreSliderTitle,
	StoreSliderRow,
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

export const Store: FunctionComponent<StoreProps> = ({ data, children }) => {
	const { id } = useSelector((state: RootState) => state.user)
	const router = useRouter()

	const handleCardClick = () => {
		router.push('/game/spacepug')
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
							{/* SwiperSlide for each GameCard */}
							<SwiperSlide>
								<GameCard background='/store/cases/case-4.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-1.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-2.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-3.jpg'></GameCard>
							</SwiperSlide>
						</Swiper>
					</StoreSliderRow>
					<StoreSliderRow>
						<StoreSliderTitle>Наборы карточек</StoreSliderTitle>

						<Swiper spaceBetween={15} slidesPerView={3} loop={true}>
							{/* SwiperSlide for each GameCard */}
							<SwiperSlide>
								<GameCard background='/store/cases/case-4.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-1.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-2.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-3.jpg'></GameCard>
							</SwiperSlide>
						</Swiper>
					</StoreSliderRow>
					<StoreSliderRow>
						<StoreSliderTitle>Наборы с привилегиями</StoreSliderTitle>

						<Swiper spaceBetween={15} slidesPerView={3} loop={true}>
							{/* SwiperSlide for each GameCard */}
							<SwiperSlide>
								<GameCard background='/store/cases/case-4.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-1.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-2.jpg'></GameCard>
							</SwiperSlide>
							<SwiperSlide>
								<GameCard background='/store/cases/case-3.jpg'></GameCard>
							</SwiperSlide>
						</Swiper>
					</StoreSliderRow>
				</StoreBlock>
			</Container>
		</StoreStyled>
	)
}
