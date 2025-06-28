import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { listen } from '@tauri-apps/api/event'
import './App.css'

type ScanEvent =
  | { type: 'start'; folder: string }
  | { type: 'progress'; path: string }
  | { type: 'done'; total: number }
  | { type: 'error'; path?: string; message: string }

function App() {
  const [imagePaths, setImagePaths] = useState<string[]>([])
  const [scanStatus, setScanStatus] = useState('idle') // 'idle', 'scanning', 'done', 'error'
  const [totalFound, setTotalFound] = useState(0)

  useEffect(() => {
    const unlisten = listen<string>('scan-update', event => {
      try {
        const payload: ScanEvent = JSON.parse(event.payload)
        switch (payload.type) {
          case 'start':
            setScanStatus('scanning')
            setImagePaths([])
            setTotalFound(0)
            break
          case 'progress':
            // To avoid re-rendering on every single file, you might want to batch updates
            // but for now, this is fine.
            setImagePaths(prevPaths => [...prevPaths, payload.path])
            break
          case 'done':
            setScanStatus('done')
            setTotalFound(payload.total)
            break
          case 'error':
            setScanStatus('error')
            console.error('Scan Error:', payload.message, payload.path)
            break
        }
      } catch (e) {
        // This will catch non-JSON messages from the sidecar, which we can ignore.
        console.log('Non-JSON message from backend:', event.payload)
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
        // State updates are now handled by the event listener
        await invoke('scan_folder', { folderPath: selected })
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

      {scanStatus === 'scanning' && <p>Scanning... found {imagePaths.length} images.</p>}
      {scanStatus === 'error' && <p style={{ color: 'red' }}>An error occurred during the scan.</p>}
      {scanStatus === 'done' && <p>Scan complete! Found {totalFound} images.</p>}

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
