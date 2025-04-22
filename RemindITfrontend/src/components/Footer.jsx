"use client";

import Link from "next/link";
import Image from "next/image";

// Sample footer data
const headings = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Updates"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Terms of Service", "Privacy Policy"],
  },
];

const connectWithUsLinks = [
  { icon: "github.png", href: "https://facebook.com" },
  { icon: "twitter.webp", href: "https://twitter.com" },
  { icon: "link.png", href: "https://linkedin.com" },
];

const downloadAppLinks = [
  {
    icon: "/appstore.jfif",
    alt: "Download on the App Store",
  },
  {
    icon: "/googlePlay.svg",
    alt: "Get it on Google Play",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#000033] text-gray-300">
  {/* Adding a top border to separate it from the content above */}
  <div className="border-t-2 border-gray-700"></div>

  <div className="md:mx-auto">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start px-8 py-12">
      
      {/* Column for Links */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16 mt-8">
        {headings.map((heading, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h3 className="text-lg font-bold uppercase text-[#ff2e9a]">{heading.title}</h3>
            <div className="flex flex-col gap-1 text-sm text-gray-400">
              {heading.links.map((link, linkIndex) => (
                <Link href="#" key={linkIndex} className="hover:underline hover:text-white transition duration-300 ease-in-out">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Connect With Us */}
      <div className="flex flex-col gap-4 md:gap-8 mt-8">
        <h3 className="text-lg font-bold uppercase text-[#ff2e9a]">Connect With Us</h3>
        <div className="flex gap-4">
          {connectWithUsLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className=" p-2 hover:bg-[#ff2e9a] transition duration-300 ease-in-out"
            >
              <Image
                src={"/" + link.icon}
                alt={link.href}
                width={32}
                height={32}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Download the App */}
      <div className="flex flex-col gap-2 md:gap-4 mt-8">
        <h3 className="text-lg font-bold uppercase text-[#ff2e9a]">Download the App</h3>
        <div className="flex gap-4">
          {downloadAppLinks.map((link, index) => (
            <Link key={index} href="#" className="flex items-center">
              <Image
                src={link.icon}
                width={120}
                height={40}
                alt={link.alt}
                className="w-auto h-10 md:h-12"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* Footer Bottom Section */}
    <div className="text-center mt-8 bg-[#000033] py-4 px-4 text-sm border-t border-gray-700">
      <p className="mb-2 text-gray-400">
        © {new Date().getFullYear()} RemindIT. All rights reserved.
      </p>
      <p className="text-xs text-gray-500">Made with ❤️ for productivity</p>
    </div>
  </div>
</footer>

  );
}
