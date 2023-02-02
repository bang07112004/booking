import { useEffect, useState } from "react";
import Features from "../Features";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import PhotosUploader from "../PhotosUploader";

export default function PlacesFormPage() {
  const { id } = useParams();
  console.log({ id });
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState();
  const [description, setDescription] = useState();
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setFeatures(data.features);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }
  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <AccountNav />
      <form action="" onSubmit={savePlace}>
        <h2 className="text-xl font-bold my-1">Title</h2>
        <input
          type="text"
          placeholder="The Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-xl font-bold my-1">Address</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <h2 className="text-xl font-bold my-1">Description</h2>
        <textarea
          placeholder="Describe about your accommodation"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Features selected={features} onChange={setFeatures} />
        <h2 className="text-xl font-bold my-1">Extra Information</h2>
        <textarea
          placeholder="Some extra information, example: rules, announcements, etc..."
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-xl font-bold my-1">
          Check in & Check out time & Max guests
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="text-center">
            <h3 className="my-1">Check in time</h3>
            <input
              type="text"
              placeholder="Check in time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="text-center">
            <h3 className="my-1">Check out time</h3>{" "}
            <input
              type="text"
              placeholder="Check out time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="text-center">
            <h3 className="my-1">Max number of guests</h3>{" "}
            <input
              type="number"
              placeholder="max number of guests"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div className="text-center">
            <h3 className="my-1">Price per night</h3>{" "}
            <input
              type="number"
              placeholder="max number of guests"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={
              !title ||
              !address ||
              !description ||
              !checkIn ||
              !checkOut ||
              !maxGuests ||
              !price
            }
            className={`px-5 py-1 shadow-md bg-primary shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-md active:shadow-black active:scale-90 border border-gray-300 rounded-full text-white my-auto ${
              !title ||
              !address ||
              !description ||
              !checkIn ||
              !checkOut ||
              !maxGuests ||
              !price
                ? "cursor-not-allowed bg-gray-300 opacity-80 hover:shadow-none hover:scale-100 shadow-none active:shadow-none active:scale-100"
                : ""
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
