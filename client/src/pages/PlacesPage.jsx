import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import PlacesFormPage from "./PlacesFormPage";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center mt-5">
        <Link
          to={"/account/places/new"}
          className="mt-5 inline-flex gap-1 items-center py-2 px-6 bg-primary border border-gray-300 hover:border-2 text-white rounded-full shadow-md shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-sm active:shadow-black active:scale-90 hover:font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-200 cursor-pointer p-4 rounded-2xl flex gap-4"
            >
              <div className="w-32 h-32 flex shrink-0 rounded-xl bg-gray-300">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl"> {place.title}</h2>
                <p className="text-sm text-gray-500 mt-2 grow line-clamp-4 ">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
