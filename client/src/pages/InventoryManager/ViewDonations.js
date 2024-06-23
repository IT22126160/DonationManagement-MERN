import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from "react-bootstrap";

const ViewDonations = () => {
    const [donation,setDonation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search,setSearch] = useState("");
    const [filteredDonation, setFilteredDonation]=useState([]);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [categorizedItems, setCategorizedItems] = useState({});
    const [totalQuantities, setTotalQuantities] = useState({});
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:3000/donation/allDonation')
        .then(res => {
            setDonation(res.data.donations);
            setCategorizedItems(res.data.categorizedItems);
            setTotalQuantities(res.data.totalQuantities);
            const total = res.data.donations.reduce((acc, donation) => acc + donation.payment, 0);
            setTotalPayment(total);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError("Error fetching data");
            setLoading(false);
        });
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        const filtered = donation.filter((donation) =>
            donation.donationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDonation(filtered);
    };

    const handleDelete = (id) =>{
       
            axios
            .delete('http://localhost:3000/donation/deleteDonation/'+id)
            .then(result => {console.log(result)
                window.location.reload()})
            .catch(err => console.log(err))
    };

    const generateDonationReport = () => {
        if (donation.length === 0) {
            alert("No donations found.");
            return;
        }
    
        const pdf = new jsPDF('p', 'pt', 'a4');
        const table = document.querySelector('table');

        html2canvas(table).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 500; // Adjust as needed
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
            pdf.addImage(imgData, 'PNG', 40, 40, imgWidth, imgHeight);
            pdf.save('donation_report.pdf');
        });
    };
    
    const navigate = useNavigate();

    return (
        <div className="allDonations">
            <Button variant="secondary" onClick={generateDonationReport}>Generate Report</Button>
            <nav className="navbar navbar-light bg-light justify-content-center">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" 
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search by item name or donation type" 
                        aria-label="Search"/>
                </form>
            </nav>
            <div className="text-center">
            <h1 className="display-1 align-middle">All donations in system</h1>
            </div>
            <div>
                <h2>Total Quantities</h2>
                <ul>
                    {Object.entries(totalQuantities).map(([itemName, quantity]) => (
                        <li key={itemName}>
                            {itemName}: {quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Total Amount</h2>
                {error ? (
                    <p>{error}</p>
                ) : donation ? (
                    <ul>
                        <li>Total Amount Donated: {totalPayment}</li>
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <table class="table table-striped">
                <thead>
                    <tr class="table-dark">
                        <th>Donation ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Donation Type</th>
                        <th>Amount</th>
                        <th>Slip</th>
                        <th>Item name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {search.trim() === "" ? (
                        // Display all donations if no search term
                        donation.length > 0 ? (
                            donation.map((donation) => {
                                return <tr key={donation._id}>
                                    <td>{donation._id}</td>
                                    <td>{donation.fullName}</td>
                                    <td>{donation.email}</td>
                                    <td>{donation.address}</td>
                                    <td>{donation.donationType}</td>
                                    <td>{donation.payment}</td>
                                    <td>
                                        {donation.imgUrl && (
                                            <img src={donation.imgUrl} alt="Donation Slip" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        )}
                                    </td>
                                    <td>{donation.itemName}</td>
                                    <td>{donation.quantity}</td>
                                    <td>
                                    <Link to={`/UpdateDetails/${donation._id}`} className="btn btn-success">Update</Link>
                                    <button className="btn btn-danger" onClick={(e) => handleDelete(donation._id)}>Delete</button></td>
                                </tr>
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">No data</td>
                            </tr>
                        )
                    ) : (
                        // Display filtered donations based on search term
                        filteredDonation.length > 0 ? (
                            filteredDonation.map((donation) => {
                                return <tr key={donation._id}>
                                    <td>{donation._id}</td>
                                    <td>{donation.fullName}</td>
                                    <td>{donation.email}</td>
                                    <td>{donation.address}</td>
                                    <td>{donation.donationType}</td>
                                    <td>{donation.payment}</td>
                                    <td>
                                        {donation.imgUrl && (
                                            <img src={donation.imgUrl} alt="Donation Slip" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        )}
                                    </td>
                                    <td>{donation.itemName}</td>
                                    <td>{donation.quantity}</td>
                                    <td>
                                    <Link to={`/UpdateDetails/${donation._id}`} className="btn btn-success">Update</Link>
                                    <button className="btn btn-danger" onClick={(e) => handleDelete(donation._id)}>Delete</button></td>
                                </tr>
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">No matching data</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ViewDonations;