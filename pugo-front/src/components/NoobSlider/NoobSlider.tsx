import React, { FunctionComponent, useRef, useState } from 'react'

import {
	NoobSlide,
	NoobSliderStyled,
	SlideBanner,
	SlideButtons,
	SlideImage,
	SlideText,
	SlideTitle,
	SlideTokenName,
} from './styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import MulticolouredButton from '../UI/MulticolouredButton/MulticolouredButton'
import { CoinName } from '@/modules/Home/styled'
import SwiperCore from 'swiper'
import { TypeAnimation } from 'react-type-animation'

interface NoobSliderProps {
	onClose?: () => void // Пропс для закрытия слайдера
}

const NoobSlider: FunctionComponent<NoobSliderProps> = ({ onClose }) => {
	const user = useSelector((state: RootState) => state.user)
	const swiperRef = useRef<SwiperCore | null>(null)
	const [shownSlides, setShownSlides] = useState<number[]>([])

	const slides = [
		{
			title: 'Добро пожаловать',
			img: '/pugs/greet-pug.png',
			name: 'BONIFACE',
			text: 'Мы создали экосистему, где вы можете зарабатывать токены, играя, выполняя задания и приглашая друзей. Наша миссия — сделать криптовалюту простой и доступной для каждого.',
		},
		{
			title: 'Зарабатывайте токены легко!',
			img: '/coin-c.png',
			name: 'BONIFACE',
			text: 'Выполняйте задания, играйте в игры и приглашайте друзей, чтобы получать токены. Каждое действие приносит вам вознаграждение!',
		},
		{
			title: 'Используйте токены с пользой!',
			img: '/pugs/with-coins-pug.png',
			name: 'BIFS',
			text: 'Покупайте токены за телеграм Stars или TON, обменивайте их на бусты и улучшения. Скоро появится возможность выводить свои токены на биржи. Ваши токены — это ваши возможности!',
		},
		{
			title: 'Приглашайте друзей и получайте больше!',
			img: '/pugs/frens-pug.png',
			name: 'BIFS',
			text: 'Делитесь своей реферальной ссылкой и получайте токены за каждого приглашённого друга. Чем больше друзей, тем больше токенов!',
		},
		{
			title: 'Мы растем вместе с вами!',
			img: '/pugs/heart-pug.png',
			name: 'BIFS',
			text: 'Мы не собираемся тянуть с листингом! Не пропускайте важные события, следите за новостями и будьте в курсе новых функций, игр и возможностей. Вместе мы создаем будущее!',
		},
	]

	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext()
		}
	}

	const handlePrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev()
		}
	}

	const handleGoToSpace = () => {
		if (onClose) {
			onClose()
		}
	}

	const handleSlideChange = (swiper: SwiperCore) => {
		const activeIndex = swiper.activeIndex

		if (!shownSlides.includes(activeIndex)) {
			setShownSlides(prev => [...prev, activeIndex])
		}
	}

	return (
		<NoobSliderStyled>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSwiper={swiper => {
					swiperRef.current = swiper
				}}
				onSlideChange={handleSlideChange}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<NoobSlide>
							<SlideTitle>{slide.title}</SlideTitle>
							<SlideBanner>
								<SlideImage src={slide.img} />
								<CoinName>{slide.name}</CoinName>
							</SlideBanner>
							<SlideText>
								{shownSlides.includes(index) ? (
									<TypeAnimation
										sequence={[slide.text]}
										speed={50}
										style={{ whiteSpace: 'pre-line' }}
										repeat={0}
									/>
								) : (
									slide.text
								)}
							</SlideText>
							<SlideButtons>
								{index > 0 && (
									<MulticolouredButton
										theme='blue'
										title='Назад'
										onClick={handlePrev}
									/>
								)}

								{index < slides.length - 1 ? (
									<MulticolouredButton title='Вперёд' onClick={handleNext} />
								) : (
									<MulticolouredButton
										title='В космос'
										onClick={handleGoToSpace}
									/>
								)}
							</SlideButtons>
						</NoobSlide>
					</SwiperSlide>
				))}
			</Swiper>
		</NoobSliderStyled>
	)
}

export default NoobSlider
