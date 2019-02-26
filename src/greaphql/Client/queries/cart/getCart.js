import gql from 'graphql-tag';

const GET_CART = gql`
  query GetCart{
    cart @client {
      items {
        product {
          name
          _id
          price
          size
          likes
          quantity
        }
        quantity
      }
      totalQuantity,
      totalPrice,
    }
}
`;

export default GET_CART;