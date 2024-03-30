"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type NavLinks = {
  title: string;
  href: string;
  icon: string;
};
function Header() {
  const pathname = usePathname();

  const navLinks: NavLinks[] = [
    { title: "home", href: "/", icon: "" },
    { title: "category", href: "/category", icon: "" },
    { title: "contact", href: "/contact", icon: "" },
  ];

  const socialLinks: NavLinks[] = [
    {
      title: "facebook",
      href: "https://facebook.com/",
      icon: "fa-brands fa-facebook",
    },
    {
      title: "github",
      href: "https://github.com/EbubeIreneaus",
      icon: "fa-brands fa-github",
    },
    {
      title: "linkedin",
      href: "https://linkedin.com/in/ireneaus",
      icon: "fa-brands fa-linkedin",
    },
    {
      title: "twitter",
      href: "https://twitter.com/EbubeIreneaus",
      icon: "fa-brands fa-twitter",
    },
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const day = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const dayNo = date.getDay();

  const toggleNavMobile = () =>{
    const nav = document.querySelector('#nav') 
    nav?.classList.toggle('!max-h-[500px]')
  }
  return (
    <header>
      {/* top header */}

      <div className="hidden lg:flex justify-between bg-black text-white px-5">
        <ul className="flex text-sm gap-3 py-2">
          <li>
            {day}, {month} {dayNo}, {year}
          </li>
          <li className="hover:text-slate-200">
            <Link href="">Advertise</Link>
          </li>
          <li className="hover:text-slate-200">
            <Link href="">Login</Link>
          </li>
          <li className="hover:text-slate-200">
            <Link href="">Contact</Link>
          </li>
        </ul>

        {/* social links */}
        <ul className="flex gap-3 items-center">
          {socialLinks.map((link) => {
            return (
              <li key={link.title}>
                <Link href={link.href}>
                  <i className={link.icon}></i>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* middle header */}
      <div className="py-3.5 lg:py-5 lg:px-14 px-5 mb-px lg:mt-1 flex justify-between bg-black text-white lg:bg-transparent lg:text-black ">
        <h2 className="text-xl lg:text-3xl font-extrabold flex items-center ">
          <span>CODE</span>
          <span className="text-orange-500 font-extrabold text-3xl lg:text-6xl">
            X
          </span>
          <span>TREME</span>
        </h2>

        <button className="border px-4 rounded lg:hidden" onClick={toggleNavMobile}>
          <i className="fa fa-bars"></i>
        </button>
      </div>

      <div id="nav" 
      className="max-h-0 lg:max-h-[60px] h-full lg:h-[60px] overflow-hidden px-4 lg:px-10 bg-black text-white w-full flex lg:flex-row 
      flex-col justify-between lg:items-center transition-all duration-500 ease-in-out">
        <ul className="flex lg:flex-row flex-col gap-x-6 gap-y-3 py-3 lg:py-0 capitalize font-semibold h-full">
          {navLinks.map((link) => {
            return (
              <Link key={link.title} href={link.href}>
                <li
                  className={`h-full flex items-center px-3 py-2.5 lg:py-0 hover:bg-orange-400 rounded ${
                    pathname === link.href ? "bg-orange-500" : ""
                  }`}
                >
                  {link.title}
                </li>
              </Link>
            );
          })}
        </ul>

        <div className="pb-3 lg:pb-0">
          <div className="flex items-center gap-px">
            <input
              type="text"
              className="py-1.5 outline-none border ps-3"
              placeholder="keyword"
            />
            <button className="rounded py-1.5 px-2 bg-orange-400 hover:bg-orange-500">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
