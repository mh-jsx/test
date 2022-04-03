import React, {createContext, useState, useContext} from "react";

const authContext = createContext();
authContext.displayName = "AuthContext";
export const useAuthContext = () => useContext(authContext);

export default function ProvideAuth(props) {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // update login info in session storage
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // clear session storage data
  const logout = () => {
    localStorage.clear();
    setUser(null);
    // window.location.reload();
  };

  // return current user data
  const getCurrentUser = () => {
    return user;
  };

  // login check
  const isAuthenticated = () => {
    return user?.token ? true : false;
  };

  // return current user token
  const getAuthenticationToken = () => {
    return user?.token ? user?.token : null;
  };
  // return current user token
  const getRole = () => {
    return user?.role ? user?.role : null;
  };

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        getCurrentUser,
        isAuthenticated,
        getAuthenticationToken,
        getRole,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
