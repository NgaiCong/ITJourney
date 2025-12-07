"use client";

interface VideoPlayerProps {
  url: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ url, onComplete }: VideoPlayerProps) {
  // Simple iframe embed for YouTube/Vimeo
  // In a real app, use a library like react-player for better control and events
  
  return (
    <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={url}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
