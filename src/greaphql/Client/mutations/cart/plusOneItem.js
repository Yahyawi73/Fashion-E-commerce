import gql from 'graphql-tag';

export default gql`
  mutation PlusOneItem($_id: ID) {
    plusOneItem(_id: $_id) @client
  }
`;