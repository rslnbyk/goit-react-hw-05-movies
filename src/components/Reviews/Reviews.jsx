import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReviewItem } from './Reviews.style';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchReviews(movieId) {
      axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
      const API_KEY = '8e9be2f5936cb349aea9f629442792e4';
      const params = {
        api_key: API_KEY,
      };
      try {
        const response = await axios.get('', { params, signal: ctrl.signal });
        setReviews(
          response.data.results.map(r => {
            return {
              id: r.id,
              author: r.author,
              content: r.content,
            };
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchReviews(movieId);

    return () => {
      ctrl.abort();
    };
  }, [movieId]);

  if (!reviews.length) {
    return <p>We don't have any reviews for this movie</p>;
  } else {
    return (
      <ul>
        {reviews.map(r => {
          return (
            <ReviewItem key={r.id}>
              <h4>Author: {r.author}.</h4>
              <p>{r.content}</p>
            </ReviewItem>
          );
        })}
      </ul>
    );
  }
};

export default Reviews;
