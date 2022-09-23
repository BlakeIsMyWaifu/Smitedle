import { godData, type God } from 'data/gods'

export const getGodData = (godName: string): God => {
	return godData.find(god => god.Name.toLowerCase() === godName.toLowerCase()) ?? godData[0]
}