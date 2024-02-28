import { relayStylePagination } from "@apollo/client/utilities";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import { CharacterDetail } from "./components/CharacterDetails";
import { FilteredCharacterList } from "./components/FilteredCharacterList";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index", // URL of the GraphQL endpoint
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPeople: relayStylePagination(),
        },
      },
    },
  }),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      {/* TODO Replace BrowserRouter with  createBrowserRouter router*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/details/:characterId" element={<CharacterDetail />} />
          <Route path="/search" element={<FilteredCharacterList />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
