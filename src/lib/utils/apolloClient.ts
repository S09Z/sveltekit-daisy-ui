import fetch from 'node-fetch';
import { ApolloClient } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { GITHUB_PERSONAL_ACCESS_TOKEN, GRAPHQL_ENDPOINT } from '$env/static/private';
 
class Client {
  constructor() {
        if (Client._instance) {
              }
    Client._instance = this;
    
    this.client = this.setupClient();
  }
 
  setupClient() {
    const link = new HttpLink({
      uri: process.env['GRAPHQL_ENDPOINT'],
      fetch
    });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${process.env['GITHUB_PERSONAL_ACCESS_TOKEN']}`
        }
      };
    });
    const client = new ApolloClient({
      credentials: 'include',
      link: authLink.concat(link),
      cache: new InMemoryCache()
    });
    return client;
  }
}