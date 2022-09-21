import { Group, Title, createStyles } from '@mantine/core'
import { FC } from 'react'

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

	return (
		<div className={classes.header}>
			<Group position='apart'>
				<Title ml='xl'>Smitedle</Title>
			</Group>
		</div>
	)
}

export default Header