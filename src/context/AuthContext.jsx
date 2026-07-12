import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('apex_token');
    if (token) {
      getMe()
        .then(r => setUser(r.data.user))
        .catch(() => { localStorage.removeItem('apex_token'); localStorage.removeItem('apex_refresh'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = (token, refresh, userData) => {
    localStorage.setItem('apex_token', token);
    localStorage.setItem('apex_refresh', refresh);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('apex_token');
    localStorage.removeItem('apex_refresh');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
