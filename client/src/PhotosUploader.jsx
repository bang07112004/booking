import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
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
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  function removePhoto(e, filename) {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectAsMainPhoto(e, filename) {
    e.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  }
  return (
    <>
      <h2 className="text-xl font-bold my-1">Photos</h2>
      <div className="flex gap-2">
        <input
          type="text"
          onChange={(e) => setPhotoLink(e.target.value)}
          value={photoLink}
          placeholder={"Add using a link...jpg"}
        />
        <button
          disabled={!photoLink}
          onClick={addPhotoByLink}
          className={`px-5 py-1 shadow-md bg-primary shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-md active:shadow-black active:scale-90 border border-gray-300 rounded-full text-white my-auto ${
            !photoLink
              ? "cursor-not-allowed bg-gray-300 opacity-80 hover:shadow-none hover:scale-100 shadow-none active:shadow-none active:scale-100"
              : ""
          }`}
        >
          Add Photos
        </button>
      </div>
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 my-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"https://booking-ia3g.onrender.com/uploads/" + link}
                alt=""
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className=" shadow-md shadow-gray-500 hover:shadow-lg hover:shadow-gray-500 hover:scale-110 active:shadow-md active:shadow-gray-500 active:scale-90 border border-gray-600
                  absolute bottom-1 right-1 rounded-full text-white bg-black p-2 bg-opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => selectAsMainPhoto(e, link)}
                className=" shadow-md shadow-gray-500 hover:shadow-lg hover:shadow-gray-500 hover:scale-110 active:shadow-md active:shadow-gray-500 active:scale-90 border border-gray-600
                  absolute bottom-1 left-1 rounded-full text-white bg-black p-2 bg-opacity-60"
              >
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="bg-gray-300 cursor-pointer shadow-md relative shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-md active:shadow-black active:scale-90 border border-gray-500 rounded-full p-2 text-center flex items-center justify-center w-10 h-10">
          <input
            multiple
            type="file"
            className="w-10 h-10 hidden absolute top-1 rounded-full"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 rounded-full"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    </>
  );
}
