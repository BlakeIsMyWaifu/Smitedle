const createActionName = (storeName: string) => (actionName: string): [false, string] => [false, `${storeName}/${actionName}`]

export const gameActionName = createActionName('game')