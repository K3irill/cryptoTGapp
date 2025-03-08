import React from 'react'
import {
	ArrowIcon,
	IconWrapper,
	InstructionBlockStyled,
	InstructionItem,
	InstructionStyled,
} from './styled'
import Image from 'next/image'
import { TextStyled } from '../../styled'

export const InstructionBlock = () => {
	return (
		<InstructionBlockStyled>
			<TextStyled>Complete the tasks to get PUGO</TextStyled>
			<InstructionStyled>
				<InstructionItem>
					<Image src='/instruction-card-1.svg' alt='1' width={49} height={49} />
				</InstructionItem>
				<IconWrapper>
					<ArrowIcon src='/icons/arrow-to-right.svg' />
				</IconWrapper>
				<InstructionItem>
					<Image src='/coin.svg' alt='1' width={49} height={49} />
				</InstructionItem>
				<IconWrapper>
					<ArrowIcon src='/icons/arrow-to-right.svg' />
				</IconWrapper>
				<InstructionItem>
					<Image src='/icons/dollar.png' alt='1' width={49} height={49} />
				</InstructionItem>
			</InstructionStyled>
		</InstructionBlockStyled>
	)
}
