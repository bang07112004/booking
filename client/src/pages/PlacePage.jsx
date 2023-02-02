import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Booking from "../Booking";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) {
    return "";
  }

  return (
    <div className="mt-4 py-8 bg-gray-100 -mx-8 px-8 ">
      <h1 className="text-4xl">{place.title}</h1>
      <a
        target="blank"
        href={`https://maps.google.com/?q=${place.address}`}
        className="underline my-2 font-semibold flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>
        {place.address}
      </a>

      <PlaceGallery place={place} />
      <h2 className="text-2xl font-bold mt-3">Description</h2>
      <div className="my-4">{place.description}</div>
      <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 ">
        <div className="grid md:grid-cols-3 grid-cols-2">
          <b>
            Check in: <span className="font-normal">{place.checkIn}</span>
          </b>
          <b>
            Check out: <span className="font-normal">{place.checkOut}</span>
          </b>
          <b>
            Max number of Guests:{" "}
            <span className="font-normal">{place.maxGuests}</span>{" "}
          </b>
          <div className="text-sm text-gray-700 leading-4">
            <h2 className="text-2xl text-black mb-3 font-bold">
              Extra Information
            </h2>
            {place.extraInfo}
          </div>
        </div>
        <Booking place={place} />
      </div>
    </div>
  );
}
