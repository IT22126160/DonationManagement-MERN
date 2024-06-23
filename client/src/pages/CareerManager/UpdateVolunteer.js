import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateVolunteer.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVolunteer = () => {
//   const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  
  const { nid } = useParams(); // Get the volunteer ID from the URL params

  const [fname, setFname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("");
  const [work, setWork] = useState("");

  useEffect(() => {
    // Fetch the volunteer details based on the ID
    axios.get(`http://localhost:5001/api/get/${nid}`)
      .then((response) => {
        const userData = response.data.user;
        setFname(userData.fname);
        setAge(userData.age);
        setGender(userData.gender);
        setBirthday(userData.birthday);
        setEmail(userData.email);
        setContact(userData.contact);
        setInterest(userData.interest);
        setWork(userData.work);
       
      })
      .catch((error) => {
        console.error("Error fetching volunteer details:", error);
      });
  }, [nid]);

  const updateData = (e) => {
    e.preventDefault();

    const updatedVolunteer = {
      fname,
      age,
      gender,
      birthday,
      email,
      contact,
      interest,
      work
    };

    axios.put(`http://localhost:5001/api/updateV/${nid}`, updatedVolunteer)
      .then(() => {
        alert("Volunteer details updated successfully");
        navigate("/AllVolunteers");
      })
      .catch((error) => {
        console.error("Error updating volunteer details:", error);
        alert("Error updating volunteer details. Please try again.");
      });
  };

  return (
    <div className="container">
      <h2 id="topic">Update Volunteer Details</h2>
      <form onSubmit={updateData} className="cform">

                Full Name:<br />
                <input type="text" id="fname" name="fname" placeholder="Enter your name"
                    value={fname}
                    onChange={(e) => {
                        setFname(e.target.value);
                    }} /><br /><br />

                Age:<br />
                <input type="text" id="age" name="age" placeholder="Enter your age"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                    }} /><br /><br />

                Gender:<br />
                <input type="radio" id="male" name="gender" value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }} />
                <label htmlFor="male">Male</label><br />

                <input type="radio" id="female" name="gender" value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }} />
                <label htmlFor="female">Female</label><br /><br />

                Date Of Birth:<br />
                <input type="date" id="birthday" name="birthday"
                    value={birthday}
                    onChange={(e) => {
                        setBirthday(e.target.value);
                    }} /><br /><br />


                Email:<br />
                <input type="email" id="email" name="email" placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }} /><br /><br />

                Contact Number:<br />
                <input type="text" id="contact" name="contact"
                    value={contact}
                    onChange={(e) => {
                        setContact(e.target.value);
                    }} /><br /><br />

                Select your interest:<br />

                <input type="radio" id="child_education" name="interest" value="child_education"
                    checked={interest === "child_education"}
                    onChange={(e) => {
                        setInterest(e.target.value);
                    }} />
                <label htmlFor="child_education">Child education</label>
                <br />
                <input type="radio" id="psychological_counselling" name="interest" value="psychological_counselling"
                    checked={interest === "psychological_counselling"}
                    onChange={(e) => {
                        setInterest(e.target.value);
                    }} />
                <label htmlFor="psychological_counselling">Psychological counselling</label>
                <br />
                <input type="radio" id="human_rights_counselling" name="interest" value="human_rights_counselling"
                    checked={interest === "human_rights_counselling"}
                    onChange={(e) => {
                        setInterest(e.target.value);
                    }} />
                <label htmlFor="human_rights_counselling">Human rights counselling</label>
                <br />
                <input type="radio" id="legal_counselling" name="interest" value="legal_counselling"
                    checked={interest === "legal_counselling"}
                    onChange={(e) => {
                        setInterest(e.target.value);
                    }} />
                <label htmlFor="legal_counselling">Legal counselling</label>
                <br />
                <input type="radio" id="other" name="interest" value="other"
                    checked={interest === "other"}
                    onChange={(e) => {
                        setInterest(e.target.value);
                    }} />
                <label htmlFor="other">Other:</label><br /><br />

                How long would you like to volunteer? (in months): <br />
                <input type="text" id="work" name="work" placeholder="Enter number of months"
                    value={work}
                    onChange={(e) => {
                        setWork(e.target.value);
                    }} /><br /><br />

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ff4d00', color: 'white' }} >Update</button>
      </form>
    </div>
  );
};

export default UpdateVolunteer;