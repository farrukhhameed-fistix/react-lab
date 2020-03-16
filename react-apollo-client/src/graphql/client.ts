import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:3001',
  request: (operation) => {
    const token = localStorage.getItem('token');
    if(token){
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    }
  }
});

export default client;