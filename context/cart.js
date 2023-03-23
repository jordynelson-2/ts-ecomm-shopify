import { createContext, useContext, useEffect, useReducer } from "react";
import client from "../lib/client";
import Cookies from "js-cookie";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = "SET_CART";

const initalState = {
  lineItems: [],
  totalPrice: 0,
  webUrl: "",
  id: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    case SET_COLLECTIONS:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    getCart();
  }, []);

  const setCart = (payload) => dispatch({ type: SET_CART, payload });

  const getCart = async () => {
    try {
      const checkoutId = Cookies.get("checkoutId");
      let cart;
      if (checkoutId) {
        cart = await client.checkout.fetch(checkoutId);
      } else {
        cart = await client.checkout.create();
        Cookies.set("checkoutId", cart.id);
      }
      setCart(cart);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartDispatchContext.Provider value={{ setCart }}>
      <CartStateContext.Provider value={{ state }}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
