import { createContext, useState } from 'react';

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = function(email, password) {
    setAuth(true);

    // Need axios call here to pull user object from db, based on email and password
    // Hard coded data for now:
    const testUser = {
      id: 1,
      first_name: "Cindy",
      last_name: "Clawford",
      email: "cindyclawford@gmail.com",
      password: "password",
      relationship_status: "It's complicated",
      image_url: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      birthday: "2015-12-02T08:00:00.000Z",
      location: "Toronto, Canada"
      };

    setUser(testUser);
  };

  const logout = function() {
    setAuth(false);
    setUser(null);
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout };

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};