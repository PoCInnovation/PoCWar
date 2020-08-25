import { useState, useEffect } from "react";
import { http } from '../utils/server';

export default function useChallenges() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      try {
        await http.get('/challenge?page=1&pageSize=20')
        .then((response) => {
          data = response.data;
        }).catch((e) => {
          console.log(e);
        })
      } catch (e) {
        setError(true);
      }
      setLoading(false);
      setChallenges(data);
    }
    fetchData();
  }, []);

  return {
    error,
    loading,
    challenges,
  };
}
