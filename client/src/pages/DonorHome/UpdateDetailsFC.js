import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAccountFC = () => {

    const[isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    
    const {id} = useParams();
    const[fullName,setFullName] = useState('');
    const[email,setEmail]=useState('');
    const[address,setAddress] = useState('');
    const[successMessage,setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5001/donation/getDonation/'+id)
        .then(result => {console.log(result)
            setFullName(result.data.fullName)
            setEmail(result.data.email)
            setAddress(result.data.address)
        })
        .catch(err => console.log(err))
    }, []);

    const updateDetails = (e) => { 
        e.preventDefault();

        const updatedDonor = {
            fullName,
            email,
            address,
        };
        
        axios.put('http://localhost:5001/donation/updateDonation/'+id, updatedDonor)
        .then(() => {
            alert("Donor details updated successfully");
            navigate("/MyDonations/:email");
        }).catch((error) => {
            console.error("Error updating donor  details", error);
            alert("Error updating donor details, please try again.");
        });
    }

    return(
        <div>
            <h1>Update Account Details</h1>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={updateDetails}>
                <label>Full Name : </label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} /><br />
                <label>Email : </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <label>Address : </label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
export default UpdateAccountFC;