import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function DonationForm() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [donationType, setDonationType] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [payment, setPayment] = useState(0.0);
    const [img, setImg] = useState(null);

    async function setData(e) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!fullName || !email || !address) {
            alert('Please fill out all required fields.');
            return;
        }

        if (donationType === 'items' && (!itemName || !quantity)) {
            alert('Please fill out item name and quantity for items donation.');
            return;
        }

        if (donationType === 'cash' && (!payment || isNaN(payment) || payment <= 0 || !img)) {
            alert('Please enter a valid payment amount and upload an image for cash donation.');
            return;
        }

        let imgUrl = null;
        if (img) {
            const data = new FormData();
            data.append("file", img);
            data.append("upload_preset", "images_preset");

            const res = await axios.post("https://api.cloudinary.com/v1_1/dlxtpfi3n/image/upload", data);
            imgUrl = res.data.secure_url;
        }

        const newDonation = {
            fullName,
            email,
            address,
            donationType,
            payment: donationType === 'cash' ? payment : 0, // Set payment based on donationType
            imgUrl,
            itemName: donationType === 'items' ? itemName : null, // Set itemName based on donationType
            quantity: donationType === 'items' ? quantity : null, // Set quantity based on donationType
        };

        axios.post("http://localhost:8000/donation/addDonation", newDonation)
            .then(() => {
                alert("Donation added successfully");
                navigate(`/MyDonation/${email}`);
            })
            .catch((err) => {
                alert("Error adding donation: " + err.message);
                console.error("Error adding donation:", err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={setData} action="" className="border p-4">
                <h2 className="align-middle">Add Your Donation</h2>
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">Full Name : </label>
                    <input type="text" placeholder="Enter your full name" className="form-control" onChange={(e) => setFullName(e.target.value)}  aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">Email : </label>
                    <input type="email" placeholder="Enter your email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">Address : </label>
                    <input type="text" placeholder="Enter your address" className="form-control" onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="donationType"> Donation Type : </label><br/>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="cashDonation"
                            name="donationType"
                            value="cash"
                            checked={donationType === 'cash'}
                            className="form-check-input"
                            onChange={(e) => setDonationType(e.target.value)}
                        />
                        <label htmlFor="cashDonation" className="form-check-label">Cash</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="itemDonation"
                            name="donationType"
                            value="items"
                            checked={donationType === 'items'}
                            className="form-check-input"
                            onChange={(e) => setDonationType(e.target.value)}
                        />
                        <label htmlFor="itemDonation" className="form-check-label">Items</label>
                    </div>
                </div>
                <div>
                    {donationType === 'cash' && (
                        <div className="col-md-6">
                            <label htmlFor="">Enter Amount:</label>
                            <input
                                type="number"
                                placeholder="Enter your amount"
                                className="form-control"
                                onChange={(e) => setPayment(e.target.value)}
                            /><br />
                            <label htmlFor="">Upload Slip:</label>
                            <input type="file" accept="image/" id="image" onChange={(e) => setImg(e.target.files[0])} />
                        </div>
                    )}


                    {donationType === 'items' && (
                        <div className="col-md-6">
                            <label htmlFor="">Enter item name:</label>
                            <input
                                type="text"
                                placeholder="Enter item name"
                                className="form-control"
                                onChange={(e) => setItemName(e.target.value)}
                            />
                            <br />
                            <label htmlFor="">Enter quantity of your item:</label>
                            <input
                                type="number"
                                placeholder="Enter quantity"
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <br />
                        </div>
                    )}

                    {donationType !== 'cash' && donationType !== 'items' && (
                        <label>&nbsp;</label>
                    )}
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}