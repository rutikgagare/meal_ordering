import React from 'react';
import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmmount = state.totalAmount + action.item.amount * (action.item.price);

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = { ...existingCartItem, 
                amount: existingCartItem.amount + action.item.amount 
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmmount
        }
    }

    if(action.type === "REMOVE"){

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter((item)=>{
                return item.id !== action.id;
            })
        }
        else{
            const updatedItem = { ...existingCartItem, 
                amount: existingCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmmount
        }

    }

    if(action.type === 'CLEAR'){
        return {
            items:[],
            totalAmount: 0
        }
    }
    return defaultCartState;
}

function CartProvider(props) {

    const [cartState, dispactchCartAction] = useReducer(cartReducer, defaultCartState);

    const AddItemToCartHandler = (item) => {
        dispactchCartAction({ type: 'ADD', item: item });
    };

    const RemoveItemFromCartHandler = (id) => {
        dispactchCartAction({ type: 'REMOVE', id: id })
    };

    const clearCartHandler = () =>{
        dispactchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: AddItemToCartHandler,
        removeItem: RemoveItemFromCartHandler,
        clearCart:clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;