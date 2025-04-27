import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
	CosmicSliderContainer,
	SlideWrapper,
	SlideBackground,
	SlideContent,
	SlideTitle,
	SlideImageContainer,
	SlideImage,
	SlideText,
	NavigationDots,
	Dot,
	CosmicButton,
	TokenBadge,
	GlowEffect,
	Particle,
	BifsName,
	CustomSelectWrapper,
} from './styled'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperInstance } from 'swiper'
import { EffectCreative, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import { motion } from 'framer-motion'
import CustomSelect from '../LanguageSwitcher/LanguageSwitcher'
import { useRouter } from 'next/router'
import { ContentData, WelcomeSlider } from '@/types/types'

interface NoobSliderProps {
	onClose?: () => void
	content: ContentData
}

const NoobSlider: FunctionComponent<NoobSliderProps> = ({
	onClose,
	content,
}) => {
	const { t, i18n } = useTranslation('common')
	const [activeIndex, setActiveIndex] = useState(0)
	const swiperRef = useRef<SwiperInstance | null>(null)

	const slides = [
		{
			image: '/pugs/greet-pug.png',
			color: '#6a00ff',
		},
		{
			image: '/coin-c.png',
			color: '#00b4ff',
		},
		{
			image: '/pugs/with-coins-pug.png',
			color: '#ff00e6',
		},
		{
			image: '/pugs/frens-pug.png',
			color: '#00ffb4',
		},
		{
			image: '/pugs/heart-pug.png',
			color: '#aeff00',
		},
	].map((slide, index) => ({
		...slide,
		title: content.welcomeSlider.slides[index].title,
		text: content.welcomeSlider.slides[index].text,
		buttonText: content.welcomeSlider.slides[index].button,
	}))

	const handleNext = () => swiperRef.current?.slideNext()
	const handlePrev = () => swiperRef.current?.slidePrev()
	const goToSlide = (index: number) => swiperRef.current?.slideTo(index)

	const router = useRouter()

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

	useEffect(() => {
		const initializeLanguage = async () => {
			const savedLanguage = localStorage.getItem('language')
			const preferredLanguage = savedLanguage || router.locale || 'en'

			if (preferredLanguage !== currentLanguage) {
				setCurrentLanguage(preferredLanguage)
				await i18n.changeLanguage(preferredLanguage)
			}
		}

		initializeLanguage()
	}, [])

	return (
		<CosmicSliderContainer>
			{[...Array(20)].map((_, i) => (
				<Particle
					key={i}
					size={`${Math.random() * 6 + 2}px`}
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 5}s`,
					}}
				/>
			))}
			<CustomSelectWrapper>
				<CustomSelect
					options={languageOptions}
					value={currentLanguage}
					onChange={handleLanguageChange}
				/>
			</CustomSelectWrapper>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSwiper={swiper => {
					swiperRef.current = swiper
				}}
				modules={[EffectCreative, Autoplay]}
				effect='creative'
				creativeEffect={{
					prev: {
						shadow: true,
						translate: [0, 0, -400],
						opacity: 0,
					},
					next: {
						translate: ['100%', 0, 0],
					},
				}}
				speed={800}
				onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<SlideWrapper>
							<SlideBackground $color={slide.color} />
							<GlowEffect $color={slide.color} />

							<SlideContent>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									<TokenBadge>
										{t('content.welcomeSlider.tokenBadge')}
									</TokenBadge>
									<SlideTitle>{slide.title}</SlideTitle>
								</motion.div>

								<SlideImageContainer>
									<motion.div
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.8, type: 'spring' }}
									>
										<SlideImage
											src={slide.image}
											alt=''
											style={{
												filter: `drop-shadow(0 0 20px ${slide.color}80)`,
											}}
										/>
										<BifsName>BIFSCOIN</BifsName>
									</motion.div>
								</SlideImageContainer>

								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.6, delay: 0.4 }}
								>
									<SlideText>{slide.text}</SlideText>
								</motion.div>
							</SlideContent>
						</SlideWrapper>
					</SwiperSlide>
				))}
			</Swiper>

			<NavigationDots>
				{slides.map((_, index) => (
					<Dot
						key={index}
						$active={index === activeIndex}
						$color={slides[index].color}
						onClick={() => goToSlide(index)}
					/>
				))}
			</NavigationDots>

			<div className='controls' style={{ zIndex: 10 }}>
				{activeIndex > 0 && (
					<CosmicButton
						onClick={handlePrev}
						$color={slides[activeIndex].color}
						$position='right'
					>
						{t('content.welcomeSlider.navigation.back')}
					</CosmicButton>
				)}

				{activeIndex < slides.length - 1 ? (
					<CosmicButton
						onClick={handleNext}
						$color={slides[activeIndex].color}
						$position='left'
					>
						{t('content.welcomeSlider.navigation.next')}
					</CosmicButton>
				) : (
					<CosmicButton
						onClick={onClose}
						$color={slides[activeIndex].color}
						$position='left'
						$pulse
					>
						{t('content.welcomeSlider.navigation.start')}
					</CosmicButton>
				)}
			</div>
		</CosmicSliderContainer>
	)
}

export default NoobSlider
