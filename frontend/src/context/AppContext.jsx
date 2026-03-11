import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
export const myStore = createContext();
const AppContext = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    async function getUser(){
      try {
      let res = await axios.get("http://localhost:3000/api/auth/get-user", {
        withCredentials: true
      });

      if (res) {

        setIsLoggedIn(res.data.user)
      }
    } catch (error) {
      console.log("Error in Get User :- ", error.response.data.message);
    }
    }
    getUser()
  }, []);

  return (
    <myStore.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </myStore.Provider>
  );
};

export default AppContext;
