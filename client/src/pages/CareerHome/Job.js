import React , {useState} from "react";

export default function Job(){

    return(
        <div className="addForm">
        <h1>Apply For a Job</h1>
        <form>
         Full Name:<br/>
         <input type="text" id="fname" name="fname" placeholder="Enter your name"></input><br/><br/>

         Age:<br/>
         <input type="text" id="age" name="age" placeholder="Enter your age"></input><br/><br/>

         Gender:<br/>
         <input type="radio" id="male" name="gender" value="Male"></input>
         <label for="male">Male</label><br/>

         <input type="radio" id="female" name="gender" value="Female"></input>
         <label for="female">Female</label><br/><br/>

         NationalId:<br/>
         <input type="text" id="nid" name="nid" placeholder="Enter your national id"></input><br/><br/>

         Email:<br/>
         <input type="email" id="email" name="email" placeholder="Enter your email"></input><br/><br/>

         Date Of Birth:<br/>
         <input type="date" id="birthday" name="birthday"></input><br/><br/>

         Contact Number:<br/>
         <input type="text" id="contact" name="contact" required pattern="[0-9]{10}" title="Please enter a 10-digit number"></input>
         <span class="error" id="errorMessage"></span><br/><br/>
        
         Select your interest:<br/>
         
            <input type="radio" id="digital_Marketing" name="digital_Marketing"  value="digital_Marketing"></input>
            <label for="digital_Marketing">Digital Marketing</label>
            <br/>
            <input type="radio" id="sm_Marketing" name="sm_Marketing" value="sm_Marketing"></input>
            <label for="sm_Marketing">Social Media Marketing</label>
            <br/>
            <input type="radio" id="c_Writing" name="ic_Writing" value="c_Writing"></input>
            <label for="c_Writing">Content Writing</label>
            <br/>
            <input type="radio" id="fandI" name="ifandI" value="fandI"></input>
            <label for="fandI">Fundraising and Influencing</label>
            <br/>
            <input type="radio" id="v_Management" name="v_Management"></input>
            <label for="v_Management">Volunteer Management</label>
            <br/>
            <input type="radio" id="b_Assistance" name="b_Assistance" value="b_Assistance"></input>
            <label for="b_Assistance">Brand Assistance</label>
            <br/>
            <input type="radio" id="m_Design" name="m_Design" value="m_Design"></input>
            <label for="m_Design">Multimedia Design</label>
            <br/><br/>
         
        Job Type:<br/>
        <input type="radio" id="full" name="full" value="fullTime"></input>
         <label for="fullTime">Full Time</label><br/>

         <input type="radio" id="part" name="part" value="partTime"></input>
         <label for="partTime">Part Time</label><br/><br/>

        
         <button type="submit" class="btn btn-primary">Submit</button>


        
        </form>

     </div>
    )
}