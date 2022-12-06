import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { MoviesForm, MoviesInput } from './Movies.style';
import axios from 'axios';
import { useState } from 'react';

const Movies = () => {
  const [searched, setSearched] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const ctrl = new AbortController();
    async function fetchQuery(query) {
      axios.defaults.baseURL = 'https://api.themoviedb.org/3/search/movie';
      const API_KEY = '8e9be2f5936cb349aea9f629442792e4';
      const params = {
        api_key: API_KEY,
        query,
      };
      try {
        const response = await axios.get('', { params, signal: ctrl.signal });
        setSearched(
          response.data.results.map(movie => {
            return { id: movie.id, original_title: movie.original_title };
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchQuery(searchQuery);

    return () => {
      ctrl.abort();
    };
  }, [searchQuery]);

  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    updateQueryString(form.elements.searchQuery.value);
    form.reset();
  };

  return (
    <>
      <MoviesForm onSubmit={handleSubmit}>
        <MoviesInput type="text" name="searchQuery" />
        <button type="submit">Search</button>
      </MoviesForm>
      {searched.length > 0 && (
        <ul>
          {searched.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.original_title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Movies;
