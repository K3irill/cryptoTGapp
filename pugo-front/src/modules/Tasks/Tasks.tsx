import React, { FunctionComponent } from 'react'
import { ArrowIcon, InstructionBlock, InstructionItem } from './styled'
import { TasksStyled } from './styled'
import { TasksProps } from './Tasks.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import Image from 'next/image'
export const Tasks: FunctionComponent<TasksProps> = ({ data, children }) => {
	console.log(data.top_section)
	return (
		<TasksStyled>
			<TopPageInfo data={data.top_section} />
			<InstructionBlock>
				<InstructionItem>
					<Image src='/instruction-card-1.svg' alt='1' width={49} height={49} />
				</InstructionItem>
				<ArrowIcon src='/icons/arrow-to-right.svg' />
				<InstructionItem>
					<Image src='/coin.svg' alt='1' width={49} height={49} />
				</InstructionItem>
				<ArrowIcon src='/icons/arrow-to-right.svg' />
				<InstructionItem>
					<Image src='/icons/dollar.svg' alt='1' width={49} height={49} />
				</InstructionItem>
			</InstructionBlock>

			{children}
		</TasksStyled>
	)
}
