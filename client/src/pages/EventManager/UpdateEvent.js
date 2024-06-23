import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const [headline, setheadline] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [venue, setvenue] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const routeParms = useParams(); // Get the event ID from the URL params
  const _id = routeParms.id
  useEffect(()=>{
    console.log('work');
    console.log(routeParms.id);
  },[])

  useEffect(() => {
    const id = routeParms.id;
    axios.get(`http://localhost:5001/event/get/${id}`)
      .then((response) => {
        console.log(response);
        const userData = response.data.data;
        setheadline(userData.headline);
        setdate(userData.date);
        settime(userData.time);
        setvenue(userData.venue);
        setdescription(userData.description);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [routeParms.id]);

  const updateData = (e) => {
    e.preventDefault();
    const updatedEvent = {
      headline,
      date,
      time,
      venue,
      description
    };
    console.log(updatedEvent);

    axios.put(`http://localhost:5001/event/update/${_id}`, updatedEvent)
      .then(() => {
        alert("Event details updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating event details:", error);
        alert("Error updating event details. Please try again.");
      });
  };

  return (
    <div style={{ backgroundColor: "#F8E5D8", padding: "20px" }}>
      <div className="form-container" style={{ backgroundColor: "#F5E8DF", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ color: "#D9853B", textAlign: "center" }}>Event Form</h2>
        <form onSubmit={updateData} id="eventForm">
          <div>
            <label htmlFor="headline" style={{ color: "#D9853B" }}>Headline:</label>
            <input
              type="text"
              id="headline"
              name="headline"
              defaultValue={headline}
              onChange={(e) => {
                setheadline(e.target.value);
              }}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #D9853B" }}
              required
            />
          </div>
          <div>
            <label htmlFor="date" style={{ color: "#D9853B" }}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={date}
              onChange={(e) => {
                setdate(e.target.value);
              }}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #D9853B" }}
              required
            />
          </div>
          <div>
            <label htmlFor="time" style={{ color: "#D9853B" }}>Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              defaultValue={time}
              onChange={(e) => {
                settime(e.target.value);
              }}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #D9853B" }}
              required
            />
          </div>
          <div>
            <label htmlFor="venue" style={{ color: "#D9853B" }}>Venue:</label>
            <input
              type="text"
              id="venue"
              name="venue"
              defaultValue={venue}
              onChange={(e) => {
                setvenue(e.target.value);
              }}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #D9853B" }}
              required
            />
          </div>
          <div>
            <label htmlFor="description" style={{ color: "#D9853B" }}>Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #D9853B" }}
              required
            />
          </div>
          {/* Other input fields */}
          <input type="submit" value="Submit" style={{ backgroundColor: "#D9853B", color: "#FFFFFF", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }} />
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;