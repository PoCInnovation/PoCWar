import { useState, useEffect } from "react";
import { store } from "../firebase/core";

export default function useChallenge(id) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      try {
        data = await store.collection("challenges").doc(id).get();
      } catch (e) {
        setError(true);
      }
      setLoading(false);
      if (data !== null) {
        setChallenge(data.data());
      }
    }
    fetchData();
  }, [id]);

  return {
    error,
    loading,
    challenge,
  };
}
