import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";

function PhotoCarousel({ photos, clickedPhotoUrl, closePhotoCarousel }) {
  const clickedPhotoIndex = photos.indexOf(clickedPhotoUrl);
  const [currentImageIndex, setCurrentImageIndex] = useState(clickedPhotoIndex);
  const totalImages = photos.length;

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed top-0 w-full h-screen z-50 bg-black text-white flex items-center justify-center">
      <button
        className="absolute top-2 right-10 cursor-pointer z-10"
        onClick={closePhotoCarousel}
      >
        <LuX size={40} />
      </button>
      <div className="h-screen w-screen p-3 md:w-2/3 md:p-0 md:h-full flex items-center justify-center gap-5 relative">
        <button className="absolute left-2 z-20 sm:static" onClick={prevImage}>
          <LuChevronLeft size={60} />
        </button>
        <div className="h-5/6 w-full md:w-4/5 relative flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full"
            src={photos[currentImageIndex]}
            alt="photo"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-0">{`${
            currentImageIndex + 1
          } of ${totalImages}`}</div>
        </div>
        <button className="absolute right-2 z-20 sm:static" onClick={nextImage}>
          <LuChevronRight size={60} />
        </button>
      </div>
    </div>
  );
}

export default PhotoCarousel;
