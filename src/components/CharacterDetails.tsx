import { useGetCharacterDetails } from "../apiClient/api";
import { Film } from "../types";
import "./styles/character-details.css";

export const CharacterDetail = () => {
  const { loading, error, data } = useGetCharacterDetails();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const {
    name,
    mass,
    height,
    birthYear,
    hairColor,
    eyeColor,
    homeworld,
    filmConnection,
  } = data;

  // Sort films by release date from newest to oldest
  const sortedFilms = [...filmConnection.films].sort((a: Film, b: Film) => {
    return (
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  });

  return (
    <div className="details-container">
      <h2>{name}</h2>
      <p>Mass: {mass}</p>
      <p>Height: {height}</p>
      <p>Birth Year: {birthYear}</p>
      <p>Hair Color: {hairColor}</p>
      <p>Eye Color: {eyeColor}</p>
      <p>Homeworld: {homeworld.name}</p>
      <p>Orbital Period: {homeworld.orbitalPeriod}</p>
      <h3>Films:</h3>
      <ul>
        {sortedFilms.map((film: Film) => (
          <li key={film.title}>
            {film.title} - {film.releaseDate}
          </li>
        ))}
      </ul>
    </div>
  );
};
