import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('userInfo');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [user]);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
