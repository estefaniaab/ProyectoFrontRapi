import React from "react";
import { Photo } from "../../models/Photo";


interface PhotoViewerProps {
  photo: Photo;
  altText?: string;
  className?: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ photo, altText, className }) => {
  if (!photo || !photo.image_url) {
    return <div className="text-gray-500">Imagen no disponible</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={import.meta.env.VITE_API_URL + photo.image_url}
        alt={altText || "Foto"}
        className="rounded-md shadow-md w-full max-h-80 object-cover"
      />
      {photo.caption && (
        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-sm px-2 py-1 w-full text-center">
          {photo.caption}
        </div>
      )}
    </div>
  );
};

export default PhotoViewer;
