import gql from 'graphql-tag';

const ADD_ORDER = gql`
mutation addOrder($input: InputOrder){
    addOrder(input: $input){
        items {
            quantity
            productID
          }
            userName
            id
            totalPrice
            totalQuantity
    }
   }
`;

export default ADD_ORDER;