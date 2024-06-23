import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Updatedonation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [nic, setNic] = useState("");
  const [gmail, setGmail] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/donation/${id}`)
        .then(response => {
          const donationid = response.data;
          setName(donationid.name);
          setBank(donationid.bank);
          setNic(donationid.nic);
          setGmail(donationid.gmail);
          setPayment(donationid.payment);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();

    if (!id) {
      console.error("Donation ID is undefined");
      return;
    }

    const updatedDonation = {
      name,
      bank,
      nic,
      gmail,
      payment
    };

    axios.post(`http://localhost:3000/donation/update/${id}`, updatedDonation)
      .then(result => {
        console.log(result);
        navigate('/DisplayDonation');
      })
      .catch(err => console.log(err));
  }

  return (
    <form style={formStyle} onSubmit={handleUpdate}>
      <h2>Update Donation</h2>
      <label htmlFor="name">
        Name:
        <input type="text" id="name" name="name" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label htmlFor="bank">
        Bank:
        <input type="text" id="bank" name="bank" style={inputStyle} value={bank} onChange={(e) => setBank(e.target.value)} />
      </label>
      <br />
      <label htmlFor="nic">
        NIC:
        <input type="text" id="nic" name="nic" style={inputStyle} value={nic} onChange={(e) => setNic(e.target.value)} />
      </label>
      <br />
      <label htmlFor="gmail">
        Gmail:
        <input type="email" id="gmail" name="gmail" style={inputStyle} value={gmail} onChange={(e) => setGmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="payment">
        Payment:
        <input type="text" id="payment" name="payment" style={inputStyle} value={payment} onChange={(e) => setPayment(e.target.value)} />
      </label>
      <br />
      <button type="submit" style={buttonStyle}>Update</button>
    </form>
  );
}

const formStyle = {
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  maxWidth: "400px",
  textAlign: "center",
};

const inputStyle = {
  margin: "10px",
  padding: "5px",
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "3px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
};

export default Updatedonation;