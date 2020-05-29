import { useState, useEffect } from 'react';
import { store } from '../firebase/core';

export default function useChallenges() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null
      try {
        data = await store.collection('challenges').limit(20).get()
      } catch (e) {
        setError(true);
      }
      setLoading(false);
      setChallenges(data);
    }
    fetchData();
  }, []
  )

  return {
    error,
    loading,
    challenges,
  }
}