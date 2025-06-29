import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { toast } from 'sonner'
import { SetupScreen } from './screens/SetupScreen'
import { GalleryScreen } from './screens/GalleryScreen'
import './App.css'

function App() {
  const [libraryPath, setLibraryPath] = useState<string | null>(null)

  async function selectFolderAndScan() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Select a folder to scan',
      })

      if (typeof selected === 'string') {
        setLibraryPath(selected)
        toast.info('Starting scan...', { description: selected })
        // Start the scan but don't block the UI transition on it.
        invoke('scan_folder', { folderPath: selected }).catch(error => {
          toast.error('Scan failed', { description: String(error) })
          console.error('Scan failed:', error)
        })
      }
    } catch (error) {
      console.error('Error during folder selection or scan:', error)
    }
  }

  if (!libraryPath) {
    return <SetupScreen onFolderSelect={selectFolderAndScan} />
  }

  return <GalleryScreen libraryPath={libraryPath} />
}

export default App
