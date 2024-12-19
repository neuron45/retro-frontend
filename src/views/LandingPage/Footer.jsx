import React from "react";
import Logo from "../../assets/logo.svg";

export default function Footer() {
  return (
      <div className="w-full border-t">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 container mx-auto px-4 py-3">
        <a href="/">
            <img src={Logo} alt="logo" className="h-12" />
        </a>
        <div className="flex flex-col lg:flex-row lg:items-center">
            <a
            className="hover:bg-gray-100 text-gray-700 rounded-full px-4 py-2 transition active:scale-95"
            href="/privacy"
            >
            Privacy Policy
            </a>
            <a
            className="hover:bg-gray-100 text-gray-700 rounded-full px-4 py-2 transition active:scale-95"
            href="/terms-and-conditions"
            >
            Terms &amp; Conditions
            </a>
        </div>
        </div>
    </div>
  );
}
