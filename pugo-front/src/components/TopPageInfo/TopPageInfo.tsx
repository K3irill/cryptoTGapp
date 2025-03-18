import { FunctionComponent } from 'react'
import { TopPageInfoProps } from './TopPageInfo.d'
import {
	BorderTopStyled,
	BorderTopWrapper,
	ButtonBackStyled,
	NamePage,
	StarWrapper,
	TopInfoWrapperStyled,
	TopPageStyled,
} from './styled'
import PugoLabel from '../PugoLabel/PugoLabel'
import GoldStar from '../GoldStar/GoldStar'

const TopPageInfo: FunctionComponent<TopPageInfoProps> = ({ data }) => {
	return (
		<TopPageStyled>
			<BorderTopWrapper>
				<BorderTopStyled src='/blue-top-border.svg' alt='' />
			</BorderTopWrapper>
			<TopInfoWrapperStyled>
				<ButtonBackStyled href='/'>
					<img src='/icons/back-arrow.svg' alt='' />
				</ButtonBackStyled>
				<NamePage withBorder={data.titleWithBorder}>
					{data.titleWithBorder && <PugoLabel title='PUGO' />}
					{data.title && <p>{data.title}</p>}
					{data.titleWithBorder && (
						<StarWrapper>
							<GoldStar />
						</StarWrapper>
					)}
				</NamePage>
				<ButtonBackStyled style={{ visibility: 'hidden' }}>
					<img src='/icons/back-arrow.svg' alt='' />
				</ButtonBackStyled>
			</TopInfoWrapperStyled>
		</TopPageStyled>
	)
}

export default TopPageInfo
