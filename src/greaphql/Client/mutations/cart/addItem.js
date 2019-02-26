import gql from 'graphql-tag';

export default gql`
  mutation AddOneItem($input: inputSousProduct) {
    addOneItem(input: $input) @client
  }
`;