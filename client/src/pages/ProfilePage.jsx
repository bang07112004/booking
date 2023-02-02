import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  console.log(subpage);
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center py-8 font-bold max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email}) <br />
          <button
            onClick={logout}
            className="text-white font-normal hover:font-bold shadow-md border border-gray-300 hover:border-[3px] hover:border-gray-400 shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 active:shadow-sm active:shadow-black active:scale-90  bg-primary px-20 py-2 rounded-full mt-3"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}
