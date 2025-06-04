import { createContext, useContext, useEffect, useReducer } from "react";
import client from "../lib/shopifyClient";
import { gql } from "graphql-request";
import Cookies from "js-cookie";

//1.Create the context - one for State and one for Dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

//SET_CART action type
const SET_CART = "SET_CART";

//Set the initial state
const initalState = {
  lineItems: [],
  totalPrice: 0,
  webUrl: "",
  id: "",
};

//2.Create the reducer function that will update the state based on the action type
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

//3.Create the provider component that will wrap the app and provide the state and dispatch to all components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    getCart();
  }, []);

  const setCart = (payload) => dispatch({ type: SET_CART, payload });

  const CHECKOUT_FIELDS = `
    id
    webUrl
    totalPrice: totalPriceV2 { amount }
    lineItems(first: 250) {
      edges {
        node {
          id
          title
          quantity
          customAttributes { key value }
          variant {
            id
            title
            image { url }
            priceV2 { amount }
          }
        }
      }
    }
  `;

  const CHECKOUT_QUERY = gql`
    query getCheckout($id: ID!) {
      node(id: $id) {
        ... on Checkout {
          ${CHECKOUT_FIELDS}
        }
      }
    }
  `;

  const CHECKOUT_CREATE = gql`
    mutation checkoutCreate {
      checkoutCreate(input: {}) {
        checkout {
          ${CHECKOUT_FIELDS}
        }
      }
    }
  `;

  const getCart = async () => {
    try {
      const checkoutId = Cookies.get("checkoutId");
      let cart;
      if (checkoutId) {
        const data = await client.request(CHECKOUT_QUERY, { id: checkoutId });
        cart = data.node;
      } else {
        const data = await client.request(CHECKOUT_CREATE);
        cart = data.checkoutCreate.checkout;
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

//4.Create custom hooks to use the state and dispatch
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
