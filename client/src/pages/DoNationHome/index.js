import React from "react";
import image2 from "../../assets/h2.jpg";
import image3 from "../../assets/h3.jpg";
import image4 from "../../assets/h4.jpg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function DoNationHome() {
  const navigate = useNavigate();
  return (
    <div className="p-3 gap-3">
      <div>
        <br />

        <i>
          <b>
            <span className="flex justify-center text-6xl items-center p-5 text-orange-800 ">
              {" "}
              Charity Management System
            </span>
          </b>
        </i>
        <br />
        <br />
        <br />
      </div>

      <div className="flex justify-between p-4 margin-3">
        <img src={image2} className="w-1/3 h-full p-3" />
        <div className="p-5">
          <h1 className="text-2xl text-primary">
            What is Charity Management System?
          </h1>{" "}
          <br />
          <p>
            A charity management system is a software solution for a nonprofit
            organization. It manages the charitable donations and also the donor
            base. Such a system includes features such as electronic fund
            transfer, donation management, fundraising, donor management, and
            event management.
          </p>
          <br />
          <h2>
            There are certain key features that these systems offer to
            nonprofits:
          </h2>
          <br />
          <p>• Easily track donations and donors.</p>
          <br />
          <p> • Send gift messages to donors.</p>
          <br />
          <p>• Set up recurring payment plans.</p>
          <br />
          <p>• Get reports on their donations.</p>
          <br />
        </div>
      </div>
      <br />
      <br />
      

      <div>
        <div className="flex justify-between p-4 margin-3">
          <div>
            <h1 className="text-2xl text-primary">
              Benefits the Use of Charity Management System
            </h1>{" "}
            <br />
            <p className="p-5">
              A charity management system is a specialized software designed for
              organizations to automate the process of managing their donor
              relations, fundraising campaigns, and overall financial
              operations. It can also be used to create reports on how well an
              organization is meeting its goals. These systems are designed to
              be user-friendly and flexible in order to serve the needs of
              various types of nonprofits. Some features that are often included
              in these systems are databases for storing information about
              donors, volunteers, events, products, pledges etc., customizable
              reporting tools for generating customized reports on fundraising
              progress etc., online donation processing system for accepting
              cash donations etc. These management systems have benefited
              nonprofits in a variety of ways including making it easier for
              organizations to track their progress towards goals and save time
              by automating manual processes.
            </p>
          </div>

          <img src={image3} className="w-1/2 h-full p-3" />
        </div>
      </div>

      <br />
      <br />
      <br />

      <div>
        <div className="flex justify-between p-3 margin-3">
          <img src={image4} className="w-1/2 h-full p-2" />

          <div>
            <h1 className="text-2xl text-primary">DoNation Marketplace</h1>{" "}
            <br />
            <p className="p-5">
              DoNation is a charity management system that features a
              marketplace for users to sell items or products. Users can add
              items, add images, update product details, and place bids. Buyers
              can buy these products and place bids, with sellers contacting the
              buyer if interested. Users can view their profile, search for
              products, filter by type and age group, and receive notifications
              when items are added or bids are placed. The marketplace manager
              checks all products and manages users. Additionally, a
              notification system is in place to inform the marketplace manager
              when an item is added or a bid is placed.
            </p>
            <br />
            <div className="items-center">
              <Button
                onClick={() => {
                  navigate("/marketplace");
                }}
              >
                View Marketplace
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button
          className="color bg-orange-400"
          onClick={() => {
            navigate("/DonorHome");
          }}
        >
          Let's start
        </Button>
      </div>
    </div>
  );
}

export default DoNationHome;
