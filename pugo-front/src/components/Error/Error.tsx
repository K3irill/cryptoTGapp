import React from 'react'
import { ErrorContainer, ErrorText, ErrorContent, ErrorButton } from './styled'
import Image from 'next/image'

interface ErrorProps {
	text?: string
	onRetry?: () => void
}

const Error: React.FC<ErrorProps> = ({ text, onRetry }) => {
	const handleRetry = () => {
		if (onRetry) {
			onRetry()
		} else {
			window.location.reload()
		}
	}

	return (
		<ErrorContainer>
			<ErrorContent>
				<Image src='/error.png' width={150} height={200} alt='Error' />
				<ErrorButton onClick={handleRetry}>Try again</ErrorButton>
				{text && <ErrorText>{text}</ErrorText>}
			</ErrorContent>
		</ErrorContainer>
	)
}

export default Error
