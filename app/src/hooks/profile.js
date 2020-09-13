import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import { http, getHeaders } from '../utils/server';

const useProfile = withRouter(({ history }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await http.get('/profile', getHeaders())
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            Cookies.remove('user');
            history.push('/login');
          }
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
});

export default useProfile;
