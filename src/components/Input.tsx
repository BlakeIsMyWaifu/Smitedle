import { ActionIcon, Autocomplete, Avatar, Group, Text, type AutocompleteItem } from '@mantine/core'
import { IconArrowRight, IconSearch } from '@tabler/icons'
import { FC, forwardRef, useState } from 'react'
import { useGameStore } from 'state/gameStore'

export interface InputData extends AutocompleteItem {
	icon: string;
}

interface InputProps {
	label: string;
	placeholder: string;
	data: InputData[];
	limit?: number;
	onSubmit: (value: string) => void;
}

const Input: FC<InputProps> = ({ label, placeholder, data, limit = 6, onSubmit }) => {

	const correctGod = useGameStore(state => state.correctGod)
	const winGame = useGameStore(state => state.winGame)

	const AutoCompleteItem = forwardRef<HTMLDivElement, InputData>(function Item({ value, icon, ...other }: InputData, ref) {
		return (
			<div ref={ref} {...other}>
				<Group noWrap>
					<Avatar src={icon} />
					<Text>{value}</Text>
				</Group>
			</div>
		)
	})

	const [inputValue, setInputValue] = useState('')

	const handleSubmit = (): void => {
		const inputText = inputValue.toLowerCase()
		if (!inputText || !data.filter(god => god.value.toLowerCase() === inputText).length) return
		if (inputText === correctGod.toLowerCase()) winGame()
		onSubmit(inputText)
		setInputValue('')
	}

	return <Autocomplete
		label={label}
		placeholder={placeholder}
		icon={<IconSearch />}
		data={data}
		itemComponent={AutoCompleteItem}
		limit={limit}
		size='xl'
		p='xl'
		transition='pop-top-left'
		transitionDuration={80}
		transitionTimingFunction='ease'
		rightSection={
			<ActionIcon
				size={32}
				onMouseDown={handleSubmit}
			>
				<IconArrowRight size={32} stroke={1.5} />
			</ActionIcon>
		}
		rightSectionWidth={48}
		onKeyDown={event => {
			if (event.key !== 'Enter') return
			handleSubmit()
		}}
		value={inputValue}
		onChange={setInputValue}
	/>
}

export default Input