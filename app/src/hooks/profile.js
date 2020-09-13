import { useState, useEffect } from 'react';
import { http, getHeaders } from '../utils/server';

export default function useProfile() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/profile`, getHeaders())
        .then((res) => {
          setIsLoading(false);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
    fetchData();
  }, []);

  return {
    error,
    isLoading,
    profile,
  };
}
