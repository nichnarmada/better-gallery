import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function FolderManagerDialog({ children, ...props }: React.ComponentProps<typeof Dialog.Root>) {
  const queryClient = useQueryClient()

  const { data: folders = [], isLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: () => invoke<{ id: number; path: string }[]>('list_folders'),
  })

  const addMutation = useMutation({
    mutationFn: async () => {
      const selected = await open({ directory: true, multiple: false, title: 'Select a folder' })
      if (typeof selected !== 'string') throw new Error('No folder selected')
      await invoke<number>('add_folder', { folderPath: selected })
      await invoke('scan_folder', { folderPath: selected })
      return selected
    },
    onSuccess: folderPath => {
      toast.success('Folder added', { description: folderPath })
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })
    },
    onError: err => {
      toast.error('Failed to add folder', { description: String(err) })
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (folderId: number) => {
      await invoke('remove_folder', { folderId })
    },
    onSuccess: () => {
      toast.success('Folder removed')
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })
    },
  })

  return (
    <Dialog.Root {...props}>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-background p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Manage Folders</Dialog.Title>

          <div className="flex max-h-60 flex-col gap-2 overflow-y-auto">
            {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {!isLoading && folders.length === 0 && (
              <p className="text-sm text-muted-foreground">No folders added yet.</p>
            )}
            {!isLoading &&
              folders.map(folder => (
                <div key={folder.id} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                  <span className="truncate" title={folder.path}>
                    {folder.path}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeMutation.mutate(folder.id)}
                    className={cn({ 'opacity-50': removeMutation.isPending })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => addMutation.mutate()} disabled={addMutation.isPending}>
              <Plus className="mr-2 h-4 w-4" /> Add Folder
            </Button>
            <Dialog.Close asChild>
              <Button variant="default">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
