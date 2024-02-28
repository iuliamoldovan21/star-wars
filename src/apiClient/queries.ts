import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    allPeople(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      people {
        id
        name
        homeworld {
          name
        }
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($characterId: ID!) {
    person(id: $characterId) {
      name
      mass
      height
      birthYear
      hairColor
      eyeColor
      homeworld {
        name
        orbitalPeriod
      }
      filmConnection {
        films {
          title
          releaseDate
        }
      }
    }
  }
`;
