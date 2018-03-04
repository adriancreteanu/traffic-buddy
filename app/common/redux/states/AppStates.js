
export function initialAppState() {
    return {
        isInProgress: false
    };
}

export interface AppState {
    isInProgress: boolean, 
    type: string
}