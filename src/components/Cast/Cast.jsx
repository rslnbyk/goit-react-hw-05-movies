import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CastItem } from './Cast.style';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchCast(movieId) {
      axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const API_KEY = '8e9be2f5936cb349aea9f629442792e4';
      const params = {
        api_key: API_KEY,
      };
      try {
        const response = await axios.get('', { params, signal: ctrl.signal });
        setCast(
          response.data.cast.map(act => {
            return {
              id: act.id,
              profile_path: act.profile_path,
              name: act.name,
              character: act.character,
            };
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchCast(movieId);

    return () => {
      ctrl.abort();
    };
  }, [movieId]);

  return (
    <ul>
      {cast.map(act => {
        return (
          <CastItem key={act.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${act.profile_path}`}
              alt="Actor's profile"
              width="100"
            />
            <br />
            {act.name}
            <br />
            Character: {act.character}
          </CastItem>
        );
      })}
    </ul>
  );
};

export default Cast;
