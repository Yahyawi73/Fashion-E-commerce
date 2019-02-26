import gql from 'graphql-tag';

export const LIKE_SOUS_PRODUCT = gql`
mutation($_id: ID!, $userName: String!) {
  likeSousProduct(_id: $_id, userName: $userName) {
      _id
      likes
    }
}
`;