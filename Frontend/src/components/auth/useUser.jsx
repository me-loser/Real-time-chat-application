import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

export const useUser = () => {
  const auth = getAuth();
  const [userInfo, setUserInfo] = useState(() => {
    const user = auth.currentUser;
    const isLoading = !user;
    return { isLoading, user };
  });

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUserInfo({ isLoading: false, user });
    });
  }, []);
  return userInfo;
  // Whenever the component is unmounted the return function will be called.
};
