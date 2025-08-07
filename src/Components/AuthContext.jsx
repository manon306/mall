// context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setUser(savedUser);
      return true;
    }
    return false;
  };

  const signup = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout , setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
