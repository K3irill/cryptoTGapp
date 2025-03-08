import React from 'react'
import { LoaderContainer, LoaderSpinner, LoaderWrap } from './styled'

interface LoaderProps {
	size?: number
}

const Loader: React.FC<LoaderProps> = ({ size = 75 }) => {
	return (
		<LoaderContainer>
			<LoaderWrap>
				<LoaderSpinner style={{ width: size, height: size }} />
			</LoaderWrap>
		</LoaderContainer>
	)
}

export default Loader
