import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateForm() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [request, setRequest] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/customer/${id}`)
            .then(result => {console.log(result)
                setName(result.data.name);
                setAddress(result.data.address);
                setNic(result.data.nic);
                setRequest(result.data.request);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();

        const newCustomer = {
            name,
            address,
            nic,
            request
        };

        axios.put(`http://localhost:5001/customer/update/${id}`, newCustomer)
            .then(result => {
                navigate('/displayform');
                console.log(result);
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={container}>
            <h1 style={heading}>UPDATE REQUEST FORM</h1>
            <hr style={hr} /><br />
            <form style={form} onSubmit={update}>
                <div style={inputContainer}>
                    <label htmlFor="name" style={label}>Name:</label>
                    <input type="text" id="name" style={input} value={name} onChange={(e) => setName(e.target.value)} />
                </div><br />
                <div style={inputContainer}>
                    <label htmlFor="address" style={label}>Address:</label>
                    <input type="text" id="address" style={input} value={address} onChange={(e) => setAddress(e.target.value)} />
                </div><br />
                <div style={inputContainer}>
                    <label htmlFor="nic" style={label}>ID Number:</label>
                    <input type="text" id="nic" style={input} value={nic} onChange={(e) => setNic(e.target.value)} />
                </div><br />
                <div style={inputContainer}>
                    <label htmlFor="request" style={label}>Customer Request:</label>
                    <input type="text" id="request" style={input} value={request} onChange={(e) => setRequest(e.target.value)} />
                </div><br />
                <button type="submit" style={button}>Update</button>
            </form>
        </div>
    );
}

const container = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const heading = {
    textAlign: 'center',
    marginBottom: '20px',
};

const hr = {
    border: 'none',
    borderBottom: '1px solid #ddd',
    margin: '20px 0',
};

const form = {
    display: 'flex',
    flexDirection: 'column',
};

const inputContainer = {
    marginBottom: '15px',
};

const label = {
    marginBottom: '5px',
    fontSize: '16px',
};

const input = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const button = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
};