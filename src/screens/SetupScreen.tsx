import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen } from 'lucide-react'

type Props = {
  onFolderSelect: () => void
}

export function SetupScreen({ onFolderSelect }: Props) {
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
          <Button className="w-full" onClick={onFolderSelect}>
            <FolderOpen className="mr-2 h-4 w-4" />
            Select Photo Folder
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
