import React from "react";
import LNavbar from "./LNavbar";
import { Link } from "react-router-dom";
import {
  IconChefHat,
  IconDeviceIpadHorizontal,
  IconLayout,
} from "@tabler/icons-react";
import { subscriptionPrice } from "../../config/config";
import Footer from "./Footer";
import ContactForm from "./ContactForm";

export default function LadingPage() {
  return (
    <div className="w-full">
      {/* navbar */}
      <LNavbar />
      {/* navbar */}

      {/* hero */}
      <div className="w-full container mx-auto flex flex-col items-center mt-40 px-6 lg:px-0">
        <h3 className="text-3xl lg:text-5xl font-bold text-center">All-in-One POS</h3>
        <h3 className="text-3xl lg:text-5xl font-bold text-center">
          for <span className="text-restro-green">Your Food & Beverage</span>{" "}
          Empire.
        </h3>

        <p className="text-gray-500 mt-8 text-center">
          Effortless POS. Unparalleled Growth. ProDiner POS empowers you with
          the tools you need to streamline operations, increase staff
          productivity, and gain valuable customer insights. Make data-driven
          decisions, optimize your menu, and watch your foodservice business
          flourish.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <Link
            className="hover:bg-restro-green-dark bg-restro-green text-lg text-white rounded-full px-5 py-3 transition active:scale-95"
            to="/login"
          >
            Get Started
          </Link>
          <a
            className="hover:bg-gray-100 text-restro-green-dark text-lg rounded-full px-5 py-3 transition active:scale-95"
            href="#pricing"
          >
            View Pricing
          </a>
        </div>
      </div>
      <img
        src="/assets/hero.png"
        alt="pro diner image"
        className="w-4/5 mx-auto mt-[100px] border-[#d14026] border-[10px] rounded-[30px]"
      />
      {/* hero */}

      {/* features */}
      <h3 className="text-4xl font-bold text-center container mx-auto mt-40">
        Features
      </h3>
      <div
        id="features"
        className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-3 my-20 gap-10 px-6 lg:px-0"
      >
        <div className="rounded-2xl px-8 py-6 border flex flex-col items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-restro-green bg-red-100">
            <IconLayout />
          </div>
          <h3 className="mt-4 font-bold text-2xl text-center">Minimal UI</h3>
          <p className="text-gray-700 mt-2 text-center">
            Effortless Interface, ProDiner POS boasts a clean and intuitive
            design. No cluttered screens, just the essentials you need to manage
            your business with ease.
          </p>
        </div>

        <div className="rounded-2xl px-8 py-6 border flex flex-col items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-restro-green bg-red-100">
            <IconDeviceIpadHorizontal />
          </div>
          <h3 className="mt-4 font-bold text-2xl text-center">POS</h3>
          <p className="text-gray-700 mt-2 text-center">
            ProDiner POS simplifies sales. Manage orders, categories & variants
            with ease. Send to kitchen instantly & accept payments securely.
            All-in-one for a smooth flow.
          </p>
        </div>

        <div className="rounded-2xl px-8 py-6 border flex flex-col items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-restro-green bg-red-100">
            <IconChefHat />
          </div>
          <h3 className="mt-4 font-bold text-2xl text-center">Live Updates</h3>
          <p className="text-gray-700 mt-2 text-center">
            Kitchen in Sync, Never miss a beat. Live order updates send details
            directly to your kitchen, ensuring accuracy and minimizing prep
            time.
          </p>
        </div>
      </div>
      {/* features */}

      {/* pricing */}
      <h3 className="text-4xl font-bold text-center container mx-auto mt-40">
        Pricing
      </h3>
      <div
        id="pricing"
        className="w-full container mx-auto grid grid-cols-1 my-20 gap-10 place-items-center px-6 lg:px-0"
      >
        <div className="rounded-2xl px-8 py-6 border flex flex-col w-full lg:w-96">
          <h3 className="text-4xl text-red-700 font-bold text-center">{subscriptionPrice}</h3>
          <h3 className=" font-bold text-2xl text-center">per month</h3>
          <ul className="text-gray-700 mt-6 flex flex-col gap-2 text-start">
            <li>✅ Monthly Renewals</li>
            <li>✅ Unlimited Orders</li>
            <li>✅ Unlimited Devices</li>
            <li>✅ Unlimited Reservations</li>
            <li>✅ Live Kitchen Orders</li>
            <li>✅ Unlimited Users</li>
            <li>✅ QR Code orders</li>
            <li>✅ Inventory Management for non-menu items</li>
            <li>✅ Customer Management</li>
            <li>✅ Kitchen order sound feedback</li>
            <li>✅ Real-time</li>
          </ul>
        </div>
      </div>
      {/* pricing */}

      {/* pricing */}
      <h3 className="text-4xl font-bold text-center container mx-auto mt-40">
        Roadmap
      </h3>
      <div
        id="road-map"
        className="w-full container mx-auto grid grid-cols-1 my-20 gap-10 place-items-center px-6 lg:px-0"
      >
        <div className="rounded-2xl px-8 py-6 border flex flex-col w-full lg:w-96">
          <ul className="text-gray-700 mt-6 flex flex-col gap-2 text-start">
            <li>😃 Stock Management Support for menu items : 10th Jan, 2025</li>
            <li>😃 Barcode generator for Stock Management : 15th Jan, 2025</li>
            <li>😃 Customer order real-time feedback : 25th Jan, 2025</li>
            <li>😃 Delivery management: 25th Feb, 2025</li>
          </ul>
        </div>
      </div>
      {/* pricing */}

      {/* contact */}
      {/* <div id="contact" className="container mx-auto my-40 px-6 lg:px-0">
        <div
          className="lg:h-40 px-10 py-6 flex gap-4 flex-col md:flex-row lg:items-center rounded-3xl bg-restro-green-dark text-restro-green shadow-2xl shadow-red-700/40"
        >
          <h3 className="flex-1 font-bold text-4xl text-white">
            Have any queries?
          </h3>
          <a
            className="bg-white text-lg text-restro-green-dark rounded-full px-5 py-3 transition active:scale-95 block"
            href="mailto:info@prodiner.net"
          >
            Contact us
          </a>
        </div>
      </div> */}
      {/* contact */}
      <div id="contact" className="container mx-auto my-40 px-6 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            Have any questions? We'd love to hear from you.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ContactForm />
        </div>
      </div>
      {/* contact */}
      
      {/* contact */}

      {/* footer */}
      <Footer />
      {/* footer */}
    </div>
  );
}
