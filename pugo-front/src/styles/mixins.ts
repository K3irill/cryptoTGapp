import { css } from 'styled-components'
//золотой градиент для фона
export const goldenBackground = css`
	background: linear-gradient(
			224.54deg,
			#c49337 10.03%,
			#fcf7cd 31.51%,
			#edcd78 48.7%,
			#a7602b 59.25%,
			#fdf8d0 74.48%,
			#bb9138 88.16%
		),
		linear-gradient(
			135.34deg,
			#8c421d 15.43%,
			#fbe67b 38.47%,
			#fcfbe7 53.36%,
			#f7d14e 69.97%,
			#d4a041 86.26%
		),
		linear-gradient(
			137.14deg,
			#cce8fe 17.58%,
			#cda0ff 34.64%,
			#8489f5 45.84%,
			#cdf1ff 67.97%,
			#b591e9 88.23%
		),
		linear-gradient(46.58deg, #33cdff 25.15%, #f2fe08 53.06%, #f5fdff 86.95%),
		#ffffff;
	background-size: 200% 200%;
	animation: gradientShift 5s infinite linear;
`

//золотой градиент для текста
export const goldenTextGradient = css`
	background: linear-gradient(
			224.54deg,
			#c49337 10.03%,
			#fcf7cd 31.51%,
			#edcd78 48.7%,
			#a7602b 59.25%,
			#fdf8d0 74.48%,
			#bb9138 88.16%
		),
		linear-gradient(
			135.34deg,
			#8c421d 15.43%,
			#fbe67b 38.47%,
			#fcfbe7 53.36%,
			#f7d14e 69.97%,
			#d4a041 86.26%
		),
		linear-gradient(
			137.14deg,
			#cce8fe 17.58%,
			#cda0ff 34.64%,
			#8489f5 45.84%,
			#cdf1ff 67.97%,
			#b591e9 88.23%
		),
		linear-gradient(46.58deg, #33cdff 25.15%, #f2fe08 53.06%, #f5fdff 86.95%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`
