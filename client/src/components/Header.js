import React from "react";
import {Button} from "antd";

function Header() {
  return (
    <header className="container mx-auto px-5 flex justify-between py-4">
      <div>
        {/* image */}
        
        <img src="" alt="logo" />
        </div>

      <div className="flex gap-x-9 ">
        <ul className="flex gap-x-5 items-center font-semibold hover: text-orange-400">
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/">Donation</a>
          </li>

          <li>
            <a href="/">Requests</a>
          </li>

          <li>
            <a href="/">Events</a>
          </li>

          <li>
            <a href="/marketplace">Marketplace</a>
          </li>
        </ul>

        <i class="ri-sun-line">heee</i>


        <Button
        className="border-2 border-orange-400 px-6 py-2 rounded-full text-primary text-semibold hover:bg-orange-400 hover:text-white cursor-pointer transition-all duration-300 "
        >Sign in</Button>
      </div>
    </header>
  );
}

export default Header;
