import { Image, Stack } from '@mantine/core'
import GodInput from 'components/GodInput'
import GuessGods from 'components/GuessGods'
import { useStartGame } from 'hooks/useStartGame'
import type { NextPage } from 'next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGameStore } from 'state/gameStore'
import { getGodData } from 'utils/getGodData'
import { random } from 'utils/maths'

const Splash: NextPage = () => {

	useStartGame()
	const gameState = useGameStore(state => state.gameState)

	const correctGod = useGameStore(state => state.correctGod)
	const correctGodData = getGodData(correctGod)
	const guessesAmount = useGameStore(state => state.guesses).length

	const godImageURL = useMemo(() => correctGodData.godCard_URL, [correctGodData.godCard_URL])

	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [imagePos, setImagePos] = useState<[number, number] | null>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const context = canvas.getContext('2d')!

		const img = new window.Image()
		img.setAttribute('src', godImageURL)
		const loadImage = (): void => {
			const size = 64 + (guessesAmount * 4)
			if (!imagePos) {
				const sx = random(0, img.width - 64)
				const sy = random(0, img.height - 64)
				setImagePos([sx, sy])
			}
			const [sx, sy] = imagePos ?? [0, 0]
			context.drawImage(img, sx - (guessesAmount * 2), sy - (guessesAmount * 2), size, size, 0, 0, context.canvas.width, context.canvas.height)
		}
		img.addEventListener('load', loadImage)

		return () => {
			img.removeEventListener('load', loadImage)
		}
	}, [godImageURL, guessesAmount, imagePos])

	useEffect(() => {
		setImagePos(null)
	}, [godImageURL])

	return gameState !== 'start' ? (
		<Stack align='center'>
			{
				gameState !== 'win'
					? <canvas
						ref={canvasRef}
						width={128}
						height={128}
					/>
					: <div>
						<Image
							src={godImageURL}
							alt='Splash Art'
							radius='md'
							height={128}
						/>
					</div>
			}

			<GodInput
				label='Guess a Gods from the zoomed in splash art'
				placeholder='Enter God Name . . .'
			/>

			<GuessGods />
		</Stack>
	) : null
}

export default Splash