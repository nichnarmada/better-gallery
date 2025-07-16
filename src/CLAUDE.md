# Frontend (React) - `/src/`

## 🎯 Purpose
React frontend providing the user interface for Better Gallery. Built with modern React patterns, TypeScript, and a component-based architecture.

## 📁 Directory Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI primitives (Radix + custom)
│   ├── app-sidebar.tsx  # Main navigation sidebar
│   ├── mode-toggle.tsx  # Dark/light theme switcher
│   ├── PhotoThumbnail.tsx # Individual photo display
│   └── FolderManagerDialog.tsx # Folder management modal
├── screens/             # Main application screens
│   ├── GalleryScreen.tsx # Photo grid view (main screen)
│   └── SetupScreen.tsx  # Initial folder selection
├── db/                  # Database schema and types
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Root component with providers
├── router.tsx           # TanStack Router configuration
└── main.tsx            # React app entry point
```

## 🎨 UI Architecture

### Component System
- **Base Components**: `/components/ui/` - Radix UI primitives with custom styling
- **Feature Components**: `/components/` - Application-specific components
- **Screen Components**: `/screens/` - Full-page route components

### State Management
- **Global State**: Zustand (minimal usage, mostly for UI state)
- **Server State**: TanStack Query for API calls and caching
- **Local State**: React useState/useReducer for component state

### Styling System
- **CSS Framework**: Tailwind CSS with custom design tokens
- **Theme Support**: Dark/light mode via `next-themes`
- **Component Variants**: `class-variance-authority` for component styling

## 🔄 Key Data Flow

### Photo Loading Process
1. `GalleryScreen` queries folders via `useQuery(['folders'])`
2. Auto-triggers scan for each folder on mount
3. Listens for scan progress via Tauri events
4. Queries photos via `useQuery(['photos'])` when scan completes
5. Renders photo grid with `PhotoThumbnail` components

### Folder Management
1. `FolderManagerDialog` allows adding/removing watched folders
2. Uses Tauri file dialog to select directories
3. Calls `add_folder` Tauri command
4. Triggers automatic scan of new folder
5. Updates UI with real-time progress

## 🧩 Key Components

### `App.tsx`
- Root component with providers (QueryClient, ThemeProvider)
- Sets up global app structure and routing

### `router.tsx`  
- TanStack Router configuration
- Routes: `/` (landing), `/setup` (onboarding), `/gallery` (main)
- Landing route redirects based on folder existence

### `GalleryScreen.tsx`
- Main photo gallery interface
- Grid layout with responsive columns
- Real-time scan progress handling
- Sidebar navigation integration

### `SetupScreen.tsx`
- Initial onboarding experience
- Folder selection dialog
- Privacy-focused messaging

### `PhotoThumbnail.tsx`
- Individual photo display component
- Lazy loading support
- Thumbnail rendering from file path

### `app-sidebar.tsx`
- Main navigation sidebar
- Folder list display
- Theme toggle integration

## 🔌 Tauri Integration

### Commands Used
```typescript
// Folder management
invoke<number>('add_folder', { folderPath: string })
invoke<Folder[]>('list_folders')
invoke('remove_folder', { folderId: number })

// Photo operations  
invoke<Photo[]>('get_all_photos')
invoke('scan_folder', { folderPath: string })
invoke('refresh_library', { folderPath: string })
```

### Event Listening
```typescript
// Real-time scan progress
listen<string>('scan-update', event => {
  const payload: ScanEvent = JSON.parse(event.payload)
  // Handle progress, done, error events
})
```

## 📱 Responsive Design
- **Mobile-first approach** with responsive breakpoints
- **Grid layout** adjusts columns based on screen size (2-8 columns)
- **Sidebar** collapses on mobile devices
- **Touch-friendly** interactions and button sizes

## 🎨 Theme System
- **Design tokens** in Tailwind config
- **Dark/light mode** toggle with system preference detection
- **CSS variables** for dynamic theming
- **Consistent** color palette across components

## 🔍 Current Limitations
- No infinite scrolling (loads all photos at once)
- Basic thumbnail display without metadata overlay
- No photo selection/multi-select functionality
- Limited keyboard navigation support

## 🚀 Planned Enhancements
- Timeline view with date grouping
- Map view with GPS coordinates
- Advanced search interface
- Photo metadata editor
- Bulk operations UI
- Keyboard shortcuts