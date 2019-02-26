import gql from 'graphql-tag';

export default gql`
  mutation MinusOneItem($_id: ID) {
    minusOneItem(_id: $_id) @client
  }
`;