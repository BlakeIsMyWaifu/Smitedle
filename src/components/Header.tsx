import { ActionIcon, Group, Title, createStyles } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import { FC } from 'react'
import { useSettingsStore } from 'state/settingsStore'

const useStyles = createStyles(theme => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
		borderBottom: `1px solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background}`,
		paddingBottom: theme.spacing.sm
	}
}))

const Header: FC = () => {

	const { classes } = useStyles()

	const { theme, toggleTheme } = useSettingsStore()

	return (
		<div className={classes.header}>
			<Group position='apart'>
				<Title ml='xl'>Smitedle</Title>
				<Group pr='md'>
					<ActionIcon
						variant='default'
						title='Toggle Colour Scheme'
						size={32}
						onClick={() => toggleTheme()}
					>
						{
							theme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />
						}
					</ActionIcon>
				</Group>
			</Group>
		</div>
	)
}

export default Header