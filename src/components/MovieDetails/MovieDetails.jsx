import { Suspense, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {
  AdditionalDiv,
  BigDiv,
  GenresItem,
  GenresList,
  Poster,
} from './MovieDetails.style';

const StyledLink = {
  display: 'inline-block',
  border: '1px solid gray',
  borderRadius: '3px',
  textDecoration: 'none',
  color: 'black',
  marginBottom: '5px',
  padding: '0 5px',
};

const MovieDetails = () => {
  const [film, setFilm] = useState({});
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchFilm(movieId) {
      axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/${movieId}`;
      const API_KEY = '8e9be2f5936cb349aea9f629442792e4';
      const params = {
        api_key: API_KEY,
      };
      try {
        const response = await axios.get('', { params, signal: ctrl.signal });
        setFilm({
          poster_path: response.data.poster_path,
          original_title: response.data.original_title,
          release_date: response.data.release_date,
          vote_average: response.data.vote_average,
          overview: response.data.overview,
          genres: response.data.genres,
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchFilm(movieId);

    return () => {
      ctrl.abort();
    };
  }, [movieId]);

  return (
    <>
      <Link to={location.state?.from} style={StyledLink}>
        ← Go back
      </Link>
      <BigDiv>
        <Poster
          src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
          alt="Film poster"
          width="300"
        />
        <div>
          <h2>{`${film.original_title} (${
            film.release_date?.split('-')[0]
          })`}</h2>
          <p>User Score: {film.vote_average}</p>
          <h3>Overview</h3>
          <p>{film.overview}</p>
          <h4>Genres</h4>
          <GenresList>
            {film.genres?.map(genre => {
              return <GenresItem key={genre.id}>{genre.name}</GenresItem>;
            })}
          </GenresList>
        </div>
      </BigDiv>
      <AdditionalDiv>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast" state={{ from: location.state?.from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: location.state?.from }}>
              Reviews
            </Link>
          </li>
        </ul>
      </AdditionalDiv>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
