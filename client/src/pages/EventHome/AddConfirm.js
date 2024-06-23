import React, { useState } from "react";
import Axios from "axios";

export default function AddConfirm() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [time, settime] = useState("");


  // Validation functions
  const validatePhoneNumber = (number) => {
    const phonePattern = /^\d{10}$/; // Enter valid 10-digit number
    return phonePattern.test(number);
  };

  const validateEmail = (email) => {
    const emailPattern = /.+\.(com|lk)$/i; // Ends with .com or .lk
    return emailPattern.test(email);
  };

  function sendData(e) {
    e.preventDefault();

    // Validate phone number and email before sending data
    if (!validatePhoneNumber(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email ending with .com or .lk.");
      return;
    }

    const newConfirm = {
      name,
      phone,
      email,
      time,
    };

    Axios.post("http://localhost:5001/confirm/addconfirm", newConfirm)
      .then(() => {
        alert("Confirmation Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div style={{ backgroundColor: "#F8E5D8", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#F5E8DF",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "#D9853B", textAlign: "center" }}>
          Confirmation Form
        </h2>
        <form onSubmit={sendData} id="eventForm">
          <div>
            <label htmlFor="name" style={{ color: "#D9853B" }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => {
                setname(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #D9853B",
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" style={{ color: "#D9853B" }}>
              Phone:
            </label>
            <input
              type="string"
              id="phone"
              name="phone"
              onChange={(e) => {
                setphone(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #D9853B",
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="email" style={{ color: "#D9853B" }}>
              Email:
            </label>
            <input
              type="string"
              id="email"
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #D9853B",
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="time" style={{ color: "#D9853B" }}>
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              onChange={(e) => {
                settime(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #D9853B",
              }}
              required
            />
          </div>

          <input
            type="submit"
            value="Submit"
            style={{
              backgroundColor: "#D9853B",
              color: "#FFFFFF",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
    </div>
  );
}
