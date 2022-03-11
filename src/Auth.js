import React, { useEffect, useState } from 'react';
import app from './base.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState([], () => {
    const localData = localStorage.getItem('userData');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
    setPending(false);
    localStorage.setItem('userData', JSON.stringify(currentUser));
  }, []);

  if (pending) {
    return <>...loading</>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
