// types.ts

export interface HeaderContent {
	site_link: string
}

export interface NavItem {
	id: string
	title: string | null
	src: string | null
	href: string
	availability: boolean
	isButton?: boolean
}
export interface FooterContent {
	navigation: {
		nav_elements: NavItem[]
		top_nav: NavItem[]
	}
}
export interface ActivityItem {
	id: number
	date: Date
	amount: number
	active: string
	wallet: string
}
export interface PagesTypes {
	home: HomeTypes
	bank: BankTypes
	exchange: ExchangeTypes
	tasks: TasksTypes
	frens: FrensTypes
	rating: object
	map: MapTypes
	earn: EarnTypes
	store: StoreTypes
}
export interface TopSectionTypes {
	title: string
	titleWithBorder: boolean
}
export interface ContentData {
	header: HeaderContent
	footer: FooterContent
	pages: PagesTypes
	welcomeSlider: WelcomeSlider
}

export type GamesSliderType = {
	id: string
	title: string
	description: string
	image: string
}

export type GameSliderType = {
	button: string
	games: GamesSliderType[]
}
export interface HomeTypes {
	top_section: TopSectionTypes | null
	site_link: string
	banner: {
		title: string
	}
	basicModal: {
		btnText: string
		title: string
		text: string
	}
	mining: {
		text: string
		notification: string
	}
	gameSlider: GameSliderType
}

export interface BankTypes {
	top_section: TopSectionTypes
}

export interface TasksTypes {
	top_section: TopSectionTypes
	header: {
		subtitle: string
	}
	instruction: {
		title: string
		steps: Array<{
			text: string
			image: string
		}>
	}
	sections: {
		available: {
			title: string
			empty: {
				text: string
				image: string
			}
		}
		completed: {
			title: string
			empty: {
				text: string
				image: string
			}
		}
	}
	taskItem: TaskItemTexts
}

export interface TaskItemButtonTexts {
	checking: string
	pending: string
	completed: string
	go: string
	complete: string
}

export interface TaskItemTexts {
	button: TaskItemButtonTexts
	progress: string
}
export interface FrensTypes {
	top_section: {
		title: string
		titleWithBorder: boolean
	}
	heading: {
		title: string
		subtitle: string
	}
	bonuses: {
		bonus_1: {
			title: string
			text: string
			text_part: string
		}
		bonus_2: {
			title: string
			text: string
		}
	}
	note: {
		success: string
		error: string
	}
	refBtn: {
		loading_text: string
		text: string
	}
	refs_block: {
		title: string
		empty: string
	}
}

export interface ExchangeTopSection {
	title: string
	titleWithBorder: boolean
}

export interface ExchangeBalanceContent {
	title: string
	dollarEquivalent: string
}

export interface ExchangeMiningContent {
	title: string
	active: string
	inactive: string
	activateButton: string
	dailyReward: string
}

export interface ExchangeStarsContent {
	title: string
	subtitle: string
	buyButton: string
	starsLabel: string
	tokensLabel: string
}

export interface ExchangeTimeUnits {
	days: [string, string, string]
	hours: [string, string, string]
	minutes: [string, string, string]
}

export interface ExchangeContent {
	balance: ExchangeBalanceContent
	mining: ExchangeMiningContent
	stars: ExchangeStarsContent
	timeUnits: ExchangeTimeUnits
}

export interface ExchangeTypes {
	top_section: ExchangeTopSection
	content: ExchangeContent
}

export interface MapTypes {
	top_section: TopSectionTypes
	mapSrc: string
}

export interface GameItem {
	id: string
	title: string
	description: string
	comingSoon?: string
}

export interface EarnContent {
	header: {
		mainTitle: string
		subTitle: string
	}
	games: GameItem[]
}

export interface EarnTypes {
	top_section: TopSectionTypes
	content: EarnContent
}

export interface TopSectionTypes {
	title: string
	titleWithBorder: boolean
}

export interface StoreModalsTypes {
	openBtn: string
	contentBtn: string
	notEnough: string
	opening: string
	close: string
	congrats: string
	youWon: string
	alreadyHaveStatus: string
	buy_modal: {
		title: string
		text: string
		btnText: string
	}
}

export interface CaseItemsTypes {
	coins: string
	days: string
	privileges: string
}

export interface StoreContentTypes {
	lost_case_title: string
	cases_title: string
	special_sets_title: string
	modals: StoreModalsTypes
	caseItems: CaseItemsTypes
}

export interface StoreTypes {
	top_section: TopSectionTypes
	content: StoreContentTypes
}
export interface TasksApi {
  id: number;
  icon: string;
  description: {
    cn: string;
    de: string;
    en: string;
    es: string;
    fr: string;
    pt: string;
    ru: string;
    ua: string;
  };
  reward: string;
  createdAt: Date;
  updatedAt: Date;
  link: string;
  chatId: string | null;
  type?: 'game_achievement' | 'subscription' | 'default';
  achievementType?: 'open_cases' | 'space_pug_score' | 'referrals_count' | null;
  targetValue?: number | null;
  period?: 'once' | 'daily' | 'weekly' | 'monthly';
  isActive?: boolean;

  UserTask: {
    status: 'available' | 'pending' | 'completed';
    currentProgress?: number;
    completedAt?: Date | null;
  };

  progress?: number;
  isCompleted?: boolean;
  completedAt?: Date | null;
}

// export interface ExchangeTypes {}

// export interface FrensTypes {}
// export interface RatingTypes {}
// export interface MapTypes {}
export interface SpacePugUiTexts {
	record: string
	score: string
	lives: string
	time: string
	sizeReduction: string
	sizeIncrease: string
	speedBoost: string
	seconds: string
}

export interface SpacePugButtons {
	playAgain: string
	gameInfo: string
	exit: string
	stop: string
}

export interface SpacePugModalTexts {
	title: string
	text: string
	button: string
}

export interface SpacePugContent {
	ui: SpacePugUiTexts
	buttons: SpacePugButtons
	modals: {
		gameOver: SpacePugModalTexts
		confirmExit: SpacePugModalTexts
	}
}
export interface GameGuideItem {
	name: string
	desc: string
}

export interface GameGuideSection {
	title: string
	content?: string
	items?: Record<string, string>
	list?: GameGuideItem[] | string[]
	factors?: string[]
}

export interface GameGuideContent {
	title: string
	sections: {
		goal: GameGuideSection
		controls: GameGuideSection
		items: GameGuideSection
		dangers: GameGuideSection
		tips: GameGuideSection
		scoring: GameGuideSection
	}
	footer: string
}
export interface BifsMinerTexts {
	ui: {
		score: string
		time: string
		level: string
		missed: string
		combo: string
		comboMode: string
		loading: string
	}
	buttons: {
		stop: string
		playAgain: string
		gameInfo: string
		exit: string
		yes: string
		ok: string
	}
	modals: {
		confirmExit: {
			title: string
			text: string
		}
		gameOver: {
			title: string
			text: string
		}
	}
	feedback: {
		good: string
		bad: string
	}
}

export interface GuideItem {
	name: string
	desc: string
}

export interface GuideSection {
	title: string
	content?: string
	items?: string[] | GuideItem[]
}

export interface CrystalMinerGuide {
	title: string
	sections: {
		goal: GuideSection
		objects: GuideSection
		mechanics: GuideSection
		scoring: GuideSection
		tips: GuideSection
	}
	footer: string
}

export interface WelcomeSlider {
	slides: Slide[]
	navigation: Navigation
	tokenBadge: string
}

export interface Slide {
	title: string
	text: string
	button: string
}

export interface Navigation {
	back: string
	next: string
	start: string
	dots: string
}
