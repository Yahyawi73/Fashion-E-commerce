import gql from 'graphql-tag';

export default gql`
  mutation DeleteItem($_id: ID) {
    deleteItem(_id: $_id) @client
  }
`;