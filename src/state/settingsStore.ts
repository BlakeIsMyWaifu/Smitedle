import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { settingsActionName } from './createActionName'

type Theme = 'light' | 'dark'

interface SettingsStore {
	theme: Theme;
	toggleTheme: (theme?: Theme) => void;
}

export const useSettingsStore = create<SettingsStore>()(devtools(set => ({
	theme: 'dark',
	toggleTheme: theme => {
		set(state => ({
			theme: theme ?? state.theme === 'light' ? 'dark' : 'light'
		}), ...settingsActionName('toggleTheme'))
	}
})))