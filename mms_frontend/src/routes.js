import { lazy } from "react";

export const publicRoutes = [
  {
    path: "/login",
    exact: true,
    element: lazy(() => import("./pages/auth/Login")),
  },
  // {
  // path: '/forgot-password',
  // exact: true,
  // element: lazy(() => import('./pages/login/ForgotPass'))
  // },
  // {
  // path: '/reset-password/:token',
  // exact: true,
  // element: lazy(() => import('./pages/login/ResetPass'))
  // },
];

export const protectedRoutes = [
  {
    path: "/",
    exact: true,
    element: lazy(() => import("./pages/users")),
  },
  {
    path: "/users/create",
    exact: true,
    element: lazy(() => import("./pages/users/UserForm")),
  },
  {
    path: "/users/edit/:id",
    exact: true,
    element: lazy(() => import("./pages/users/UserForm")),
  },
  {
    path: "/dashboard",
    exact: true,
    element: lazy(() => import("./components/Dashboard/Dashboard")),
  },
  {
    path: "/products/list",
    exact: true,
    element: lazy(() => import("./components/Appointments")),
  },
  {
    path: "/customers/list",
    exact: true,
    element: lazy(() => import("./pages/product/CustomerList")),
  },
  {
    path: "/bills",
    exact: true,
    element: lazy(() => import("./pages/product/BillPreview")),
  },
];
