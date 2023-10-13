function RestaurantPhotos({ resturantName, images, openPhotoCarousel }) {
  return (
    <>
      <h2 className="font-semibold text-black text-2xl mb-10">
        {resturantName} photos
      </h2>
      <div className="flex flex-wrap gap-3 items-center justify-center mb-5">
        {images&&images.map((image, index) => (
          <div
            className="h-36 md:h-44 w-36 md:w-44 lg:w-52 overflow-hidden rounded-lg bg-gray-300"
            key={index}
            onClick={() => openPhotoCarousel(image)}
          >
            <img
              src={image}
              alt="image"
              loading="lazy"
              className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default RestaurantPhotos;
