import React from "react";
import "./career.css";
import { useNavigate } from "react-router-dom";
import volunteeringImage from "../CareerHome/images/volunteeringMain.jpg";
import { useLocation } from "react-router-dom";

export default function Career() {
  const navigate = useNavigate();

  const location = useLocation();
  const { isPending } = location.state || false;

  // Function to handle sharing via WhatsApp
  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      "Apply for volunteering, internships, and jobs at DoNations!"
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${message} ${url}`);
  };

  // Function to handle sharing via Facebook
  const shareViaFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  // Function to handle sharing via Instagram
  const shareViaInstagram = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.instagram.com/?url=${url}`);
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div></div>
      <div className="career-container ">
        <div className="flex justify-center ">
          <img src={volunteeringImage} alt="Volunteering" />
        </div>

        <div className="vHeader">
          <h1>Volunteering & Career</h1>
        </div>
        <h2>"Transforming Futures: Join Our Community of Purpose"</h2>
      </div>
      <div className="middle">
        <div className="left-side">
          <h3>Working with us</h3>
          <div className="paragraph">
            <p>
              Developing the worthy communities in rural Sri Lanka and
              connecting with like-minded individuals from around the globe are
              the main goals of volunteering at DoNations. You can also explore
              your humanitarian side. We use volunteers for real administrative
              work, in contrast to larger organizations, giving them a more
              involved and practical experience. Working at DoNations can also
              help you stand out during interviews because companies are always
              looking for individuals who share their interests in social
              responsibility.
            </p>
          </div>
          <h3>Internships</h3>
          <div className="paragraph">
            <p>
              Internships should be the starting point for anyone interested in
              pursuing a career in nonprofit work or social work as a field of
              study. We provide on-the-job and digital training to interns from
              different universities across the globe. Throughout the year, we
              provide the following internship opportunities for nonprofit
              capacity building:
              <br />
              <br />
              1. Governance and management: coordination, project management,
              office administration, and operations
              <br />
              2. Project-Based: drafting grants, keeping track of and evaluating
              them, and communicating with stakeholders
              <br />
              3. Organizational development: cultivating relationships with
              donors, public relations, and fundraising
              <br />
              4. Fieldwork: carrying out projects, analyzing beneficiaries,
              determining feasibility, establishing baselines, assessing
              impacts, and keeping track of
              <br />
            </p>
            <button
              className="internship-button"
              onClick={() => navigate("/Internship")}
            >
              APPLY FOR INTERNSHIP
            </button>
            <button className="Share-button" onClick={shareViaWhatsApp}>
              Share via WhatsApp
            </button>
            <button className="Share-button" onClick={shareViaFacebook}>
              Share via Facebook
            </button>
            <button className="Share-button" onClick={shareViaInstagram}>
              Share via Instagram
            </button>
          </div>
        </div>
        <div className="right-side">
          <h3>Job opportunities</h3>
          <div className="paragraph-right">
            <p>
              Join our dynamic team dedicated to making a positive impact! As a
              Charity Management System professional, you'll play a key role in
              program development, fundraising, and volunteer coordination.
              Contribute to meaningful initiatives, collaborate with diverse
              teams, and make a difference in the community. This role offers
              hands-on experience in the nonprofit sector, fostering personal
              and professional growth. Embrace the opportunity to be part of
              something purposeful.
              <br />
              <br />
              1. SEO
              <br />
              2. Digital Marketing
              <br />
              3. Social Media Marketing
              <br />
              4. Content Writing
              <br />
              5. Fundraising and Influencing
              <br />
              6. Volunteer Management
              <br />
              7. Brand Assistance
              <br />
              8. Multimedia Design
              <br />
            </p>
            <button className="job-button" onClick={() => navigate("/Job")}>
              APPLY FOR A JOB
            </button>
            <button className="Share-button" onClick={shareViaWhatsApp}>
              Share via WhatsApp
            </button>
            <button className="Share-button" onClick={shareViaFacebook}>
              Share via Facebook
            </button>
            <button className="Share-button" onClick={shareViaInstagram}>
              Share via Instagram
            </button>
          </div>
          <h3>Volunteer</h3>
          <div className="paragraph-right">
            <p>
              Encourage active field volunteering in our Charity Management
              System to uplift the brains of young people. Educate students in a
              variety of disciplines, impart inspirational stories, and develop
              soft skills. Encourage creativity via sports, music, and the arts
              while developing skills. Introduce fresh interests and provide
              useful knowledge. Encourage youngsters to plant trees as a way to
              raise awareness of environmental issues. Come along as we
              collectively create memorable experiences and build a better
              future.
              <br />
              <br />
              1.Child education
              <br />
              2.Psychological counselling
              <br />
              3.Human rights counselling
              <br />
              4.Legal counselling or any Other
              <br />
            </p>
            <button
              className="volunteer-button"
              onClick={() => navigate("/ApplyVolunteer")}
            >
              APPLY FOR VOLUNTEER
            </button>

            {isPending && <p>Your volunteer application is pending...</p>}
            <button className="Share-button" onClick={shareViaWhatsApp}>
              Share via WhatsApp
            </button>
            <button className="Share-button" onClick={shareViaFacebook}>
              Share via Facebook
            </button>
            <button className="Share-button" onClick={shareViaInstagram}>
              Share via Instagram
            </button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
