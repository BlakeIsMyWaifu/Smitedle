export const random = (max: number, min = 0): number => ~~(Math.random() * (max - min)) + min

export const randomElementFromArray = <T>(array: T[]): T | undefined => array[random(array.length - 1)]

export interface FilledArray<T> extends Array<T> {
	0: T;
}

export const randomElementFromFilledArray = <T>(array: FilledArray<T>): T => {
	return array[random(array.length - 1)] as T
}