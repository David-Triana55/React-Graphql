import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { ApolloClient,ApolloProvider,HttpLink, InMemoryCache } from '@apollo/client'
// gql nos permite escribir consultas GraphQL en nuestro código JavaScript
const client = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({
    uri: 'http://localhost:4000'
  }),
  // cache es un objeto que almacena los resultados de las consultas, reutilizar los datos
  cache: new InMemoryCache()
})



createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
)
