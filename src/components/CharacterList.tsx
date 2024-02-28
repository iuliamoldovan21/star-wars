import React, { ChangeEvent, useCallback, useState } from "react";
import { hasNextPage, hasPreviousPage } from "../helpers";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../constants";
import { useGetAllCharacters } from "../apiClient/api";
import { PaginationDirection } from "../types";
import "./styles/character-list.css";

const CharacterList: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const { loading, error, data, fetchMore } = useGetAllCharacters();

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const onClickOnCharacter = useCallback(() => {
    if (!searchValue) return;
    navigate(`/search?q=${searchValue}`);
  }, [navigate, searchValue]);

  const { endCursor, startCursor } = data.pageInfo;

  const hasNext = hasNextPage(endCursor);
  const hasPrevious = hasPreviousPage(startCursor);

  const onChangePagination = useCallback(
    (direction: PaginationDirection) => {
      if (direction === PaginationDirection.next && hasNext) {
        fetchMore({
          variables: { after: endCursor },
        });
        return;
      }
      if (direction === PaginationDirection.previous && hasPrevious) {
        fetchMore({
          variables: { before: startCursor, last: PAGE_SIZE, first: null },
        });
      }
    },
    [endCursor, fetchMore, hasNext, hasPrevious, startCursor]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = data.people;

  return (
    <div className="characters">
      <div className="search-container">
        <input
          type="text"
          id="search"
          placeholder="Search by name or homeworld..."
          value={searchValue}
          onChange={onChangeSearch}
        />
        <button onClick={onClickOnCharacter}>GO!</button>
      </div>
      <h1>Star Wars Characters</h1>
      <div className="characters-list">
        <ul>
          {characters.map(({ id, name, homeworld }) => (
            <li
              key={id}
              onClick={() => {
                navigate(`details/${id}`);
              }}
            >
              {name} from {homeworld.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination-buttons">
        <button
          disabled={!hasPrevious}
          onClick={() => {
            onChangePagination(PaginationDirection.previous);
          }}
        >
          Previous 10 items
        </button>
        <button
          disabled={!hasNext}
          onClick={() => {
            onChangePagination(PaginationDirection.next);
          }}
        >
          Next 10 items
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
