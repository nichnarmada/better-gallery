import { Button } from '@/components/ui/button'
import { Photo, ScanEvent } from '@/types'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'
import { PhotoThumbnail } from '@/components/PhotoThumbnail'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, RefreshCcw, Plus } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { FolderManagerDialog } from '@/components/FolderManagerDialog'
import { ModeToggle } from '@/components/mode-toggle'

export function GalleryScreen() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle')
  const queryClient = useQueryClient()

  // Folders query
  const { data: folderRows = [] } = useQuery({
    queryKey: ['folders'],
    queryFn: () => invoke<{ id: number; path: string }[]>('list_folders'),
  })

  const folders = folderRows.map(f => f.path)

  const {
    data: photos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['photos'],
    queryFn: () => invoke<Photo[]>('get_all_photos'),
    enabled: scanStatus === 'done',
    refetchOnWindowFocus: false,
  })

  const hasScanned = useRef(false)

  useEffect(() => {
    if (hasScanned.current || folders.length === 0) return
    hasScanned.current = true
    setScanStatus('scanning')
    folders.forEach(path => invoke('scan_folder', { folderPath: path }))
  }, [folders])

  useEffect(() => {
    const unlisten = listen<string>('scan-update', event => {
      try {
        const payload: ScanEvent = JSON.parse(event.payload)

        switch (payload.type) {
          case 'progress':
            // The toast could be updated here with progress, but for simplicity
            // we will just wait for the 'done' event to give a final summary.
            break
          case 'done':
            setScanStatus('done')
            refetch() // <─ explicit refresh once scan finished
            toast.success('Scan complete!', {
              description: `Found ${payload.total} images.`,
            })
            break
          case 'error':
            setScanStatus('error')
            toast.error('An error occurred during the scan.', {
              description: payload.message,
            })
            break
        }
      } catch (e) {
        console.error('Non-JSON message from backend:', event.payload)
      }
    })

    return () => {
      unlisten.then(f => f())
    }
  }, [queryClient])

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex h-screen flex-col">
          <header className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <h1 className="text-lg font-semibold">Gallery</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  setScanStatus('scanning')
                  folders.forEach(path => invoke('refresh_library', { folderPath: path }))
                }}
                disabled={scanStatus === 'scanning'}
                variant="outline"
                size="icon"
              >
                {scanStatus === 'scanning' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
                <span className="sr-only">Refresh Library</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            {isLoading && (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Loading your library...</p>
              </div>
            )}

            {isError && (
              <div className="flex h-full flex-col items-center justify-center text-destructive">
                <p>Failed to load library.</p>
              </div>
            )}

            {!isLoading && !isError && (!photos || photos.length === 0) && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <p className="text-muted-foreground text-lg">No photos yet</p>
                <FolderManagerDialog>
                  <Button variant="default">
                    <Plus className="mr-2 h-4 w-4" /> Add Folder
                  </Button>
                </FolderManagerDialog>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
              {photos?.map(photo => (
                <PhotoThumbnail key={photo.id} filePath={photo.filePath} />
              ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
