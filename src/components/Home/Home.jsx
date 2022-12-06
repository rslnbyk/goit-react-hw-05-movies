import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchTrending() {
      axios.defaults.baseURL =
        'https://api.themoviedb.org/3/trending/movie/day';
      const API_KEY = '8e9be2f5936cb349aea9f629442792e4';
      const params = {
        api_key: API_KEY,
      };
      try {
        const response = await axios.get('', { params, signal: ctrl.signal });
        setTrending(
          response.data.results.map(movie => {
            return { id: movie.id, original_title: movie.original_title };
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTrending();

    return () => {
      ctrl.abort();
    };
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trending.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
