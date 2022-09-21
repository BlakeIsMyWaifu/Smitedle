import { ActionIcon, Autocomplete, Avatar, Group, Text, type AutocompleteItem } from '@mantine/core'
import { IconArrowRight, IconSearch } from '@tabler/icons'
import { FC, forwardRef, useState } from 'react'

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

	const AutoCompleteItem = forwardRef<HTMLDivElement, InputData>(function Test({ value, icon, ...other }: InputData, ref) {
		return (
			<div ref={ref} {...other}>
				<Group noWrap>
					<Avatar src={icon} />
					<Text>{value}</Text>
				</Group>
			</div>
		)
	})

	const [value, setValue] = useState('')

	const handleSubmit = (): void => {
		const inputText = value.toLowerCase()
		if (!inputText || !data.filter(god => god.value.toLowerCase() === inputText).length) return
		onSubmit(inputText)
		setValue('')
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
		value={value}
		onChange={setValue}
	/>
}

export default Input