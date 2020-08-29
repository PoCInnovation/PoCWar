import { useState, useEffect } from 'react';
import { http } from '../utils/server';

export default function useChallenge(slug) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      try {
        await http.get(`/challenge/${slug}`)
          .then((response) => {
            data = response.data;
          }).catch((e) => {
            console.log(e);
          });
      } catch (e) {
        setError(true);
      }
      setLoading(false);
      setChallenge(data);
    }
    fetchData();
  }, [slug]);

  return {
    error,
    loading,
    challenge,
  };
}
