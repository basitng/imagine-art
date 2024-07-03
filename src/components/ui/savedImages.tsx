import React, { useState } from "react";
import { Copy, Download, Heart } from "lucide-react";
import { toast } from "sonner";
import { LoadingCircle } from "../icons";

interface SavedImageItem {
  id: number;
  imageUrl: string;
  title: string;
  prompt: string;
  likes: number;
  downloads: number;
  creator: {
    name: string;
    avatar: string;
  };
}

interface SavedImageProps {
  item: SavedImageItem;
}

export default function SavedImage({ item }: SavedImageProps) {
  const [copying, setCopying] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [downloads, setDownloads] = useState(item.downloads);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopy = (text: string) => {
    setCopying(true);
    navigator.clipboard.writeText(text).then(() => {
      setCopying(false);
      toast.success("Prompt copied to clipboard!");
    });
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleDownload = () => {
    setDownloads((prev) => prev + 1);
    toast.success("Image downloaded!");
  };

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image: ${item.imageUrl}`);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-1 aspect-h-1">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            Image not available
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-96 object-cover"
            onError={handleImageError}
          />
        )}
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Top content */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 transition-transform duration-150 ease-out ${
          isHovered ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2" />
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy(item.prompt)}
              className="w-8 h-8 flex justify-center items-center bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-200"
            >
              {copying ? (
                <LoadingCircle />
              ) : (
                <Copy className="text-white w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="w-8 h-8 flex justify-center items-center bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-200"
            >
              <Download className="text-white w-4 h-4" />
            </button>
            <button
              onClick={handleLike}
              className={`w-8 h-8 flex justify-center items-center bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-200 ${
                isLiked ? "text-red-500" : "text-white"
              }`}
            >
              <Heart
                className="w-4 h-4"
                fill={isLiked ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">
          {item.title}
        </h3>
        <p className="text-sm text-white/80 mb-3 line-clamp-2 drop-shadow-sm">
          {item.prompt}
        </p>
      </div>
    </div>
  );
}
