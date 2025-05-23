import { useRoutes } from 'react-router'
import type { RouteObject } from 'react-router'
import Layout from '@/layout'
import RequireAuth from './requireAuth'
import { lazy } from 'react'

const Error403 = lazy(() => import('@/pages/error/403'))
const Error404 = lazy(() => import('@/pages/error/404'))
const Login = lazy(() => import('@/pages/login'))
const Home = lazy(() => import('@/pages/home'))
const Analysis = lazy(() => import('@/pages/analysis'))
const Quota = lazy(() => import('@/pages/quota'))

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'analysis',
        element: <Analysis />,
      },
      {
        path: 'quota',
        element: <Quota />,
      },
    ],
  },
  {
    path: '403',
    Component: Error403,
  },
  {
    path: '*',
    Component: Error404,
  },
]

export default function Routes() {
  return useRoutes(routes)
}
