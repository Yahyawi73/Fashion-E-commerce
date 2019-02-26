import gql from 'graphql-tag';

export const UNLIKE_SOUS_PRODUCT = gql`
mutation($_id: ID!, $userName: String!) {
  unLikeSousProduct(_id: $_id, userName: $userName) {
      _id
      likes
    }
}
`;