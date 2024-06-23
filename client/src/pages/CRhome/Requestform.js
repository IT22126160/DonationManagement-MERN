import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Requestform() {
  const [idd, setIdd] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [requestType, setRequestType] = useState("");
  const [want, setWant] = useState("");
  const [cash, setCash] = useState(""); // New state for cash
  const [item, setItem] = useState(""); // New state for item
  const [request, setRequest] = useState("");
  const [existingNicNumbers, setExistingNicNumbers] = useState([]);
  const [submittedCustomers, setSubmittedCustomers] = useState([]);
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    },
    heading: {
      textAlign: "center",
      fontSize: "24px",
      marginBottom: "20px",
    },
    hr: {
      marginBottom: "20px",
    },
    form: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
    },
    inputContainer: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    radioContainer: {
      marginBottom: "10px",
    },
    button: {
      display: "block",
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  function senddata(e) {
    e.preventDefault();

    if (existingNicNumbers.includes(nic)) {
      alert("This ID number already exists. Please enter a different one.");
      return;
    }

    const newCustomer = {
      idd,
      name,
      address,
      nic,
      requestType,
      want,
      cash: want === "cash" ? cash : "", // Conditionally set cash
      item: want === "item" ? item : "", // Conditionally set item
      request
    };

    axios.post("http://localhost:3000/customer/add", newCustomer)
    .then(result => {
      setSubmittedCustomers([...submittedCustomers, newCustomer]);
      navigate(`CustomerDetails`)
      alert("Customer Added successfully"); // Add new customer
      console.log(result);
    })
    .catch(err => console.log(err));
}

  useEffect(() => {
    axios.get("http://localhost:3000/customer/add")
      .then(response => {
        const nicNumbers = response.data.map(customer => customer.nic);
        setExistingNicNumbers(nicNumbers);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>CUSTOMER REQUEST FORM</h1>
      <hr style={styles.hr} />

      <form style={styles.form} onSubmit={senddata}>

      <div style={styles.inputContainer}>
          <label htmlFor="idd" style={styles.label}>IDD:</label>
          <input type="text" id="idd" name="idd" style={styles.input} value={idd} onChange={(e) => setIdd(e.target.value)} />
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input type="text" id="name" name="name" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="address" style={styles.label}>Address:</label>
          <input type="text" id="address" name="address" style={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="nic" style={styles.label}>ID Number:</label>
          <input type="text" id="nic" name="nic" style={styles.input} value={nic} onChange={(e) => setNic(e.target.value)} />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Select Request Type:</label>

          <div style={styles.radioContainer}>
            <input type="radio" id="school" name="requestType" value="School helping" checked={requestType === "School helping"} onChange={(e) => setRequestType(e.target.value)} />
            <label htmlFor="school">School helping</label>
          </div>

          <div style={styles.radioContainer}>
            <input type="radio" id="person" name="requestType" value="Person helping" checked={requestType === "Person helping"} onChange={(e) => setRequestType(e.target.value)} />
            <label htmlFor="person">Person helping</label>
          </div>

          <div style={styles.radioContainer}>
            <input type="radio" id="children" name="requestType" value="Children helping" checked={requestType === "Children helping"} onChange={(e) => setRequestType(e.target.value)} />
            <label htmlFor="children">Children helping</label>
          </div>

          <div style={styles.radioContainer}>
            <input type="radio" id="other" name="requestType" value="Other" checked={requestType === "Other"} onChange={(e) => setRequestType(e.target.value)} />
            <label htmlFor="other">Other</label>
          </div>
        </div>


        <div style={styles.inputContainer}>
          <label style={styles.label}>What You Want:</label>

          <div style={styles.radioContainer}>
            <input type="radio" id="cash" name="want" value="cash" checked={want === "cash"} onChange={(e) => setWant(e.target.value)} />
            <label htmlFor="cash">Cash</label>
            {want === "cash" && (
              <input type="text" placeholder="Enter Amount" value={cash} onChange={(e) => setCash(e.target.value)} style={{ marginLeft: "10px" }} />
            )}
          </div>

          <div style={styles.radioContainer}>
            <input type="radio" id="item" name="want" value="item" checked={want === "item"} onChange={(e) => setWant(e.target.value)} />
            <label htmlFor="item">Item</label>
            {want === "item" && (
              <input type="text" placeholder="Enter quantity" value={item} onChange={(e) => setItem(e.target.value)} style={{ marginLeft: "10px" }} />
            )}
          </div>
        </div>


        <div style={styles.inputContainer}>
          <label htmlFor="request" style={styles.label}>Customer Request:</label>
          <textarea id="request" name="request" rows="4" style={styles.textarea} value={request} onChange={(e) => setRequest(e.target.value)}></textarea>
        </div>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}