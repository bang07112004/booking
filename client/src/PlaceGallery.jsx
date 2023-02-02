import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="inset-0 bg-black min-h-fit text-white absolute z-0">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="font-bold text-2xl mr-36">Photo of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex right-5 gap-1 py-2 px-4 rounded-2xl fixed shadow-md shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-md active:shadow-black active:scale-90"
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="flex justify-center">
                <img
                  src={`https://booking-ia3g.onrender.com/uploads/${photo}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid gap-x-3 gap-y-2 grid-cols-[2fr_1fr] overflow-hidden ">
        <div>
          {place.photos?.[0] && (
            <div className="aspect-square object-cover ">
              <img
                onClick={() => setShowAllPhotos(true)}
                src={`https://booking-ia3g.onrender.com/uploads/${place.photos[0]}`}
                alt=""
                className="rounded-2xl cursor-pointer hover:scale-105"
              />
            </div>
          )}
        </div>
        <div className="grid gap-2">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              src={`https://booking-ia3g.onrender.com/uploads/${place.photos[1]}`}
              className="aspect-square object-cover cursor-pointer rounded-2xl hover:scale-105"
              alt=""
            />
          )}
          <div className="">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                src={`https://booking-ia3g.onrender.com/uploads/${place.photos[2]}`}
                className="aspect-square object-cover relative cursor-pointer rounded-2xl hover:scale-105"
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="
    shadow-md shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-md active:shadow-black active:scale-90
    absolute bottom-2 right-2 py-2 px-3 bg-white overflow-hidden border-black border-2 rounded-2xl flex gap-1 items-center"
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
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
