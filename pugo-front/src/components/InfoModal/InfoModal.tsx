import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {
	CloseButtonWrapper,
	Content,
	PugImage,
	SocialLinks,
	Divider,
} from './styled'
import MulticolouredButton from '../UI/MulticolouredButton/MulticolouredButton'
import CloseButton from '../UI/CloseButton/CloseButton'
import { handleAutomining } from '@/utils/sendBotMessage'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Link from 'next/link'

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 320,
	maxHeight: '70vh',
	overflowY: 'auto',
	background: `linear-gradient(120.56deg, #1D2948 -2.28%, #141D33 21.31%, #0F1628 33.91%, #050A16 92.75%)`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	boxShadow: 24,
	p: 2,
	color: 'white',
	borderRadius: '10px',
}
interface BasicModalProps {
	isVisible: boolean
	onClose: () => void
}

export const InfoModal: React.FC<BasicModalProps> = ({
	isVisible,
	onClose,
}) => {
	const user = useSelector((state: RootState) => state.user)

	return (
		<Modal
			open={isVisible}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={modalStyle}>
				<CloseButtonWrapper>
					<CloseButton onClick={onClose} title='X' />
				</CloseButtonWrapper>
				<Content>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
						sx={{ color: '#FFD700', fontWeight: 'bold', mb: 2 }}
					>
						Общая информация о приложении
					</Typography>
					{/* Добавим Содержание */}
					<Typography
						variant='h6'
						sx={{ color: '#f200ff', fontWeight: 'bold', mb: 2 }}
					>
						Содержание:
					</Typography>
					<ul
						style={{ color: '#FFFFFF', listStyleType: 'none', paddingLeft: 0 }}
					>
						<li>
							<a
								href='#tokens'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								Как получить токены
							</a>
						</li>
						<li>
							<a
								href='#value'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								Какую ценность они несут
							</a>
						</li>
						<li>
							<a
								href='#invite'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								Про приглашение друзей
							</a>
						</li>
						<li>
							<a
								href='#ads'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								Про рекламу
							</a>
						</li>
						<li>
							<a
								href='#goals'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								Наши цели
							</a>
						</li>
						<li>
							<a
								href='#bot'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								O Боте BIF
							</a>
						</li>
						<li>
							<a
								href='#socials'
								style={{ color: '#f200ff', textDecoration: 'underline' }}
							>
								Социальные сети
							</a>
						</li>
					</ul>
					<Divider />
					<Typography
						id='tokens'
						variant='h6'
						component='h2'
						sx={{ color: '#00BFFF', fontWeight: 'bold', mt: 2 }}
					>
						Важно
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Как вы могли заметить, на данный момент не все страницы и функции
						доступны, поскольку они находятся в стадии разработки и доработки.
						Мы только начали запуск нашего приложения, и оно продолжает
						эволюционировать. Мы активно работаем над улучшениями и исправлением
						недочетов, чтобы предоставить вам лучший опыт. У нас есть множество
						идей для развития BIFS, и мы с нетерпением ждем, чтобы поделиться
						ими с вами!
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						С вашей стороны мы ждем понимания, поддержки и активного
						распространения информации о нас. Чем больше людей узнает о нашем
						проекте, тем больше ценность он приобретет, и тем быстрее мы сможем
						двигаться вперед и развивать BIFS!
					</Typography>
					<Divider />
					<Typography
						id='tokens'
						variant='h6'
						component='h2'
						sx={{ color: '#00BFFF', fontWeight: 'bold', mt: 2 }}
					>
						Как получить токены
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Вы можете получать токены, выполняя задания, играя в игры, приглашая
						друзей и{' '}
						<a
							href='#ads'
							style={{ color: '#f200ff', textDecoration: 'underline' }}
						>
							рекламируя
						</a>{' '}
						нас. Каждое действие приносит вам вознаграждение в токенах BIFS. И
						это только начало!
					</Typography>
					<Divider />

					<Typography
						id='value'
						variant='h6'
						component='h2'
						sx={{ color: '#00BFFF', fontWeight: 'bold', mt: 2 }}
					>
						Какую ценность они несут
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Токены BIFS можно использовать для покупки улучшений, бустов и
						эксклюзивных возможностей в игре. В будущем вы сможете обменивать их
						на реальные активы.
					</Typography>
					<Divider />

					<Typography
						id='invite'
						variant='h6'
						component='h2'
						sx={{ color: '#00BFFF', fontWeight: 'bold', mt: 2 }}
					>
						Про приглашение друзей
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Приглашайте друзей и получайте дополнительные токены за каждого
						приглашённого. Ваши друзья тоже получат бонусы за регистрацию!
					</Typography>
					<Divider />

					<Typography
						id='ads'
						variant='h6'
						component='h2'
						sx={{ color: '#f700ff', fontWeight: 'bold', mt: 2 }}
					>
						Рекламируйте нас и получайте вознаграждения!
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Мы ценим вашу поддержку и готовы вознаграждать вас за продвижение
						нашего проекта! Вот как это работает:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>1. Создавайте контент:</strong>{' '}
						Пишите посты, снимайте видео (TikTok, Shorts), делайте мемы или даже
						расклеивайте листовки — всё, что привлекает внимание к нашему
						проекту.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							2. Получайте просмотры:
						</strong>{' '}
						Чем больше людей увидят ваш контент, тем больше токенов вы получите.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>3. Отправьте отчёт:</strong>{' '}
						Перейдите в нашего бота, напишите <strong>/earn</strong>, выберите
						Получить вознаграждение и прикрепите:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#0eb5de', pl: 2 }}
					>
						- Ссылку на ваш контент. - Скриншот с количеством просмотров.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Мы проверим вашу активность и начислим токены в течение 24 часов.
						Чем креативнее ваш контент, тем больше вы заработаете!
					</Typography>
					<Divider />
					{/* Блок 5: Наши цели */}
					<Typography
						id='goals'
						variant='h6'
						component='h2'
						sx={{ color: '#f700ff', fontWeight: 'bold', mt: 2 }}
					>
						Наши цели
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Мы стремимся стать одним из ведущих проектов в мире криптовалют. Вот
						наши ключевые цели:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							1. Листинг на крупных биржах:
						</strong>{' '}
						Мы на 100% уверены, что токен BIFS будет представлен на ведущих
						платформах, таких как BLUM, STON.fi DEX, BYBIT и Binance. Это
						откроет новые возможности для торговли и инвестиций.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							2. Развитие экосистемы:
						</strong>{' '}
						Мы активно работаем над созданием новых функций и возможностей
						внутри проекта. Это включает в себя:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF', pl: 2 }}
					>
						- Добавление новых игр и заданий для заработка токенов. - Внедрение
						системы стейкинга, чтобы вы могли получать пассивный доход. -
						Создание NFT-коллекций, которые можно будет использовать в играх и
						экосистеме.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							3. Глобальное сообщество:
						</strong>{' '}
						Мы хотим объединить людей со всего мира вокруг нашего проекта. Для
						этого мы:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF', pl: 2 }}
					>
						- Проводим регулярные конкурсы и мероприятия с ценными призами. -
						Поддерживаем активных участников через реферальную программу и
						бонусы. - Создаём платформу для общения и обмена идеями.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							4. Удобство и доступность:
						</strong>{' '}
						Мы стремимся сделать криптовалюту простой и понятной для каждого.
						Для этого мы:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF', pl: 2 }}
					>
						- Разрабатываем удобный интерфейс для всех платформ. - Предоставляем
						подробные обучающие материалы. - Поддерживаем пользователей через
						круглосуточную службу поддержки.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Мы уверенно движемся к этим целям и приглашаем вас стать частью
						нашего успеха!
					</Typography>
					<Divider />

					{/* Блок: О боте BIF */}
					<Typography
						id='bot'
						variant='h6'
						component='h2'
						sx={{ color: '#f700ff', fontWeight: 'bold', mt: 2 }}
					>
						О боте BIF
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Наш Telegram-бот — это ваш помощник в мире BIFS. С его помощью вы
						можете зарабатывать токены, приглашать друзей, управлять аккаунтом и
						получать поддержку. Вот основные возможности:
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>1. Заработок токенов:</strong>{' '}
						Выполняйте задания, такие как создание контента (посты, видео,
						мемы), и получайте токены. Для этого отправьте боту ссылку на
						контент и скриншот с количеством просмотров через команду{' '}
						<strong style={{ color: '#d309bb' }}>/earn</strong>.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							2. Реферальная программа:
						</strong>{' '}
						Приглашайте друзей и получайте бонусные токены за каждого
						приглашённого. Используйте команду{' '}
						<strong style={{ color: '#d309bb' }}>/invite</strong>, чтобы
						получить уникальную реферальную ссылку.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>3. Автомайнинг:</strong>{' '}
						Активируйте автомайнинг токенов на 7, 21 или 30 дней через команду{' '}
						<strong style={{ color: '#d309bb' }}>/automine</strong>. Бот будет
						ежедневно начислять токены и уведомлять о статусе.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>4. Покупка токенов:</strong>{' '}
						Покупайте токены BIFS напрямую через бота. Используйте команду{' '}
						<strong style={{ color: '#d309bb' }}>/buy</strong>, чтобы выбрать
						количество токенов и получить реквизиты для оплаты.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							5. Техническая поддержка:
						</strong>{' '}
						Если у вас возникли вопросы или проблемы, напишите в поддержку через
						команду <strong style={{ color: '#d309bb' }}>/support</strong>. Бот
						предоставит ответы на часто задаваемые вопросы или свяжет с
						оператором.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							6. Управление аккаунтом:
						</strong>{' '}
						Просматривайте баланс токенов, историю транзакций и статус
						автомайнинга через команду{' '}
						<strong style={{ color: '#d309bb' }}>/balance</strong>.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						<strong style={{ color: '#12b317' }}>
							7. Информация о проекте:
						</strong>{' '}
						Узнавайте актуальные новости, обновления и цели проекта через
						команду <strong style={{ color: '#d309bb' }}>/info</strong>.
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 1, color: '#FFFFFF' }}
					>
						Мы стремимся сделать взаимодействие с BIFS максимально удобным и
						выгодным для вас. Присоединяйтесь к нашему боту и начните
						зарабатывать уже сегодня!
					</Typography>
					<Divider />

					<Typography
						id='socials'
						variant='h6'
						component='h2'
						sx={{ color: '#FFD700', fontWeight: 'bold', mt: 2 }}
					>
						Мы в социальных сетях
					</Typography>

					<SocialLinks>
						<Link
							href='https://t.me/your_telegram'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Typography
								sx={{ color: '#00BFFF', textDecoration: 'underline' }}
							>
								Telegram
							</Typography>
						</Link>
						<Link
							href='https://twitter.com/your_twitter'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Typography
								sx={{ color: '#00BFFF', textDecoration: 'underline' }}
							>
								Twitter
							</Typography>
						</Link>
						<Link
							href='https://discord.gg/your_discord'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Typography
								sx={{ color: '#00BFFF', textDecoration: 'underline' }}
							>
								Discord
							</Typography>
						</Link>
					</SocialLinks>
				</Content>
			</Box>
		</Modal>
	)
}
