import { extractMediaInfo } from "@/lib/utils/helpers";

interface MediaPreviewProps {
  url: string;
}

export default function MediaPreview({ url }: MediaPreviewProps) {
  const mediaInfo = extractMediaInfo(url);

  if (mediaInfo.type === "youtube" && mediaInfo.id) {
    return (
      <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${mediaInfo.id}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (mediaInfo.type === "spotify" && mediaInfo.id) {
    return (
      <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
        <iframe
          className="w-full"
          height="152"
          src={`https://open.spotify.com/embed/track/${mediaInfo.id}`}
          allow="encrypted-media"
        />
      </div>
    );
  }

  if (mediaInfo.type === "tiktok") {
    return (
      <div className="glass-card p-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          <span className="text-2xl">📱</span>
          <div>
            <p className="font-medium">TikTok Video</p>
            <p className="text-sm text-gray-500">Tap to watch</p>
          </div>
        </a>
      </div>
    );
  }

  if (mediaInfo.type === "instagram") {
    return (
      <div className="glass-card p-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          <span className="text-2xl">📷</span>
          <div>
            <p className="font-medium">Instagram Post</p>
            <p className="text-sm text-gray-500">Tap to view</p>
          </div>
        </a>
      </div>
    );
  }

  // Fallback for unknown media types
  return (
    <div className="glass-card p-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-primary transition-colors break-all"
      >
        <span className="text-2xl">🔗</span>
        <p className="text-sm">{url}</p>
      </a>
    </div>
  );
}
