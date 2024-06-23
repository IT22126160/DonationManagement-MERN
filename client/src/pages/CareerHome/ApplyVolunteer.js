import React, { useState } from "react";
import axios from "axios";
import "./ApplyVolunteer.css";
import { useNavigate } from "react-router-dom";

const ApplyVolunteer = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [image, setImage] = useState(null);
  const [fname, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nid, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("");
  const [work, setWork] = useState("");

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/do7syekzp/image/upload",
        data
      );
      console.log(response);
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
      throw new Error("Error uploading file to Cloudinary");
    }
  };

  const setData = async (e) => {
    e.preventDefault();

    // Validate age and birthday
    if (
      new Date().getFullYear() - new Date(birthday).getFullYear() !==
      parseInt(age)
    ) {
      alert("The age and birthday do not match.");
      return;
    }

    // Validate email
    const emailPattern = /.+\.(com|lk)$/i;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email ending with .com or .lk.");
      return;
    }

    // Check if age is less than 18
    if (parseInt(age) < 18) {
      alert("You must be at least 18 years old to volunteer.");
      navigate("/career"); // Redirect to Career.js page
      return;
    }

    // Check if image is selected
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setIsPending(true);

    try {
      const imageUrl = await uploadFile(image);

      const formData = {
        image: imageUrl,
        fname,
        age,
        gender,
        birthday,
        nid,
        email,
        contact,
        interest,
        work,
      };

      const response = await axios.post(
        "http://localhost:5001/api/apply",
        formData
      );
      console.log(response);
      setSuccessMessage("Volunteer application submitted successfully.");
      setIsPending(false);
      navigate("/CareerHome", { state: { isPending: true } });
    } catch (error) {
      console.error(error);
      setIsPending(false);
      alert("Error submitting volunteer application. Please try again later.");
    }
  };

  return (
    <div className="addForm">
      <h1>Apply as a Volunteer</h1>
      <form onSubmit={setData}>
        Image:
        <br />
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <br />
        Full Name:
        <br />
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        Age:
        <br />
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Enter your age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <br />
        <br />
        Gender:
        <br />
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <label htmlFor="male">Male</label>
        <br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <label htmlFor="female">Female</label>
        <br />
        <br />
        Date Of Birth:
        <br />
        <input
          type="date"
          id="birthday"
          name="birthday"
          onChange={(e) => {
            setBirthday(e.target.value);
          }}
        />
        <br />
        <br />
        NationalId:
        <br />
        <input
          type="text"
          id="nid"
          name="nid"
          placeholder="Enter your national id"
          onChange={(e) => {
            setNationalId(e.target.value);
          }}
        />
        <br />
        <br />
        Email:
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        Contact Number:
        <br />
        <input
          type="text"
          id="contact"
          name="contact"
          required
          pattern="[0-9]{10}"
          title="Please enter a 10-digit number"
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <span className="error" id="errorMessage"></span>
        <br />
        <br />
        Select your interest:
        <br />
        <input
          type="radio"
          id="child_education"
          name="interest"
          value="child_education"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        />
        <label htmlFor="child_education">Child education</label>
        <br />
        <input
          type="radio"
          id="psychological_counselling"
          name="interest"
          value="psychological_counselling"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        />
        <label htmlFor="psychological_counselling">
          Psychological counselling
        </label>
        <br />
        <input
          type="radio"
          id="human_rights_counselling"
          name="interest"
          value="human_rights_counselling"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        />
        <label htmlFor="human_rights_counselling">
          Human rights counselling
        </label>
        <br />
        <input
          type="radio"
          id="legal_counselling"
          name="interest"
          value="legal_counselling"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        />
        <label htmlFor="legal_counselling">Legal counselling</label>
        <br />
        <input
          type="radio"
          id="other"
          name="interest"
          value="other"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        />
        <label htmlFor="other">Other:</label>
        <br />
        <br />
        How long would you like to volunteer? (in months): <br />
        <input
          type="text"
          id="work"
          name="work"
          placeholder="Enter number of months"
          onChange={(e) => {
            setWork(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
      {/* Success message */}
      {successMessage && <p>{successMessage}</p>}
      {/* Pending message */}
      {isPending && <p>Volunteer application is pending...</p>}
    </div>
  );
};

export default ApplyVolunteer;
