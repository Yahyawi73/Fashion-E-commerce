import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import RootWithSession from './RootWithSession';

import { defaultState, resolvers } from './greaphql/Client/resolvers';

class AppWithProvider extends Component {
  state = {
    client: null,
    loaded: false,
  };

  componentDidMount = async () => {
    const cache = new InMemoryCache();

    const uploadLink = createUploadLink({
      uri: 'http://localhost:4000',
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token,
        },
      };
    });

    const stateLink = withClientState({
      defaults: defaultState,
      resolvers,
      cache,
    });

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([authLink, stateLink, uploadLink]),
    });

    try {
      await persistCache({
        cache,
        storage: window.localStorage,
      });
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }
    this.setState({
      client,
      loaded: true,
    });
  }
  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }
    return (<ApolloProvider client={client}>
      <RootWithSession />
    </ApolloProvider>)
  }
}

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
