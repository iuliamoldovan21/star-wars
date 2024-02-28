import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_CHARACTERS, GET_CHARACTER_DETAILS } from "./queries";
import { PAGE_SIZE } from "../constants";
import {
  CharacterDetails,
  CharacterDetailsResponse,
  GetCharactersResponse,
} from "../types";
import { useParams } from "react-router-dom";

/**
 * This hook retrieves all characters from the backend.
 * In a larger application, the `filter` argument would typically be provided in the query.
 * In this implementation, the query is used twice:
 * - Once to utilize pagination provided by the query options.
 * - Once to fetch all items and perform filtering on the client-side.
 * Caching could be enhanced for improved performance.
 */
export const useGetAllCharacters = (queryOptions?: QueryHookOptions) => {
  const { loading, error, data, fetchMore } = useQuery<GetCharactersResponse>(
    GET_CHARACTERS,
    queryOptions ?? {
      variables: { first: PAGE_SIZE },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    }
  );

  return {
    loading,
    error,
    fetchMore,
    data: data?.allPeople ?? { pageInfo: {}, people: [] },
  };
};

export const useGetCharacterDetails = () => {
  const { characterId } = useParams();

  const { loading, error, data } = useQuery<CharacterDetailsResponse>(
    GET_CHARACTER_DETAILS,
    {
      variables: { characterId },
    }
  );

  return { loading, error, data: data?.person ?? ({} as CharacterDetails) };
};
