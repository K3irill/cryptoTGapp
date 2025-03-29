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
export const silverBackground = css`
	background: linear-gradient(
		319.96deg,
		rgba(168, 168, 166, 0.2) 15.87%,
		rgba(105, 105, 105, 0.2) 48.67%,
		rgba(249, 248, 246, 0.2) 64.17%,
		rgba(212, 212, 212, 0.2) 75.79%,
		rgba(127, 127, 127, 0.2) 88.5%
	);
`
export const shinyBlueBackground = css`
	background: radial-gradient(
			110.23% 82.81% at 50% 17.19%,
			rgba(255, 255, 255, 0.098) 0%,
			rgba(255, 255, 255, 0.038) 100%
		),
		radial-gradient(
				105.11% 170.6% at 105.11% -15.62%,
				rgba(19, 229, 213, 0.5) 19.66%,
				rgba(19, 229, 213, 0.06) 71.06%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				82.79% 104.69% at 20.17% -22.66%,
				#1d52a0 0%,
				rgba(29, 82, 160, 0.18) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				58.24% 134.23% at 33.81% 109.38%,
				rgba(102, 129, 226, 0.81) 0%,
				rgba(102, 129, 226, 0) 95.37%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#eef9ff;
	box-shadow: -20px -20px 50px rgba(182, 117, 222, 0.4),
		0px 20px 60px rgba(98, 118, 224, 0.2), 0px 10px 60px rgba(41, 142, 174, 0.8),
		inset 0px 0px 10px rgba(255, 255, 255, 0.5);
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

export const bluePurpleTextGradient = css`
	background: radial-gradient(
			51.08% 70.95% at 35.58% 26.67%,
			#8be4ff 0%,
			#543dae 100%
		)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
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
	background: url(grey-paper-texture_1253-25.png),
		linear-gradient(
			178.41deg,
			rgba(31, 44, 60, 0.601) 1.72%,
			rgba(23, 32, 45, 0.12) 67.48%
		);
	border-radius: 15px;
`

export const extraBlockBackground = css`
	background: url(./finger-texture.png) no-repeat, rgba(0, 0, 0, 0.613);
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
export const silverMainTextGradient = css`
	background: linear-gradient(
			339.03deg,
			rgba(255, 255, 255, 0) 52.79%,
			#ffffff 95.95%
		),
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
	background-blend-mode: overlay, normal;

	text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`

export const blueGradientBackground = css`
	background: radial-gradient(
			110.23% 82.81% at 50% 17.19%,
			rgba(255, 255, 255, 0.098) 0%,
			rgba(255, 255, 255, 0.038) 100%
		),
		radial-gradient(
				105.11% 170.6% at 105.11% -15.62%,
				rgba(19, 229, 213, 0.5) 19.66%,
				rgba(19, 229, 213, 0.06) 71.06%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				82.79% 104.69% at 20.17% -22.66%,
				#1d52a0 0%,
				rgba(29, 82, 160, 0.18) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				58.24% 134.23% at 33.81% 109.38%,
				rgba(102, 129, 226, 0.81) 0%,
				rgba(102, 129, 226, 0) 95.37%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#eef9ff;
	box-shadow: 0px 10px 60px rgba(41, 143, 174, 0.541);
`
export const redGradientBackground = css`
	background: radial-gradient(
				31.25% 236.33% at 96.59% 31.25%,
				rgba(255, 255, 255, 0.3) 0%,
				rgba(255, 255, 255, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				39.2% 181% at 5.68% 100%,
				rgba(246, 251, 34, 0.51) 0%,
				rgba(255, 158, 69, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				75% 351.94% at -10.23% 35.94%,
				rgba(38, 0, 0, 0.92) 21.25%,
				rgba(225, 27, 84, 0.42) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				68.42% 175% at 96.59% -90.62%,
				rgba(225, 27, 84, 0.86) 54.93%,
				rgba(255, 193, 7, 0.38) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#fff500;
	box-shadow: -20px -20px 50px rgba(211, 70, 70, 0.4),
		0px 20px 60px rgba(232, 205, 110, 0.2),
		0px 10px 60px rgba(193, 111, 15, 0.8),
		inset 0px 0px 20px rgba(255, 255, 255, 0.3);
`

export const pinkOrangeGradientBackground = css`
	background: radial-gradient(
				57.81% 391.02% at 25.57% 34.38%,
				rgba(255, 255, 255, 0.3) 0%,
				rgba(255, 255, 255, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				59.09% 164.65% at -3.98% 12.5%,
				#ff33ba 19.65%,
				rgba(237, 66, 179, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(68.78% 100% at 43.75% 114.06%, #ad12f5 0%, #fdac62 80.98%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#55128a;
	box-shadow: -20px -10px 50px rgba(102, 67, 242, 0.5),
		10px 20px 80px rgba(218, 37, 156, 0.3),
		0px 10px 60px rgba(125, 20, 208, 0.8),
		inset 0px 0px 20px rgba(255, 255, 255, 0.5);
`

export const yellowGradientBackground = css`
radial-gradient(
				35.16% 50% at 41.48% 50%,
				rgba(255, 248, 82, 0.2) 0%,
				rgba(255, 248, 82, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(91.73% 126.56% at 63.64% -12.5%, #dfd82b 0%, #37352a 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(80.68% 51.24% at 19.32% 40.62%, #08203a 0%, #000000 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				11.22% 118.75% at 43.75% -31.25%,
				rgba(60, 48, 58, 0.53) 21.25%,
				#392732 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#030303;
`

export const greenGradientBackground = css`
 radial-gradient(
			45.91% 85.94% at 55.4% 14.06%,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0.032) 100%
		),
		radial-gradient(
				66.76% 121.06% at 22.73% 20.31%,
				rgba(226, 241, 45, 0.2) 18.63%,
				rgba(226, 241, 45, 0.186) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				92.56% 151.44% at 33.52% -15.63%,
				#e0e342 0%,
				rgba(35, 173, 140, 0.58) 85.15%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(35.8% 316.2% at 82.39% 55.47%, #41ff48 0%, #00bcb1 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#030303;

`

export const pinkBlueGradientBackground = css`
	 radial-gradient(
				42.85% 184.29% at 15.34% 39.06%,
				rgba(131, 113, 243, 0.5) 0%,
				rgba(69, 156, 236, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				130.16% 129.69% at 63.64% -12.5%,
				rgba(133, 40, 251, 0.8) 0%,
				rgba(86, 84, 74, 0.096) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				80.68% 51.24% at 19.32% 40.62%,
				rgba(24, 100, 183, 0.9) 0%,
				rgba(23, 61, 102, 0.792) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				28.98% 110.94% at 43.75% -31.25%,
				rgba(24, 17, 24, 0.424) 21.25%,
				rgba(0, 0, 0, 0.8) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		rgba(3, 3, 3, 0.8);
	box-shadow: 0px 20px 30px rgba(64, 100, 228, 0.3),
		-20px -20px 50px rgba(42, 94, 142, 0.5),
		10px 20px 80px rgba(122, 33, 237, 0.3),
		inset 0px 0px 30px rgba(255, 255, 255, 0.3);
`

export const redOrangeTextGradient = css`
	background: radial-gradient(
				31.25% 236.33% at 96.59% 31.25%,
				rgba(255, 255, 255, 0.3) 0%,
				rgba(255, 255, 255, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				39.2% 181% at 5.68% 100%,
				rgba(246, 251, 34, 0.51) 0%,
				rgba(255, 158, 69, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				75% 351.94% at -10.23% 35.94%,
				rgba(38, 0, 0, 0.92) 21.25%,
				rgba(225, 27, 84, 0.42) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				68.42% 175% at 96.59% -90.62%,
				rgba(225, 27, 84, 0.86) 54.93%,
				rgba(255, 193, 7, 0.38) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#fff500;
	box-shadow: -20px -20px 50px rgba(211, 70, 70, 0.4),
		0px 20px 60px rgba(232, 205, 110, 0.2),
		0px 10px 60px rgba(193, 111, 15, 0.8),
		inset 0px 0px 20px rgba(255, 255, 255, 0.3);
`
