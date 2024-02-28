export type Pagination = {
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
};

export enum PaginationDirection {
  next = "next",
  previous = "previous",
}

export type Character = {
  id: string;
  name: string;
  homeworld: { name: string };
};

export type GetCharactersResponse = {
  allPeople: {
    pageInfo: Pagination;
    people: Character[];
  };
};

export type CharacterDetails = {
  birthYear: string;
  eyeColor: string;
  hairColor: string;
  height: number;
  mass: number;
  name: string;
  filmConnection: {
    films: Film[];
  };
  homeworld: {
    name: string;
    orbitalPeriod: number;
  };
};

export type CharacterDetailsResponse = {
  person: CharacterDetails;
};

export type Film = {
  releaseDate: string;
  title: string;
};
