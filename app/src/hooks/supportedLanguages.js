import { useState, useEffect } from "react";
import { store } from "../firebase/core";

// Not used for the moment (hardcoded values in consts/languages.js

export default function useSupportedLanguages() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      try {
        data = await store.collection("languages").get();
      } catch (e) {
        setError(true);
      }
      setLoading(false);
      setLanguages(data);
    }
    fetchData();
  }, []);

  return {
    error,
    loading,
    languages,
  };
}
