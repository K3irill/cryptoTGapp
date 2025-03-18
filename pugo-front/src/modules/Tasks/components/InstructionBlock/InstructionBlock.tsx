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
import { Headline } from '@/styles/styled'
import Label from '@/components/Label/Label'

export const InstructionBlock = () => {
	return (
		<InstructionBlockStyled>
			<Headline theme='purple' size={28}>
				Complete the tasks to get <Label title='MAJ' />
			</Headline>
			<InstructionStyled>
				<InstructionItem>
					<Image src='/instruction-card-1.svg' alt='1' width={49} height={49} />
				</InstructionItem>
				<IconWrapper>
					<ArrowIcon src='/icons/arrow-to-right.svg' />
				</IconWrapper>
				<InstructionItem>
					<Image src='/coin-c.png' alt='1' width={49} height={49} />
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
