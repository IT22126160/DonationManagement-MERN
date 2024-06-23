import React , {useState} from "react";


export default function Internship(){

    return(
        <div>
            <div>
            </div>
            <div className="addForm">
                <h1>Apply For Internships</h1>
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
                
                    <input type="radio" id="research_internship" name="interest" value="child_education"></input>
                    <label for="child_education">Research internship</label>
                    <br/>
                    <input type="radio" id="field_internship" name="interest" value="psychological_counselling"></input>
                    <label for="psychological_counselling">Field internship</label>
                    <br/>
                    <input type="radio" id="management_internship" name="interest" value="human_rights_counselling"></input>
                    <label for="human_rights_counselling">Management internship</label>
                    <br/>
                    <input type="radio" id="other" name="interest" value="other"></input>
                    <label for="other">Other:</label><br/><br/>

                Job Type:<br/>
                <input type="radio" id="full" name="full" value="fullTime"></input>
                <label for="fullTime">Full Time</label><br/>

                <input type="radio" id="part" name="part" value="partTime"></input>
                <label for="partTime">Part Time</label><br/><br/>

                How long would you like to intern? (in months): <br/>
                <input type="text" id="work" name="work" placeholder="Enter number of months"></input><br/><br/>

                <button type="submit" class="btn btn-primary">Submit</button>


        
            </form>

     </div>
     <div>
     </div>
        </div>
    )
}