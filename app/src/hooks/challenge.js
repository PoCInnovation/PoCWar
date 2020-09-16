import { useState, useEffect } from 'react';
import { getOptionalHeaders, http } from '../utils/server';

export default function useChallenge(slug, setEditValue) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/challenge/${slug}`, getOptionalHeaders())
        .then(({ data: { codeSource, ...data } }) => {
          setEditValue(codeSource);
          setChallenge(data);
          setIsLoading(false);
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
