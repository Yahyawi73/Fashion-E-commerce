import gql from 'graphql-tag';

const SEND_EMAIL = gql`
mutation sendEmail($input: InputEmail){
    sendEmail(input: $input){
        file
        name
        email
        status
    }
   }
`;

export default SEND_EMAIL;