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

export const bronzeBackground = css`
	background: linear-gradient(
		135.31deg,
		#9e8976 15.43%,
		#7a5e50 30.62%,
		#f6d0ab 47.37%,
		#9d774e 62.96%,
		#c99b70 82.05%,
		#795f52 93.35%
	);
	background-size: 200% 200%;
`
export const purpleBackground = css`
	background: linear-gradient(
		138.8deg,
		#cce8fe 5.7%,
		#cda0ff 27.03%,
		#8489f5 41.02%,
		#cdf1ff 68.68%,
		#b591e9 94%
	);
	background-size: 200% 200%;
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

export const yellowTextGradient = css`
	background: linear-gradient(90deg, #ffeecc 4.29%, #ad9515 97.5%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`

export const mainBlockBackground = css`
	background: url(./mramor.png) no-repeat, rgba(0, 0, 0, 0.613);
	background-size: cover;
	background-blend-mode: soft-light, normal;
	box-shadow: 0px 40px 80px rgba(0, 0, 0, 0.25),
		inset 0px -4px 2px rgba(0, 0, 0, 0.15),
		inset 0px 4px 2px rgba(255, 255, 255, 0.05),
		inset 4px 4px 26px rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(40px);
	border-radius: 16px;
	// filter: opacity(0.7);
`

//золотой градиент для текста v2
export const goldenTextGradientV2 = css`
	background: linear-gradient(0deg, #c1a875, #c1a875),
		linear-gradient(339.03deg, rgba(255, 255, 255, 0) 52.79%, #ffffff 95.95%),
		linear-gradient(
			76.82deg,
			#576265 11.6%,
			#9ea1a1 25.31%,
			#848b8a 48.06%,
			#576265 55.72%,
			#576265 77.23%,
			#757a7b 85.34%,
			#576265 91.31%
		);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	background-blend-mode: color, overlay, normal;
`

export const silverTextGradient = css`
	background: linear-gradient(
		319.96deg,
		#a8a8a6 15.87%,
		#696969 48.67%,
		#f9f8f6 64.17%,
		#d4d4d4 75.79%,
		#7f7f7f 88.5%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`

export const purpleTextGradient = css`
	background: linear-gradient(
		138.8deg,
		#cce8fe 5.7%,
		#cda0ff 27.03%,
		#8489f5 41.02%,
		#cdf1ff 68.68%,
		#b591e9 94%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`
export const blueTextGradient = css`
	background: linear-gradient(
		218.51deg,
		#fdfffe 11%,
		#7abbac 31.04%,
		#b1ffef 44.99%,
		#8ad2c3 57.63%,
		#cffef4 75.93%,
		#6ca196 90.75%,
		#35544e 98.15%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`
