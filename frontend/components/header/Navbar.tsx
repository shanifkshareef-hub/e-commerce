"use client";
import React from "react";
import Menu from "./Menu";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <div className="flex-shrink-0 p-4 bg-[#0e0e0e] flex items-center justify-between">
      <Menu />
      <Profile />
    </div>
  );
};

export default Navbar;
