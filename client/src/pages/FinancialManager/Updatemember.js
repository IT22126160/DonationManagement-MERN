import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Updatemember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [nic, setNic] = useState("");
  const [gmail, setGmail] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/membership/${id}`)
        .then(response => {
          const membershpid = response.data;
          setName(membershpid.name);
          setBank(membershpid.bank);
          setNic(membershpid.nic);
          setGmail(membershpid.gmail);
          setPayment(membershpid.payment);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();

    if (!id) {
      console.error("Membership ID is undefined");
      return;
    }

    const updatedMember = {
      name,
      bank,
      nic,
      gmail,
      payment
    };

    axios.post(`http://localhost:5001/membership/update/${id}`, updatedMember)
      .then(result => {
        console.log(result);
        navigate('/DisplayMembership');
      })
      .catch(err => console.log(err));
  }

  return (
    <form style={formStyle} onSubmit={handleUpdate}>
      <h2>Update Membership</h2>
      <label>
        Name:
        <input type="text"  id="name" name="name" style={inputStyle} onChange={(e)=>{
          setName(e.target.value);
        }}/>
      </label>
      <br />
      <label>
        Bank:
        <input type="text" name="bank" style={inputStyle} onChange={(e)=>{
          setBank(e.target.value);
        }}/>
      </label>
      <br />
      <label>
        NIC:
        <input type="text" name="nic" style={inputStyle} onChange={(e)=>{
          setNic(e.target.value);
        }}/>
      </label>
      <br />
      <label>
        Gmail:
        <input type="email" name="gmail" style={inputStyle} value={gmail} onChange={(e)=>{
          setGmail(e.target.value);
        }}/>
      </label>
      <br />
      <label>
        Payment:
        <input type="text" name="payment" style={inputStyle} onChange={(e)=>{
          setPayment(e.target.value);
        }}/>
      </label>
      <br />
      <button type="update" style={buttonStyle}>Update</button>
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

  

export default Updatemember;