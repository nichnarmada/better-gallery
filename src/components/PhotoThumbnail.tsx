import { convertFileSrc } from '@tauri-apps/api/core'

type Props = {
  filePath: string
}

export function PhotoThumbnail({ filePath }: Props) {
  const assetUrl = convertFileSrc(filePath)

  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-lg">
      <img
        src={assetUrl}
        alt={filePath}
        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
    </div>
  )
}
