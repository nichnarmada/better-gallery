import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { listen } from '@tauri-apps/api/event'
import './App.css'

function App() {
  const [imagePaths, setImagePaths] = useState<string[]>([])
  const [scanStatus, setScanStatus] = useState('idle') // 'idle', 'scanning', 'done', 'error'

  useEffect(() => {
    const unlisten = listen<string>('scan-update', event => {
      // The sidecar prints status lines we can ignore
      if (!event.payload.startsWith('Scanning folder:') && event.payload !== 'Scan complete.') {
        setImagePaths(prevPaths => [...prevPaths, event.payload])
      }
    })

    return () => {
      unlisten.then(f => f())
    }
  }, [])

  async function selectFolderAndScan() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Select a folder to scan',
      })

      if (typeof selected === 'string') {
        setImagePaths([]) // Clear previous results
        setScanStatus('scanning')

        await invoke('scan_folder', { folderPath: selected })

        setScanStatus('done')
      }
    } catch (error) {
      console.error('Error during folder selection or scan:', error)
      setScanStatus('error')
    }
  }

  return (
    <main className="container">
      <h1>Welcome to Better Gallery</h1>
      <p>Select a folder to begin building your gallery.</p>

      <div className="row">
        <button onClick={selectFolderAndScan} disabled={scanStatus === 'scanning'}>
          {scanStatus === 'scanning' ? 'Scanning...' : 'Select Folder'}
        </button>
      </div>

      {scanStatus === 'scanning' && <p>Scanning in progress, please wait...</p>}
      {scanStatus === 'error' && <p style={{ color: 'red' }}>An error occurred during the scan.</p>}
      {scanStatus === 'done' && <p>Scan complete! Found {imagePaths.length} images.</p>}

      <div className="path-list">
        {imagePaths.map((path, index) => (
          <div className="path-item" key={index}>
            {path}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
