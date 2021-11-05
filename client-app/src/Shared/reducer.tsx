import { OrderedItem } from "../Models/OrderedItem";

export interface ItemState{
    orderedItems: OrderedItem[],
    error: any;
}

export interface ItemAction{
    payload: any;
    type: string;
}

const Reducer = (state: ItemState, action: ItemAction) => {
    let newState; 
    switch (action.type) {
        case 'CLEAR_ORDERED_ITEMS':
            newState = {
                ...state,
                orderedItems: []
            };
            break;
        case 'SET_ORDERED_ITEMS':
            newState = {
                ...state,
                orderedItems: action.payload
            };
            break;
        case 'ADD_ORDERED_ITEM':
            newState = {
                ...state,
                orderedItems: state.orderedItems.concat(action.payload)
            };
            break;

        case 'REMOVE_ORDERED_ITEM':
            newState = {
                ...state,
                orderedItems: state.orderedItems.filter((orderedItem: OrderedItem) => orderedItem.orderedItemID !== action.payload.orderedItemID)
            };
            break;
        case 'UPDATE_ORDERED_ITEM':
            newState = {
                ...state,
                orderedItems: state.orderedItems.map((singleItem: OrderedItem) => singleItem.orderedItemID === action.payload.orderedItemID? action.payload: singleItem)
            };
            break;
        case 'SET_ERROR':
            newState = {
                ...state,
                error: action.payload
            };
            break;
        default:
            newState = state;
            break;
    }
    localStorage.setItem('MyOrder', JSON.stringify(newState));
    return newState;
};

export default Reducer;