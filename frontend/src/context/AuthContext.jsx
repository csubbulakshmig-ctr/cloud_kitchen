import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('brindha_token');
    const storedUser = localStorage.getItem('brindha_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Verify with backend silently
        authService
          .getProfile()
          .then((res) => {
            if (res.data?.data) {
              setUser(res.data.data);
              localStorage.setItem('brindha_user', JSON.stringify(res.data.data));
            }
          })
          .catch(() => {
            // Token might be invalid or server restarted, but keep local for demo resilience
          })
          .finally(() => setLoading(false));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('brindha_token');
        localStorage.removeItem('brindha_user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { user: loggedInUser, token: authToken } = response.data.data;

      setUser(loggedInUser);
      setToken(authToken);
      localStorage.setItem('brindha_token', authToken);
      localStorage.setItem('brindha_user', JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { user: registeredUser, token: authToken } = response.data.data;

      setUser(registeredUser);
      setToken(authToken);
      localStorage.setItem('brindha_token', authToken);
      localStorage.setItem('brindha_user', JSON.stringify(registeredUser));

      return { success: true, user: registeredUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('brindha_token');
    localStorage.removeItem('brindha_user');
  };

  const demoLogin = async (role = 'customer') => {
    if (role === 'admin') {
      return await login('admin@brindhacloudkitchen.com', 'Admin@123');
    } else {
      return await login('customer@example.com', 'Customer@123');
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    demoLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
