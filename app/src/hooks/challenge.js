import { useState, useEffect } from 'react';
import { http } from '../utils/server';

export default function useChallenge(slug) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/challenge/${slug}`)
        .then((response) => {
          setIsLoading(false);
          setChallenge(response.data);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
    fetchData();
  }, [slug]);

  return {
    error,
    isLoading,
    challenge,
  };
}
