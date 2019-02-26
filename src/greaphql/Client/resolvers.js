import { filter } from 'lodash';
import GET_CART from './queries/cart/getCart';

export const defaultState = {
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: false,
    role: null,
  },
  me: {
    __typename: 'Me',
    user: null,
  },
  cart: {
    __typename: 'Cart',
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  cartStatus: {
    __typename: 'CartStatus',
    open: false,
  },
};

export const resolvers = {
  Mutation: {
    updateMe: (_, { user }, { cache }) => {
      const data = {
        me: {
          __typename: 'Me',
          user,
        },
      };
      cache.writeData({ data });
    },

    deleteItem: (_, { _id }, { cache }) => {
      console.log('_id', _id)
      const data = cache.readQuery({ query: GET_CART });

      data.cart.items = data.cart.items.map((item) => {
        if (item.product._id === _id) {
          data.cart.totalQuantity -= item.quantity;
          data.cart.totalPrice -= (item.product.price * item.quantity);
        }
        return item;
      });
      data.cart.items = filter(data.cart.items, (item) => item.product._id !== _id);
      cache.writeData({ data });
    },
    addOneItem: (_, { input }, { cache }) => {
      const data = cache.readQuery({ query: GET_CART });
      if (data.cart.items.some((item) => item.product._id === input._id)) {

        data.cart.items = data.cart.items.map((item) => {
          if (item.product._id === input._id) {
            item.quantity++;
            data.cart.totalQuantity++;
            data.cart.totalPrice += Number(item.product.price);
          }
          return item;
        });
      } else {
        data.cart.items.push({
          product: input,
          quantity: 1,
          __typename: 'OrderItem',
        });
        data.cart.totalQuantity++;
        data.cart.totalPrice += Number(input.price);
      }
      cache.writeData({ data });
    },
    plusOneItem: (_, { _id }, { cache }) => {

      const data = cache.readQuery({ query: GET_CART });
      data.cart.items = data.cart.items.map((item) => {
        if (item.product._id === _id) {
          item.quantity++;
          data.cart.totalQuantity++;
          data.cart.totalPrice += Number(item.product.price);
        }
        return item;
      });
      cache.writeData({ data });
    },
    minusOneItem: (_, { _id }, { cache }) => {
      const data = cache.readQuery({ query: GET_CART });
      data.cart.items = data.cart.items.map((item) => {
        if (item.product._id === _id && item.quantity > 0 && item.quantity <= item.product.quantity) {
          item.quantity--;
          data.cart.totalQuantity--;
          data.cart.totalPrice -= Number(item.product.price);
        }
        return item;
      });
      cache.writeData({ data });
    },

    cleanCart: (_, { items, totalPrice, totalQuantity }, { cache }) => {
      const data = {
        cart: {
          __typename: 'Cart',
          items,
          totalQuantity,
          totalPrice,
        },
      };
      cache.writeData({ data });
    },

    changeCartStatus: (_, { open }, { cache }) => {
      const data = {
        cartStatus: {
          __typename: 'CartStatus',
          open: !open,
        },
      };
      cache.writeData({ data });
    },
  },
};