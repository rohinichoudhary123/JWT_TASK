import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProfilePage = () => {
  async function getProfile() {
    try {
      let res = await axios.get("http://localhost:3000/api/user/profile", {
        withCredentials: true,
      });

      return res.data.user;
    } catch (error) {
      console.log("Error in profile", error.response.data.message);
    }
  }

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

 return (
  <div className=" h-full flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-xl p-8 w-90 text-center">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="space-y-3 text-lg">
        <h1>
          <span className="font-semibold">Username: </span>
          {profile?.username}
        </h1>

        <h1>
          <span className="font-semibold">Email: </span>
          {profile?.email}
        </h1>

        <h1>
          <span className="font-semibold">Verified: </span>
          <span className={profile?.isVerified ? "text-green-600" : "text-red-500"}>
            {profile?.isVerified ? "Yes" : "No"}
          </span>
        </h1>
      </div>

    </div>
  </div>
);
};

export default ProfilePage;
