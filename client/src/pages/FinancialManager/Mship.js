import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mship() {

  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [otherBank, setOtherBank] = useState("");
  const [nic, setNic] = useState("");
  const [gmail, setGmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate()

  function senddata(e){
    e.preventDefault();

    const newMember = {
      name,
      bank: bank === "other" ? otherBank : bank,
      nic,
      gmail,
      address,
      payment
    }

    axios.post("http://localhost:3000/membership/add",newMember)
    .then(result => {
      navigate('/DisplayMembership')
      console.log(result)})
    
    .catch(err => console.log(err))
    

  }

  return (
    <form style={formStyle} onSubmit={senddata}>
    <h2>MEMBERSHIP PAYMENT FORM</h2>
    <hr />
    <br />

    <label>
      Name:
      <input type="text" id="name" name="name" style={inputStyle} onChange={(e) => { setName(e.target.value);}}/>
    </label>
    <br />

    <label>
      NIC:
      <input type="text" name="nic" style={inputStyle} onChange={(e) => { setNic(e.target.value);}}/>
    </label>
    <br />
    <label>
      Gmail:
      <input type="email" name="gmail" style={inputStyle} onChange={(e) => { setGmail(e.target.value); }}/>
    </label>
    <br />
    <br />
    <label>
      Address:
      <input type="address" name="address" style={inputStyle} onChange={(e) => { setAddress(e.target.value); }}/>
    </label>
    <br />

    <label>
      Payment:
      <input type="text" name="payment" style={inputStyle} onChange={(e) => { setPayment(e.target.value);}}/>
    </label>
    <br />

    <div style={inputContainer}>
      <label style={label}>Select Bank:</label>

      <div style={radioContainer}>
        <input type="radio" id="bank" name="bank" value="HNB"  onChange={(e) => setBank(e.target.value)} />
        <label htmlFor="bank">HNB</label>
      </div>

      <div style={radioContainer}>
        <input type="radio" id="bank" name="bank" value="Peoples Bank"  onChange={(e) => setBank(e.target.value)} />
        <label htmlFor="bank">Peoples Bank</label>
      </div>
      
      <div style={radioContainer}>
        <input type="radio" id="bank" name="bank" value="Sampath Bank" onChange={(e) => setBank(e.target.value)} />
        <label htmlFor="bank">Sampath Bank</label>
      </div>

      <div style={radioContainer}>
        <input type="radio" id="bank" name="bank" value="Commercial Bank" onChange={(e) => setBank(e.target.value)} />
        <label htmlFor="bank">Commercial Bank</label>
      </div>

     

      <div style={radioContainer}>
        <input type="radio" id="bank" name="bank" value="other"  onChange={(e) => setBank(e.target.value)} />
        <label htmlFor="other">Other</label>
          {bank === "other" && (
            <input type="text" placeholder="Enter Bank Name" value={otherBank} onChange={(e) => setOtherBank(e.target.value)} style={{ marginLeft: "10px" }} />
          )}
      </div>
    </div>
    <br />

    <button type="submit" style={buttonStyle}>
      Submit
    </button>
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
const radioContainer = {
  marginBottom: '10px',
};
const inputContainer = {
  marginBottom: '20px',
};
const label = {
  marginBottom: "5px",
  fontSize: "16px",
  color: "#333",
};



export default Mship;