import React from 'react'
import { createRootRoute, createRouter, RouterProvider, Outlet, Route } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SetupScreen } from '@/screens/SetupScreen'
import { GalleryScreen } from '@/screens/GalleryScreen'
import { invoke } from '@tauri-apps/api/core'

const queryClient = new QueryClient()

// Root layout with providers
function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

// Redirector component to decide initial route based on folders
function Landing() {
  const router = React.useContext(
    // lazy import to avoid circular
    (RouterProvider as any).context,
  ) as ReturnType<typeof createRouter>

  React.useEffect(() => {
    invoke<{ id: number; path: string }[]>('list_folders').then(folders => {
      router.navigate({ to: folders.length > 0 ? '/gallery' : '/setup', replace: true })
    })
  }, [router])

  return null
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

export const router = createRouter({
  routeTree,
})

// Necessary for type safety across the app
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
  return <RouterProvider router={router} />
}
