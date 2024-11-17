import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default () => {
  const [auth, setAuth] = useState(undefined);  // undefined means loading, false means logged out, true means logged in
  const location = useLocation(); // Track route changes

  const verifyAuth = async () => {
    try {
      const res = await axios.get('/api/v1/auth/is_logged_in');
      setAuth(res.data); // Set auth status from server
      console.log(auth)
    } catch (error) {
      console.error(error);
      setAuth(false); // If an error occurs, treat as logged out
    }
  };

  // Trigger authentication check whenever route changes
  useEffect(() => {
    verifyAuth();
  }, [location]); // Dependency on location ensures verifyAuth is called on route change

  return { auth };
};
