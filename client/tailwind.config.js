/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				text: '#f9f9f9',
				background: '#01090c',
				primary: '#b5a1d1',
				secondary: '#fd5e09',
				accent: '#fcc958',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			animation: {
				meteor: 'meteor 5s linear infinite',
				'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
				'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
				'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
			},
			keyframes: {
				meteor: {
					'0%': {
						transform: 'rotate(215deg) translateX(0)',
						opacity: '1'
					},
					'70%': {
						opacity: '1'
					},
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0'
					}
				},
				'shimmer-slide': {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				},
				'spin-around': {
					'0%': {
						transform: 'translateZ(0) rotate(0)'
					},
					'15%, 35%': {
						transform: 'translateZ(0) rotate(90deg)'
					},
					'65%, 85%': {
						transform: 'translateZ(0) rotate(270deg)'
					},
					'100%': {
						transform: 'translateZ(0) rotate(360deg)'
					}
				},
				'border-beam': {
					'100%': {
						'offset-distance': '100%'
					}
				}
			},
			fontFamily: {
				robomon: [
					'Roboto Mono',
					'monospace'
				],
				montser: [
					'Montserrat',
					'sanserif'
				],
				play: [
					'Playwrite GB S Guides',
					'cursive'
				],
				libre: [
					'Libre Baskerville',
					'serif'
				],
				arimo: ["Arimo", "sans-serif"],
			}
		},
		plugins: [
			'require("tailwindcss-animate")'
		]
	}
};

