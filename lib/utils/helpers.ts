export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return past.toLocaleDateString();
}

export function formatExpiry(expiresAt: string | null): string | null {
  if (!expiresAt) return null;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) return "Expired";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `Expires in ${hours}h ${minutes}m`;
  return `Expires in ${minutes}m`;
}

export function isMediaExpired(createdAt: string, mediaType: string): boolean {
  if (!mediaType || !["image", "video", "media"].includes(mediaType)) {
    return false;
  }

  const now = new Date();
  const created = new Date(createdAt);
  const hours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);

  return hours >= 12;
}

export function getMediaExpiry(createdAt: string): string {
  const created = new Date(createdAt);
  const expiry = new Date(created.getTime() + 12 * 60 * 60 * 1000);
  return expiry.toISOString();
}

export function extractMediaInfo(url: string): {
  type: "youtube" | "tiktok" | "spotify" | "instagram" | "unknown";
  id: string | null;
} {
  // YouTube
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) return { type: "youtube", id: youtubeMatch[1] };

  // TikTok
  const tiktokRegex = /tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
  const tiktokMatch = url.match(tiktokRegex);
  if (tiktokMatch) return { type: "tiktok", id: tiktokMatch[1] };

  // Spotify
  const spotifyRegex = /spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/;
  const spotifyMatch = url.match(spotifyRegex);
  if (spotifyMatch) return { type: "spotify", id: spotifyMatch[2] };

  // Instagram
  const instagramRegex = /instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]+)/;
  const instagramMatch = url.match(instagramRegex);
  if (instagramMatch) return { type: "instagram", id: instagramMatch[2] };

  return { type: "unknown", id: null };
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
