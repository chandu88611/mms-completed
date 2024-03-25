import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider from "./providers/AuthProvider";

import { publicRoutes, protectedRoutes } from "./routes";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Router = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* * Public Routes * */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route, i) => {
            return (
              <Route
                key={`public-${i}`}
                path={route.path}
                element={
                  <Suspense fallback={"LOADING.."}>
                    <route.element />
                  </Suspense>
                }
              />
            );
          })}
        </Route>

        {/** Protected Routes **/}
        <Route path="/" element={<ProtectedLayout />}>
          {protectedRoutes.map((route, i) => {
            return (
              <Route
                key={`protected-${i}`}
                path={route.path}
                element={
                  <Suspense fallback={"lOADING"}>
                    <route.element />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default Router;
