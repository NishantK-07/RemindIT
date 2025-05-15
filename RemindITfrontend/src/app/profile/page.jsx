"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.userstate);
  const isLoggedIn = userData?.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const { name, email } = userData.user || {};
  let formattedDate = "N/A";
const createdAt = userData?.user?.createdAt;

if (createdAt) {
  const createdDate = new Date(createdAt);
  if (!isNaN(createdDate)) {
    formattedDate = createdDate.toISOString().split("T")[0];
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f5f7fa] to-[#c3cfe2] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-white/40">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <Image
              src="/profile.avif"
              alt="Profile Avatar"
              width={96}
              height={96}
              className="rounded-full border-4 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            {name || "Your Name"}
          </h1>
          <p className="text-gray-600">{email || "you@example.com"}</p>
        </div>

        <div className="mt-8 space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Username</span>
            <span className="text-right">{name || "yourusername"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email</span>
            <span className="text-right">{email || "you@example.com"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Member Since</span>
            <span className="text-right">{formattedDate}</span> {/* Replace with real date if available */}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/settings")}
            className="px-6 py-2 bg-[#6a5af9] text-white rounded-md hover:bg-[#5843eb] transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
