import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import { usersApi } from "./services/users";
import authReducer from "./slices/authSlice";
import { organizationApi } from "./services/organization";

const setUpStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [organizationApi.reducerPath]: organizationApi.reducer,
      auth: authReducer,
    },
    middleware: (getDM) => [
      ...getDM(),
      authApi.middleware,
      usersApi.middleware,
      organizationApi.middleware,
    ],
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = setUpStore();
