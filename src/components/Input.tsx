import { Avatar, Group, Select, type SelectItem, Text } from '@mantine/core'
import { IconChevronDown, IconSearch } from '@tabler/icons'
import { FC, forwardRef, useRef } from 'react'
import { useGameStore } from 'state/gameStore'

export interface InputData extends SelectItem {
	icon: string;
	label: string;
}

interface InputProps {
	label: string;
	placeholder: string;
	data: InputData[];
	onSubmit: (value: string) => void;
}

const Input: FC<InputProps> = ({ label, placeholder, data, onSubmit }) => {

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

	const selectRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (text: string | null): void => {
		const inputText = text?.toLowerCase()
		if (!inputText || !data.filter(god => god.value.toLowerCase() === inputText).length) return
		if (inputText === correctGod.toLowerCase()) winGame()
		onSubmit(inputText)
	}

	return <Select
		allowDeselect
		searchable
		ref={selectRef}
		label={label}
		placeholder={placeholder}
		icon={<IconSearch />}
		data={data}
		itemComponent={AutoCompleteItem}
		size='xl'
		p='xl'
		transition='pop-top-left'
		transitionDuration={80}
		transitionTimingFunction='ease'
		maxDropdownHeight={600}
		onKeyDown={event => {
			if (event.key !== 'Enter') return
			handleSubmit((event.target as HTMLInputElement).value);
			(event.target as HTMLInputElement).value = ''
		}}
		onChange={handleSubmit}
		value=''
		rightSection={<IconChevronDown size={32} stroke={1.5} />}
		rightSectionWidth={48}
		styles={{ rightSection: { pointerEvents: 'none' } }}
	/>
}

export default Input