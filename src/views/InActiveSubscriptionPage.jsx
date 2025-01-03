import Page from "../components/Page"
import Logo from "../assets/logo.svg";
import { iconStroke, subscriptionPrice } from '../config/config';
import React from "react";
import { signOut } from "../controllers/auth.controller";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetailsInLocalStorage } from "../helpers/UserDetails";
import AppBarDropdown from "../components/AppBarDropdown";

export default function InActiveSubscriptionPage() {
  const navigate = useNavigate();
  const user = getUserDetailsInLocalStorage();

  const btnSubscribe = async () => {
    toast.loading("Please wait...")
    // try {
    //   const res = await getStripeSubscriptionURL(stripeProductSubscriptionId);
    //   toast.dismiss();

    //   if(res.status == 200) {
    //     const data = res.data;
    //     window.location.href = data.url;
    //   }
    // } catch (error) {
    //   const message = error?.response?.data?.message || "Can't retrieve the product subscription, Please try after sometime!";
    //   console.error(error);
    //   toast.dismiss();
    //   toast.error(message);
    // }
  }

  return (
    <Page className="">
      <div className="flex items-center justify-between px-4 py-3 border-b border-restro-border-green-light w-full bg-white">
        <img src={Logo} alt="logo" className="h-12 block" />

        {/* profile */}
        <AppBarDropdown />
        {/* profile */}
      </div>

      {
        user.role == "admin" ? <>
        <h3 className="mt-4 text-center">You don't have any active Subscription! If already subscribed, then signout and login again!</h3>
        <div
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
        <b className="text-red-500 px-4 py-3 transition active:scale-95 mt-6 text-2xl">Call your Relationship Manager to renew</b>

      </div>
        </>:<div>
        <h3 className="mt-4 text-center">You don't have any active Subscription!</h3>
        </div>
        
      }
    </Page>
  )
}
