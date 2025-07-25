import React from 'react'
import { createRootRoute, createRouter, Outlet, Route, useNavigate } from '@tanstack/react-router'
import { SetupScreen } from '@/screens/SetupScreen'
import { GalleryScreen } from '@/screens/GalleryScreen'
import { invoke } from '@tauri-apps/api/core'

// Root layout supplied by App.tsx providers; here just an Outlet
function RootLayout() {
  return <Outlet />
}

const rootRoute = createRootRoute({ component: RootLayout })

// Redirector component to decide initial route based on folders
function Landing() {
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log('Landing component mounted, invoking list_folders...')
    invoke<{ id: number; path: string }[]>('list_folders')
      .then((folders) => {
        console.log('list_folders success:', folders)
        navigate({ to: '/gallery', replace: true })
      })
      .catch((error) => {
        console.error('Failed to invoke list_folders:', error)
        navigate({ to: '/setup', replace: true })
      })
  }, [navigate])

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontSize: '18px',
      backgroundColor: 'white',
      color: 'black',
      minHeight: '100vh'
    }}>
      Loading Better Gallery...
    </div>
  )
}

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
})

const setupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/setup',
  component: SetupScreen,
})

const galleryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryScreen,
})

const routeTree = rootRoute.addChildren([landingRoute, setupRoute, galleryRoute])

export const router = createRouter({ routeTree })

// Necessary for type safety across the app
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
