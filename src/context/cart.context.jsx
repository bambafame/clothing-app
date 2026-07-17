import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseCartItem = (cartItems, cartItemToDecrease) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToDecrease.id,
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToDecrease.id,
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const getNewCartTotal = (cartItems) => {
  return cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0,
  );
};

const getNewCartCount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseCartItem: () => {},
  removeCartItem: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotal = getNewCartTotal(newCartItems);
    const newCartCount = getNewCartCount(newCartItems);
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      }),
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemToCart = (cartItemToDecrease) => {
    const newCartItems = decreaseCartItem(cartItems, cartItemToDecrease);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decreaseItemToCart,
    removeItemToCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
