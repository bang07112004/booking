import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div className="bg-gray-500 rounded-2xl cursor-pointer px-4 py-3 border-black border-4 shadow-lg shadow-black hover:shadow-xl hover:shadow-black hover:scale-110 ">
            <div className="h-auto w-auto mb-2 flex rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm line-clamp-1 leading-4 text-white opacity-80">
              {place.title}
            </h2>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-300 border-black border-2 px-3 w-fit py-2 text-center rounded-xl mt-3 shadow-md shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-md active:shadow-black active:scale-90">
                Read more
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
