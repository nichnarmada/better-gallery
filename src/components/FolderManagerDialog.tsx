import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Minus, Plus } from 'lucide-react'

type FolderRow = { id: number; path: string }

export function FolderManagerDialog({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()

  // Fetch folders
  const { data: folders = [], isLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: () => invoke<FolderRow[]>('list_folders'),
  })

  // Table setup – no selection needed

  const columns = React.useMemo<ColumnDef<FolderRow>[]>(
    () => [
      {
        accessorKey: 'path',
        header: 'Folder',
        cell: info => (
          <span className="truncate" title={info.getValue() as string}>
            {info.getValue() as string}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => (
          <div className="flex justify-end pr-3">
            <Button variant="ghost" size="icon" onClick={() => addMutation.mutate()} disabled={addMutation.isPending}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-end pr-3">
            <Button size="icon" variant="ghost" onClick={() => removeMutation.mutate(row.original.id)}>
              <Minus className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ),
        size: 60,
        meta: { skipPadding: true },
      },
    ],
    [],
  )

  const table = useReactTable({
    data: folders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Mutations
  const addMutation = useMutation({
    mutationFn: async () => {
      const selected = await open({ directory: true, multiple: false, title: 'Select a folder' })
      if (typeof selected !== 'string') throw new Error('No folder selected')
      await invoke<number>('add_folder', { folderPath: selected })
      toast.info('Scanning folder…', { description: selected })
      await invoke('scan_folder', { folderPath: selected })
      return selected
    },
    onSuccess: fp => {
      toast.success('Folder added', { description: fp })
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })
    },
    onError: err => toast.error(String(err)),
  })

  const removeMutation = useMutation({
    mutationFn: async (id: number) => {
      await invoke('remove_folder', { folderId: id })
    },
    onSuccess: () => {
      toast.success('Folder removed')
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Manage Folders</DialogTitle>
        </DialogHeader>

        {/* Table */}
        <div className="max-h-72 overflow-y-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted text-xs font-medium">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b last:border-none">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} style={{ width: header.getSize() }} className="pl-3 py-1 text-left">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-4 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              )}
              {!isLoading && table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-4 text-center text-muted-foreground">
                    No folders added.
                  </td>
                </tr>
              )}
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-accent/40">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }} className="pl-3 py-1">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="default">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
