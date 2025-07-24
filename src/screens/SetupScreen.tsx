import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { FolderOpen } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export function SetupScreen() {
  const navigate = useNavigate()

  async function selectFolderAndScan() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Select a folder to scan',
      })

      if (typeof selected === 'string') {
        console.log('Selected folder:', selected)
        const folderId = await invoke<number>('add_folder', { folderPath: selected })
        console.log('Folder added with ID:', folderId)
        
        toast.success('Folder added successfully!', { description: selected })
        navigate({ to: '/gallery', replace: true })
      }
    } catch (error) {
      console.error('Error during folder selection or scan:', error)
      toast.error(`Error: ${error}`)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Welcome to Better Gallery</CardTitle>
          <CardDescription>To get started, please select a folder containing your photos.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your photos will be scanned and indexed locally. No data will ever be sent to a server. This is a private,
            offline-first application.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={selectFolderAndScan}>
            <FolderOpen className="mr-2 h-4 w-4" />
            Select Photo Folder
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
