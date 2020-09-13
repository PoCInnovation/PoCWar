import { useState, useEffect } from 'react';
import { http } from '../utils/server';

export default function useChallenges(page) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [challengesList, setChallenges] = useState(null);
  useEffect(() => {
    async function fetchData() {
      await http.get(`/challenge?page=${page}&pageSize=10`)
        .then((response) => {
          setIsLoading(false);
          setChallenges(response.data);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
        });
    }
    fetchData();
  }, [page]);

  return {
    error,
    isLoading,
    challengesList,
  };
}
