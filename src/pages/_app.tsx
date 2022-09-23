import { MantineProvider, Stack } from '@mantine/core'
import Header from 'components/Header'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useSettingsStore } from 'state/settingsStore'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {

	const theme = useSettingsStore(state => state.theme)

	return (
		<>
			<Head>
				<title>Smitedle</title>
				<link rel='icon' href='/favicon.ico' />
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: theme
				}}
			>
				<Stack>
					<Header />
					<Component {...pageProps} />
				</Stack>
			</MantineProvider>
		</>
	)
}

export default MyApp
