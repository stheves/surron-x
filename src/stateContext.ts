import { createContext } from 'react';

export interface GlobalAppState {
    app: {
        loading: boolean;
        error: Error | undefined;
    };
}
export interface GlobalStateContext {
    state: GlobalAppState;
}

function createDefaultState(): GlobalAppState {
    return {
        app: {
            loading: false,
            error: undefined,
        },
    };
}

const state = createDefaultState();
const context = {
    state,
};
export const StateContext = createContext(context);
