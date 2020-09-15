import { useState, useEffect } from 'react';
import { getHeaders, http } from '../utils/server';

export function useAdminGetUsers(page) {
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

export function useAdminDeleteUsers(userId) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.delete(`/admin/users/${userId}`, getHeaders())
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
  }, []);

  return {
    error,
    isLoading,
    data,
  };
}