"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef ,useEffect} from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const activeTabKey = path.split("/")?.[1];
  const userData = useSelector((state) => state.userstate);

  const [showProfile, setShowProfile] = useState(false);

  const dropdownRef = useRef(null);

 
  const toggleProfile = () => {
    if (isLoggedIn) {
      setShowProfile((prev) => !prev);
    } else {
      router.push("/login");
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const isLoggedIn = userData?.isLoggedIn; // Assuming your state has `isLoggedIn` or userData.user

  // Dynamic nav links
  const navLinks = isLoggedIn
    ? [
        { name: "Home", key: "", href: "/" },
        { name: "Contact", key: "contact", href: "/contact" },
        { name: "Settings", key: "settings", href: "/settings" },
        { name: "Logout", key: "logout", href: "/logout" },
      ]
    : [
        { name: "Home", key: "", href: "/" },
        { name: "Contact", key: "contact", href: "/contact" },
        { name: "Login", key: "login", href: "/login" },
        { name: "Signup", key: "signup", href: "/signup" },
      ];


  return (
    <div className="bg-[#000033] py-5 fixed top-0 w-full z-50 border-b border-gray-700 shadow-md">
    <div className="lg:mx-auto mx-2 lg:px-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-white text-3xl md:text-4xl font-bold tracking-wide flex items-center space-x-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e9a] to-[#6a5af9] font-extrabold">
        RemindIT
      </span>
    </Link>

      {/* Navigation and Profile */}
      <div className="flex items-center space-x-6 ml-auto">
        {/* Navigation Links */}
        <nav className="flex space-x-6">
    {navLinks.map((tab) => (
      <Link
        href={tab.href}
        key={tab.key}
        className={`text-lg font-medium text-[#b6b8b8] hover:text-white transition-all duration-300 ease-in-out ${
          activeTabKey === tab.key
            ? "text-white border-b-2 border-[#ff2e9a] transform scale-105"
            : "hover:border-b-2 hover:border-[#ff2e9a]"
        }`}
      >
        {tab.name}
      </Link>
    ))}
  </nav>
        {/* Profile Icon */}
        <div className="relative" ref={dropdownRef}>
            <button onClick={toggleProfile} className="flex items-center">
              <Image src="/profile.avif" alt="Profile" width={28} height={28} />
            </button>

            {isLoggedIn && showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-md py-2 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Header;
