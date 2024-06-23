import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import memimg from "./img/mshi.jpg";
import donimg from "./img/don.jpg";

function FinancialManager() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "FinancialManager") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>Financial Manager</h1>
      <div className="container">
        <div
          className="select-box"
          onClick={() => (window.location.href = "DisplayMembership")}
        >
          <img src={memimg} alt="CoachImage" />
          <h3>Membership</h3>
        </div>
        <div
          className="select-box"
          onClick={() => (window.location.href = "DisplayDonation")}
        >
          <img src={donimg} alt="playerImage" />
          <h3>Donation</h3>
        </div>
      </div>
      <style>{`
        // .container {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   margin-top: 50px;
        // }

        .select-box {
          text-align: center;
          cursor: pointer;
          border: 1px solid #eaeaea;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
          width: 200px;
          margin: 20px;
        }

        .select-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .select-box img {
          margin-bottom: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }

        .select-box h3 {
          font-size: 18px;
          margin: 0;
          color: #333;
        }

        h1 {
          text-align: center;
          font-size: 32px;
          margin-bottom: 20px;
          color: #333;
        }
        // .container {
        //   border: 1px solid #ccc;
        //   padding: 20px;
        //   border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default FinancialManager;
