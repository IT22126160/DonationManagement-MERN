import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import reqimg from "../CRhome/img/req.jpg";

function CRmanager() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "CRmanager") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <header className="header">
        <h1 className="logo">Customer Request Manager</h1>
      </header>
      <div className="container">
        <div
          className="select-box"
          onClick={() => (window.location.href = "Displayform")}
        >
          <img src={reqimg} alt="reqimg" />
          <h3>REQUESTS</h3>
        </div>
      </div>
      <style>{`
        /* Header Styles */
        .header {
          background-color: #FFA500; /* Orange background */
          padding: 20px; 
          text-align: center;
          color: #FFF; /* White text color */
        }

        .logo {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }

        /* Container Styles */
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
        }

        /* Select Box Styles */
        .select-box {
          text-align: center;
          cursor: pointer;
          border: 2px solid #FFA500; /* Orange border */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
          width: 200px;
          margin: 20px;
          background-color: #FFF; /* White background */
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
          color: #333; /* Dark text color */
        }
      `}</style>
    </div>
  );
}

export default CRmanager;
