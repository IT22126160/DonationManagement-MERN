import React, { useState, useEffect } from "react";
import './addVolunteer.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddVolunteer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [image, setImage] = useState("");
    const [fname, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [nid, setNationalId] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [interest, setInterest] = useState("");
    const [work, setWork] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setImage(searchParams.get("image"));
        setName(searchParams.get("fname"));
        setAge(searchParams.get("age"));
        setGender(searchParams.get("gender"));
        setBirthday(searchParams.get("birthday"));
        setNationalId(searchParams.get("nid"));
        setEmail(searchParams.get("email"));
        setContact(searchParams.get("contact"));
        setInterest(searchParams.get("interest"));
        setWork(searchParams.get("work"));
    }, [location]);

    const setData = (e) => {
        e.preventDefault();
                                                                                                                                                                                                                                                                                                       
        const newVolunteer = {
            image,
            fname,
            age,
            gender,
            birthday,
            nid,
            email,
            contact,
            interest,
            work
        };

        axios.post("http://localhost:5001/api/addV", newVolunteer)
            .then(() => {
                alert("Volunteer added successfully");
                navigate("/AllVolunteers");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className="header">
            <div className="addForm">
                <h1>Add a Volunteer</h1>
                <form onSubmit={setData}>
                    <div className="image-container">
                        <img src={image} alt="Volunteer" className="volunteer-image" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="fname">Full Name:</label>
                        <input type="text" id="fname" name="fname" value={fname} readOnly />

                        <label htmlFor="age">Age:</label>
                        <input type="text" id="age" name="age" value={age} readOnly />

                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" name="gender" value={gender} readOnly />

                        <label htmlFor="birthday">Date Of Birth:</label>
                        <input type="text" id="birthday" name="birthday" value={birthday} readOnly />

                        <label htmlFor="nid">NationalId:</label>
                        <input type="text" id="nid" name="nid" value={nid} readOnly />

                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" value={email} readOnly />

                        <label htmlFor="contact">Contact Number:</label>
                        <input type="text" id="contact" name="contact" value={contact} readOnly />

                        <label htmlFor="interest">Interest:</label>
                        <input type="text" id="interest" name="interest" value={interest} readOnly />

                        <label htmlFor="work">Work:</label>
                        <input type="text" id="work" name="work" value={work} readOnly />

                        <button type="submit" className="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVolunteer;