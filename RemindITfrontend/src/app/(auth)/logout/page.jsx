"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoggedOutDetails } from "@/Redux/UserSlice";

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.post("http://localhost:3010/api/auth/logout", {
          withCredentials: true,
        });
        console.log(res)
        if (res.data.status === "success") {
            console.log("iam here")
            dispatch(userLoggedOutDetails());

            router.push("/");
        }
        
      } catch (error) {
        console.error("Logout failed:", error);
        router.push("/"); // fallback if logout fails
      }
    };

    logout();
  }, [dispatch, router]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p className="text-xl text-gray-700">Logging you out...</p>
    </div>
  );
};

export default LogoutPage;
