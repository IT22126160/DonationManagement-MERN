import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAccount = () => {

    const[isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    
    const {id} = useParams();
    const[fullName,setFullName] = useState('');
    const[email,setEmail]=useState('');
    const[address,setAddress] = useState('');
    const[donationType,setDonationType] = useState('');
    const[amount,setAmount]=useState('');
    const[itemName,setItemName] = useState('');
    const[quantity,setQuantity] = useState('');
    const[successMessage,setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5001/donation/getDonation/'+id)
        .then(result => {console.log(result)
            setFullName(result.data.fullName)
            setEmail(result.data.email)
            setAddress(result.data.address)
            setDonationType(result.data.donationType)
            setAmount(result.data.amount)
            setItemName(result.data.itemName)
            setQuantity(result.data.quantity)
        })
        .catch(err => console.log(err))
    }, []);

    const updateDetails = (e) => { 
        e.preventDefault();

        const updatedDonor = {
            itemName,
        };
        
        axios.put('http://localhost:5001/donation/updateDonation/'+id, updatedDonor)
        .then(() => {
            alert("Donor details updated successfully");
            navigate("/DonationManager");
        }).catch((error) => {
            console.error("Error updating donor  details", error);
            alert("Error updating donor details, please try again.");
        });
    }

    return(
        <div className="container">
            <h1 className="align-middle">Update Account Details</h1>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={updateDetails} className="border p-4">
                <div className="col-md-6">
                    <label className="form-label">Full Name : </label>
                    <input type="text" value={fullName} className="form-control"  /><br />
                </div>
                <div className="col-md-6">
                <label className="form-label">Email : </label>
                <input type="email" value={email} className="form-control"/><br />
                </div>
                <div className="col-md-6">
                <label className="form-label">Address : </label>
                <input type="text" value={address} className="form-control"/><br />
                </div>
                <div>
                    <label> Donation Type : </label><br/>
                    <input type="radio" value="cash" checked={donationType === 'cash'} onChange={(e) => setDonationType(e.target.value)}/>Cash<br/>
                    <input type="radio" value="items" checked={donationType === 'items'} onChange={(e) => setDonationType(e.target.value)}/>Items<br/>
                </div>
                <div>
                    {donationType === 'cash' && (
                        <div className="col-md-6">
                            <label>Amount:</label>
                            <input type="number" value={amount}/>
                        </div>
                    )}

                    {donationType === 'items' && (
                        <div className="col-md-6">
                            <label>Item name:</label>
                            <input type="text" value={itemName} className="form-control" onChange={(e) => setItemName(e.target.value)}/>
                            <br />
                            <label>Quantity of item:</label>
                            <input type="number" value={quantity} className="form-control"/>
                            <br />
                        </div>
                    )}
                </div>
                <button type="submit" style={{ backgroundColor: 'orange', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
                <button onClick={() => navigate('/AllDonations')} style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <div style={{ fontWeight: 'bold', color: 'red', marginTop: '10px' }}>If Item name is not in plural form please convert item name to plural form</div>
            </form>
        </div>
    );
}
export default UpdateAccount;