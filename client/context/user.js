import React, { useState, createContext, useContext } from 'react';

// Creating a context
const MyContext = createContext();

// Creating a provider component
export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const MyUser = () => {
  return useContext(MyContext);
};
