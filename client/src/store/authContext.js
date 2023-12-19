import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const saveUser = (user) => setUser(user);
  const deleteUser = () => setUser(null);

  const getCurrentUser = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/auth/get-user`
    );
    console.log(data?.user);

    if (data?.user) {
      return saveUser(data.user);
    }
    deleteUser();
  };

  useEffect(() => {
    getCurrentUser();
    // return () => deleteUser();
  }, []);

  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
