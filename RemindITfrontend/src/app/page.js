// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className=" bg-[#000033] flex flex-col md:flex-row justify-between items-center min-h-screen px-8 md:px-24 py-12 ">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white">
  Welcome to{" "}
  <span className="bg-gradient-to-r from-[#ff2e9a] to-[#6a5af9] bg-clip-text text-transparent">
    RemindIT
  </span>
</h1>

    <p className="text-lg text-white mt-4">
      Your smart companion for mastering DSA and staying consistent with your prep.
    </p>

    <p className="text-md text-white mt-2">
      Add coding problems you want to revisit, take structured notes, and highlight important strategies. Set personalized reminders to revise them regularly and maintain a rock-solid revision routine.
    </p>

    <p className="text-md text-white mt-2">
      Stay organized, build habits, and keep pushing forward—one problem at a time.
    </p>

        <Link
          href="/dashboard"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
        >
          Get Started
        </Link>

        <div className="flex gap-4 justify-center md:justify-start mt-6">
  <a
    href="https://github.com/NishantK-07"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/github.png"
      alt="GitHub"
      width={32}
      height={32}
      className="hover:scale-110 transition duration-300"
    />
  </a>

  <a
    href="https://linkedin.com/in/nishant-kumar-79024524a"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/link.png"
      alt="LinkedIn"
      width={32}
      height={32}
      className="hover:scale-110 transition duration-300"
    />
  </a>

  <a
    href="https://x.com/nishant_7011"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/twitter.webp"
      alt="Twitter"
      width={32}
      height={32}
      className="hover:scale-110 transition duration-300"
    />
  </a>
</div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <Image
          src="/img-removebg-preview.png"
          alt="RemindIT App Preview"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </section>
  );
}
