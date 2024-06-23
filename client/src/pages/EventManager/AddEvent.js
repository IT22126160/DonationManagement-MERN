import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const [headline, setHeadline] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [isDateValid, setIsDateValid] = useState(true);

  const navigate = useNavigate();

  const validateDate = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);

    // Ensure the event date is after today. If the date not an upcomming date the form will not submit.
    return eventDate > today;
  };

  const sendData = (e) => {
    e.preventDefault();

    if (!validateDate(date)) {
      setIsDateValid(false);
      return;
    }

    const newEvent = {
      headline,
      image,
      date,
      time,
      venue,
      description,
    };

    const formData = new FormData();
    formData.append("headline", newEvent.headline);
    formData.append("image", newEvent.image);
    formData.append("date", newEvent.date);
    formData.append("time", newEvent.time);
    formData.append("venue", newEvent.venue);
    formData.append("description", newEvent.description);

    Axios.post("http://localhost:5001/event/add", newEvent, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(response);
        alert("Event Added");
        navigate("/allevent");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div style={{ backgroundColor: "#F8E5D8", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#F5E8DF",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "#D9853B", textAlign: "center" }}>Event Form</h2>
        <form onSubmit={sendData} id="eventForm">
          <div>
            <label htmlFor="headline" style={{ color: "#D9853B" }}>
              Headline:
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              onChange={(e) => setHeadline(e.target.value)}
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
            <label htmlFor="image" style={{ color: "#D9853B" }}>
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #D9853B",
              }}
              // required
            />
          </div>

          <div>
            <label htmlFor="date" style={{ color: "#D9853B" }}>
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(e) => {
                const dateValue = e.target.value;
                setDate(dateValue);
                setIsDateValid(validateDate(dateValue));
              }}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #D9853B",
              }}
              required
            />
            {!isDateValid && (
              <div style={{ color: "red" }}>
                The event date must be after today.
              </div>
            )}
          </div>

          <div>
            <label htmlFor="time" style={{ color: "#D9853B" }}>
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              onChange={(e) => setTime(e.target.value)}
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
            <label htmlFor="venue" style={{ color: "#D9853B" }}>
              Venue:
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              onChange={(e) => setVenue(e.target.value)}
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
            <label htmlFor="description" style={{ color: "#D9853B" }}>
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
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
