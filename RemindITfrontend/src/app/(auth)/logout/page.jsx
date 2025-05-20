"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoggedOutDetails } from "@/Redux/UserSlice";
import { toast } from "sonner";
const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
          withCredentials: true,
        });
        // console.log(res)
        if (res.data.status === "success") {
            dispatch(userLoggedOutDetails());
             toast.success("Logged out successfully 👋");
            router.push("/");
        }
        else {
          toast.error("Logout failed. Please try again.");
          router.push("/");
        }
      } catch (error) {
        toast.error("Logout failed. Please try again.");
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
