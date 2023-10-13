import React, { useEffect, useState, useCallback, useRef } from "react";
import ProductCard from "./MenuCard";
import { BsFilter, BsSearch } from "react-icons/bs";

function RestaurantMenu({ menu }) {
  if (!menu) {
    return <div>Menu not found.</div>;
  }

  const [filteredMenu, setFilteredMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [isMenuFilterOpen, setIsMenuFilterOpen] = useState(false);
  const [clickedOnCategory, setClickedOnCategory] = useState(false);
  const containerRef = useRef(null);

  const sortByCategory = (menuItems) => {
    const categories = [...new Set(menuItems.map((item) => item.category))];
    const newFilteredMenu = categories.map((category) => ({
      name: category,
      items: menuItems.filter((item) => item.category === category),
    }));
    setFilteredMenu(newFilteredMenu);
  };

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const toggleMenuFilter = useCallback(() => {
    setIsMenuFilterOpen((prevIsMenuFilterOpen) => !prevIsMenuFilterOpen);
  }, []);

  const changeCategory = useCallback((category) => {
    setSelectedCategory(category);
    setClickedOnCategory(true);
  }, []);

  useEffect(() => {
    const searchedMenu = menu.filter((menuItem) =>
      menuItem.name.toLowerCase().includes(search.toLowerCase())
    );
    sortByCategory(searchedMenu);
    setSelectedCategory(
      searchedMenu.length > 0 ? searchedMenu[0].category : ""
    );
  }, [menu, search]);

  useEffect(() => {
    setIsMenuFilterOpen(false)
    const targetElement = document.getElementById(selectedCategory);
    const stickyElementHeight = 150;
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      // Calculate the scroll position to bring the element into view at the top
      const desiredScrollPosition = window.scrollY + elementRect.top - stickyElementHeight;
      window.scroll(0, desiredScrollPosition);

      setClickedOnCategory(false);
    }
  }, [clickedOnCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedCategory(entry.target.getAttribute("id"));
          }
        });
      },
      {
        rootMargin: "-250px",
        threshold: 0.1,
      }
    );

    const categoryElements = containerRef.current.querySelectorAll(".category");
    categoryElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredMenu]);

  return (
    <div className="flex relative gap-2">
      <div
        className={`sticky top-40 ${
          isMenuFilterOpen ? "w-fit overflow-visible" : "w-0"
        } overflow-hidden sm:overflow-visible sm:w-40 max-w-md h-fit`}
      >
        {filteredMenu.map(({ name, items }) => (
          <div
            key={name}
            className="w-fit pr-5 h-fit text-lg cursor-pointer"
            onClick={() => changeCategory(name)}
          >
            <div
              className={`${
                selectedCategory === name ? "text-orange-500" : ""
              } py-2`}
            >
              {name} ({items.length})
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex-grow overflow-hidden sm:border-l border-gray-300 sm:pl-10"
        ref={containerRef}
      >
        <div className="w-full  flex items-center justify-between h-10">
          <button
            className="border border-gray-400 p-1 rounded-lg w-fit hover:bg-gray-100 cursor-pointer flex items-center gap-1 sm:hidden"
            onClick={toggleMenuFilter}
          >
            <BsFilter /> categories
          </button>
          <div
            className="relative flex items-center"
            htmlFor="searchWithinMenu"
          >
            <BsSearch className="absolute m-2 pointer-events-none" />
            <input
              className="border border-gray-400 rounded-md py-1 px-2 pl-7 focus:border-orange-400 outline-none"
              placeholder="Search within menu"
              name="searchWithinMenu"
              onChange={handleSearch}
              type="text"
            />
          </div>
        </div>
        <div>
          {filteredMenu.length > 0 ? (
            filteredMenu.map(({ name, items }, index) => (
              <div
                className="border-b border-gray-500 py-5 relative"
                key={index}
                id={name}
              >
                <div className="category absolute top-40" id={name}></div>
                <div className="text-xl text-black font-semibold">{name}</div>
                {items.map((item, index) => (
                  <ProductCard key={index} item={item} />
                ))}
                <div className="category absolute -bottom-24" id={name}></div>
              </div>
            ))
          ) : (
            <div className="h-96 flex flex-col items-center justify-center">
              <img
                className="w-60"
                src="https://b.zmtcdn.com/data/web_assets/92ee94aa8441af56a34dc5a61547c50a1591338812.png"
                alt="empty Plate"
              />
              No items found that match your search/filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
