import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { toast } from 'sonner'
import { SetupScreen } from './screens/SetupScreen'
import { GalleryScreen } from './screens/GalleryScreen'
import './App.css'

function App() {
  const [hasLibrary, setHasLibrary] = useState(false)

  useEffect(() => {
    invoke<{ id: number; path: string }[]>('list_folders')
      .then(folders => {
        if (folders.length > 0) setHasLibrary(true)
      })
      .catch(() => {})
  }, [])

  async function selectFolderAndScan() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Select a folder to scan',
      })

      if (typeof selected === 'string') {
        await invoke<number>('add_folder', { folderPath: selected })
        setHasLibrary(true)
        toast.info('Folder added. Scanning will start automatically.', { description: selected })
      }
    } catch (error) {
      console.error('Error during folder selection or scan:', error)
    }
  }

  if (!hasLibrary) {
    return <SetupScreen onFolderSelect={selectFolderAndScan} />
  }

  return <GalleryScreen />
}

export default App
