import React, {createContext, useReducer} from "react";
import Reducer, { ItemAction, ItemState } from "./reducer";

export interface ItemContext {
    state: ItemState;
    dispatch: React.Dispatch<ItemAction>
}

const initialState = (localStorage.getItem('MyOrder')!=null? JSON.parse(localStorage.getItem('MyOrder') || '{}'):{
    orderedItems: [],
    error: null
});

export const ContextAuth = createContext<ItemContext>({state: initialState, dispatch: () => null});


const ItemStore = ({children}: { children: JSX.Element }) => {
    const { Provider } = ContextAuth;
    const [state, dispatch]= useReducer(Reducer, initialState);
    return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
    )
};

export default ItemStore;