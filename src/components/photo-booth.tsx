import React from "react";
import { LoadingCircle } from "./icons";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface PhotoBoothProp {
  image: string;
  loading: boolean;
}
export default function PhotoBooth({ image, loading }: PhotoBoothProp) {
  const [copying, setCopying] = React.useState(false);

  const handleCopy = () => {
    setCopying(true);
    navigator.clipboard.writeText(image!).then(() => {
      setCopying(false);
      toast.success("Copied to clipboard!");
    });
  };

  console.log(image);
  return (
    <div className="relative mx-auto mt-6 w-full max-w-xl overflow-hidden rounded-2xl border border-x-gray-200">
      {image && (
        <div className="flex absolute right-5 top-5 items-center space-x-2">
          <div className="w-9 h-9 justify-center flex border transition-all hover:scale-105 active:scale-105 cursor-pointer  shadow-sm items-center border-gray-200 bg-white rounded-full">
            {copying ? (
              <LoadingCircle />
            ) : (
              <Copy onClick={handleCopy} className="text-gray-500 w-4 h-4" />
            )}
          </div>
          <a
            href={image}
            download
            className="w-9 h-9 justify-center flex border transition-all hover:scale-105 active:scale-105 cursor-pointer  shadow-sm items-center border-gray-200 bg-white rounded-full"
          >
            <Download className="text-gray-500 w-4 h-4" />
          </a>
        </div>
      )}

      {!loading ? (
        <Image
          alt="image"
          src={image}
          width={1280}
          height={1280}
          className="h-ffull object-cover"
          unoptimized
        />
      ) : (
        <div className="z-10 flex h-[55vh] w-full flex-col items-center bg-white justify-center">
          <LoadingCircle />
          <p className="text-sm text-gray-500">
            This process takes up to 20 - 30 seconds to complete
          </p>
        </div>
      )}
    </div>
  );
}
