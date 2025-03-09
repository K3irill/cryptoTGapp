import React, { FunctionComponent } from 'react'
import {
	ExchangeStyled,
	OverviewStyled,
	FirstColumnOverview,
	SecondColumnOverview,
	Balance,
	GoldTitle,
	StarsWrapper,
	StarsOptionList,
	StarOptionItem,
	Count,
	StarInfo,
	StarButton,
} from './styled'
import { ExchangeProps } from './Exchange.d'

import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import PugoLabel from '@/components/PugoLabel/PugoLabel'
import ShinyButton from '@/components/UI/ShinyButton/ShinyButton'
import { TopBorderStyled } from '../Bank/styled'
import { TextStyled } from '../Frens/styled'
import { Container } from '@/styles/styled'
import { StarWrapper } from '@/components/TopPageInfo/styled'
import GoldStar from '@/components/GoldStar/GoldStar'
import Image from 'next/image'

export const Exchange: FunctionComponent<ExchangeProps> = ({
	data,
	children,
}) => {
	console.log(data.top_section)
	return (
		<ExchangeStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<OverviewStyled>
					<FirstColumnOverview>
						<h2>Overview</h2>
						<p>Total Balance</p>
						<Balance>
							<h3>1179253.02</h3>
							<PugoLabel title='PUGO' />
						</Balance>
						<p>$?????</p>
					</FirstColumnOverview>
					<SecondColumnOverview>
						<GoldTitle>Enable mining for 30 days for 100 stars</GoldTitle>
						<ShinyButton
							title='Enable mining'
							subtitle='10 tokens per one hour'
						></ShinyButton>
					</SecondColumnOverview>
				</OverviewStyled>
				<StarsWrapper>
					<TextStyled>The PUGO package for the stars:</TextStyled>

					<StarsOptionList>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={1} />
								</StarWrapper>
								<Count>
									50 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								1000 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={2} />
								</StarWrapper>
								<Count>
									75 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								1750 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={3} />
								</StarWrapper>
								<Count>
									100 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								2500 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={4} />
								</StarWrapper>
								<Count>
									150 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								3500 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={5} />
								</StarWrapper>
								<Count>
									250 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								7770 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={6} />
								</StarWrapper>
								<Count>
									500 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								18000 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
						<StarOptionItem>
							<StarButton>Buy</StarButton>
							<StarInfo>
								<StarWrapper>
									<GoldStar count={6} />
								</StarWrapper>
								<Count>
									1000 <span>Stars</span>
								</Count>
							</StarInfo>
							<Count>
								45000 <span>PUGO</span>
							</Count>
							<Image src='/coin.svg' width={33} height={33} alt='' />
						</StarOptionItem>
					</StarsOptionList>
				</StarsWrapper>
				{children}
			</Container>
		</ExchangeStyled>
	)
}
