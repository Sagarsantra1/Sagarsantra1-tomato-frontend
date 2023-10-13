import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import RestaurantPhotos from "../components/restaurant/RestaurantPhotos";
import RestaurantMenu from "../components/restaurant/RestaurantMenu";
import PhotoCarousel from "../components/restaurant/PhotoCarousel";
import { BsStarFill } from "react-icons/bs";
import { PiShareFat, PiTrafficSignBold } from "react-icons/pi";

function RestaurantDetailsPage() {
  const { slug,city } = useParams();
  const url = window.location.href;

  const [selectedTab, setSelectedTab] = useState("Menu");
  const [isSticky, setSticky] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState();

  const getRestaurant = async () => {
    const response = await fetch(
      `https://tomato-backend-okwwd6qv3-sagarsantra1.vercel.app/api/restaurants/${city}/${slug}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const handleScroll = () => {
    setSticky(window.pageYOffset >= 246.6666717529297);
  };

  const selectTab = (e) => {
    setSelectedTab(e.target.innerText);
  };
  const openGalary = () => {
    setSelectedTab("Photos");
    const photosTab = document.getElementById("photos");
    var stickyElementHight = 120;
    photosTab.scrollIntoView(true);
    var scrolledY = window.scrollY;
    if (scrolledY) {
      window.scroll(0, scrolledY - stickyElementHight);
    }
  };

  const openPhotoCarousel = (clickedPhotoUrl) => {
    setIsCarouselOpen(true);
    setClickedPhoto(clickedPhotoUrl);
  };

  const closePhotoCarousel = () => {
    setIsCarouselOpen(false);
  };

  const shareURL = async () => {
    try {
      await navigator.share({ url: url });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { data, error, isLoading } = useQuery(slug, getRestaurant);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  if (!data) {
    return <div>Restaurant not found.</div>;
  }
  const { name, cuisine, restaurantImage, images, rating, address, menu } =
    data;

  return (
    <>
      {isCarouselOpen && (
        <PhotoCarousel
          photos={images && images}
          clickedPhotoUrl={clickedPhoto}
          closePhotoCarousel={closePhotoCarousel}
        />
      )}
      <div className=" text-gray-600 px-4 sm:px-20 relative">
        <div className="flex h-60 md:h-80 w-full mb-3 gap-2 overflow-hidden">
          <div className="w-2/3 md:w-3/5 h-full overflow-hidden bg-gray-300">
            {restaurantImage && (
              <img
                className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105 hover:brightness-110 max-w-sm sm:max-w-xl md:max-w-3xl "
                loading="lazy"
                src={restaurantImage}
                alt={name}
              />
            )}
          </div>

          <div className=" flex-col w-1/5 h-full hidden md:flex gap-y-2">
            <div className="h-1/2 w-full overflow-hidden bg-gray-300 cursor-pointer">
              {images && images[2] && (
                <img
                  className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105 hover:brightness-110 max-w-xs"
                  loading="lazy"
                  src={images[2]}
                  alt={name}
                  onClick={() => openPhotoCarousel(images[2])}
                />
              )}
            </div>

            <div className="h-1/2 w-full overflow-hidden bg-gray-300 cursor-pointer">
              {images && images[3] && (
                <img
                  className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105 hover:brightness-110 max-w-xs"
                  loading="lazy"
                  src={images[3]}
                  alt={name}
                  onClick={() => openPhotoCarousel(images[3])}
                />
              )}
            </div>
          </div>

          <div className="h-full w-1/3 md:w-1/5 overflow-hidden relative bg-gray-300">
            {images && images[1] && (
              <img
                className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105 hover:brightness-110 max-w-xs md:max-w-md"
                loading="lazy"
                src={images[1]}
                alt={name}
              />
            )}
            <div
              className="absolute top-0 w-full h-full bg-black bg-opacity-25 left-0 text-white flex items-center justify-center cursor-pointer"
              onClick={openGalary}
            >
              View Gallery
            </div>
          </div>
        </div>
        <div
          className={`${
            isSticky ? "sticky top-0 left-0 right-0 bg-white z-20" : "relative"
          }`}
        >
          <div className="flex text-sm justify-between">
            <h1 className="text-3xl font-semibold text-black">{name}</h1>
            <div className="flex items-center">
              <div className="bg-green-600 text-lg font-bold text-white rounded-lg px-1 mr-2 flex items-center gap-1">
                {rating}
                <BsStarFill size={15} />
              </div>
              <div>
                <span className="font-bold">152</span>
                <h2>Delivery Reviews</h2>
              </div>
            </div>
          </div>
          <div className="text-base">
            <div className="">{cuisine}</div>
            <Link className="text-gray-500 hover:text-gray-600">{address}</Link>
            <div className="text-orange-400">
              Opentime - <span className="text-gray-500">11pm</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 my-3 z-0">
          <div className="border border-gray-500 rounded-lg w-fit py-1 px-2 cursor-pointer flex items-center gap-1 hover:bg-gray-50">
            <PiTrafficSignBold className="text-orange-500" /> Diretion
          </div>
          <div
            className="border border-gray-500 rounded-lg w-fit py-1 px-2 cursor-pointer flex items-center gap-1 hover:bg-gray-50"
            onClick={shareURL}
          >
            <PiShareFat className="text-orange-500" /> Share
          </div>
        </div>

        <div>
          <div
            className={`${
              isSticky
                ? "sticky top-36 sm:top-28 left-0 right-0 bg-white z-20"
                : "relative"
            } w-full flex  justify-start border-b-2 border-gray-400 py-3 mb-2 text-lg space-x-10`}
          >
            <div
              className={`${
                selectedTab === "Menu" ? "text-orange-500" : ""
              } cursor-pointer `}
              onClick={selectTab}
            >
              Menu
            </div>
            <div
              className={`${
                selectedTab === "Photos" ? "text-orange-500" : ""
              } cursor-pointer `}
              onClick={selectTab}
              id="photos"
            >
              Photos
            </div>
          </div>
          <div
            className={`${
              isSticky
                ? "sticky top-40 left-0 right-0 bg-white z-10"
                : "relative"
            }`}
          >
            {selectedTab === "Photos" && (
              <RestaurantPhotos
                resturantName={name}
                images={images}
                openPhotoCarousel={openPhotoCarousel}
              />
            )}
            {selectedTab === "Menu" && <RestaurantMenu menu={menu} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantDetailsPage;
