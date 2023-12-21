import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import { Suspense, lazy } from "react";

const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Suspense fallback={'Loading...'}><Home /></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'Loading...'}><Article /></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'Loading...'}><Publish /></Suspense>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router