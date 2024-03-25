import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetSessionQuery, useLogoutMutation } from "../redux/services/auth";
import { setAccessToken } from "../redux/slices/authSlice";
import { useLazyGetMeQuery } from "../redux/services/users";
import { isEmpty } from "lodash";
import Loader from "../components/Loader";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState({});

  const { data: sessionData, isLoading, error, refetch } = useGetSessionQuery();
  const [logout] = useLogoutMutation();

  const authState = useSelector((store) => store?.auth);
  const [getUserData, { data: userData, isSuccess: loggedInSuccess }] =
    useLazyGetMeQuery();

  const handleLogin = () => {};
  const handleLogout = async () => {
    await logout();
    dispatch(setAccessToken(null));
  };

  useEffect(() => {
    if (loggedInSuccess) {
      setLoggedInUser(userData);
    }
  }, [loggedInSuccess, userData]);

  useEffect(() => {
    if (sessionData?.data?.access_token) {
      dispatch(setAccessToken(sessionData?.data?.access_token));
      getUserData();
    }
  }, [sessionData, dispatch, getUserData]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthenticated:
          !isEmpty(authState?.accessToken) || error === undefined,
        handleLogin,
        handleLogout,
        getLoggedInUser: getUserData,
        getSession: refetch,
      }}
    >
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
