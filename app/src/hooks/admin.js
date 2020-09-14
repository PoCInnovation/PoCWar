import { useState, useEffect } from 'react';
import { getHeaders, http } from '../utils/server';

export default function useChallenge(page) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/admin/users?page=${page}&pageSize=100`, getHeaders())
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
    fetchData();
  }, [page]);

  return {
    error,
    isLoading,
    data,
  };
}

