import { useState, useEffect } from "react";
import { server } from './server';
import axios from 'axios';

export default function useChallenges() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      try {
        await axios.get(server + '/challenge/all')
          .then((response) => {
            data = response.data;
            console.log(data);
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
