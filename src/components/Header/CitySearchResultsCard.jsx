import { Link } from "react-router-dom";

function CitySearchResultsCard({ city,name }) {
  return (
    <Link to={`/${city}`} className="block hover:bg-gray-100">
      <div className="flex items-center p-2 space-x-5 cursor-pointer ">
        <div>
          <h2 className="font-semibold text-lg text-ellipsis line-clamp-1">
            {name}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default CitySearchResultsCard;
