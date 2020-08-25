import { useState, useEffect } from "react";
import { server } from './server';
import axios from 'axios';

export default function useChallenge(slug) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      try {
        await axios.get(server + '/challenge/' + slug)
          .then((response) => {
            data = response.data;
          }).catch((e) => {
            console.log(e);
          })
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
