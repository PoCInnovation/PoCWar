import { useState, useEffect } from 'react';
import { getOptionalHeaders, http, getHeaders } from '../utils/server';

export default function useChallenge(slug, setEditValue) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/challenge/${slug}`, getOptionalHeaders())
        .then(({ data: { codeSource, ...data } }) => {
          setEditValue(codeSource);
          for (let test of data.tests) {
            if (typeof(test.args) === 'string') {
              test.args = test.args.split('\"').filter((el) => el !== '');
            }
          }
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

export function useChallengeTests(slug) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testsList, setTests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/challenge/${slug}/tests`, getHeaders())
        .then((data) => {
          setTests(data);
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
    testsList,
  };
}