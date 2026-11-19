"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-gray-700">
      <nav className="flex w-full items-center justify-start gap-15 px-6 py-4 text-gray-300">
        <div className="font-bold text-xl">
          <img
            className="h-10 w-10 rounded-full"
            src="/sohaib.png"
            alt="Logo"
          />
        </div>

        <Link href="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>

        <Link
          href="/about"
          onClick={() => {
            // BMI Calculate par click karne se session permission mil jaye gi.
            sessionStorage.setItem("bmi-access", "true");
          }}
          className="hover:text-blue-400 transition-colors"
        >
          BMI calculate
        </Link>
      </nav>
    </header>
  );
};

export default Header;
