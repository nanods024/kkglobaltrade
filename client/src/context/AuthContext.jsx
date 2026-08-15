import { createContext, useContext, useEffect, useState } from 'react';
import { loginAdmin, getCurrentAdmin } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('kkgt_admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('kkgt_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentAdmin()
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('kkgt_admin_token');
        localStorage.removeItem('kkgt_admin_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginAdmin({ email, password });
    localStorage.setItem('kkgt_admin_token', res.data.token);
    localStorage.setItem('kkgt_admin_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('kkgt_admin_token');
    localStorage.removeItem('kkgt_admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
