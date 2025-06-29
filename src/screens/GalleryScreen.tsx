import { Button } from '@/components/ui/button'
import { Photo, ScanEvent } from '@/types'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PhotoThumbnail } from '@/components/PhotoThumbnail'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, RefreshCcw } from 'lucide-react'

export function GalleryScreen() {
  const [folders, setFolders] = useState<string[]>([])
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle')
  const queryClient = useQueryClient()

  // Fetch folders once
  useEffect(() => {
    invoke<{ id: number; path: string }[]>('list_folders').then(res => {
      setFolders(res.map(f => f.path))
    })
  }, [])

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

  useEffect(() => {
    // Kick off scans for all folders
    folders.forEach(path => {
      setScanStatus('scanning')
      invoke('scan_folder', { folderPath: path })
    })
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
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4">
        <h1 className="text-lg font-semibold">Gallery</h1>
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

        {!isLoading && !isError && photos?.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">No images found. Try scanning a folder.</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {photos?.map(photo => (
            <PhotoThumbnail key={photo.id} filePath={photo.filePath} />
          ))}
        </div>
      </main>
    </div>
  )
}
