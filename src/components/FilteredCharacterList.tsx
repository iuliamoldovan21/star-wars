import { WatchQueryFetchPolicy } from "@apollo/client";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllCharacters } from "../apiClient/api";
import { Character, GetCharactersResponse } from "../types";
import "./styles/character-list.css";

export const FilteredCharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("q") ?? "";

  const queryOptions = useMemo(
    () => ({
      fetchPolicy: "network-only" as WatchQueryFetchPolicy,
      onCompleted(data: GetCharactersResponse) {
        setCharacters(data.allPeople.people);
      },
    }),
    []
  );

  const { loading, error } = useGetAllCharacters(queryOptions);

  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (character: Character) =>
        character.name.toLowerCase().includes(searchValue?.toLowerCase()) ||
        character.homeworld.name
          .toLowerCase()
          .includes(searchValue?.toLowerCase())
    );
  }, [characters, searchValue]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!filteredCharacters.length) return <p>No found characters...</p>;

  return (
    <div className="filtered-characters-list">
      <ul>
        {filteredCharacters.map(({ name, homeworld, id }) => (
          <li
            key={id}
            onClick={() => {
              navigate(`/details/${id}`);
            }}
          >
            {name} from {homeworld.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
