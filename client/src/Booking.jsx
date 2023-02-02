import { useState } from "react";
import { differenceInCalendarDays, lastDayOfDecade } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
export default function Booking({ place }) {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState();
  const [mobilePhone, setMobilePhone] = useState();
  const [redirect, setRedirect] = useState();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      place: place._id,
      price: numberOfDays * place.price,
      checkOut,
      name,
      mobilePhone,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white rounded-3xl shadow-md shadow-black text-black gap-3 flex flex-col p-4 ">
      <h2 className="text-2xl text-center font-bold">
        {" "}
        Price: ${place.price} / per night
      </h2>
      <div className="my-1 border shadow-md rounded-2xl py-4 px-4">
        <label htmlFor="">Check Out:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="my-1 border shadow-md rounded-2xl py-4 px-4">
        <label htmlFor="">Check In:</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div className="my-1 border shadow-md rounded-2xl py-4 px-4">
        <label htmlFor="">Number of Guests:</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </div>
      {numberOfDays > 0 && (
        <div className="">
          <label htmlFor="">Your full name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Your phone number:</label>
          <input
            type="tel"
            placeholder="Your phone number"
            value={mobilePhone}
            onChange={(e) => setMobilePhone(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={bookThisPlace}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl px-4 py-2 max-w-fit border border-gray-300 mx-auto shadow-md shadow-black hover:scale-110 hover:shadow-lg hover:shadow-black active:s cale-90 active:shadow-md active:shadow-black"
      >
        Book this place
        {numberOfDays > 0 && <span> (${numberOfDays * place.price})</span>}
      </button>
    </div>
  );
}
