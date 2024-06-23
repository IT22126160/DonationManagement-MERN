import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function MyDonations() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [totalQuantities, setTotalQuantities] = useState({});
    const [totalAmount, setTotalAmount] = useState({});
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchDonationData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/donation/getDonation/${email}`);
                setDonations(response.data.donations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data', error);
                setError("Error fetching data");
                setLoading(false);
            }
        };
        
        
        fetchDonationData();
    }, [email]);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5001/donation/getDonation/${email}`);
            const relevantDetails = response.data.donations;
            setDonations(relevantDetails);

            if (relevantDetails.length === 0) {
                setSearchNotFound(true);
            } else {
                setSearchNotFound(false);
            }
        } catch (error) {
            console.error("Error fetching data", error);
            setError("Error fetching data");
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);

        if (!donations) {
            console.error("Donations array is not defined or is null.");
            return;
        }

        const filtered = donations.filter((donation) =>
            donation.donationType.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDonations(filtered);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this donation?')) {
            axios
                .delete(`http://localhost:5001/donation/deleteDonation/${id}`)
                .then(result => {
                    console.log(result);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    const generateDonationReport = () => {
        const pdf = new jsPDF('p', 'pt', 'a4');
        const table = document.querySelector('table');

        html2canvas(table).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 500;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 40, 40, imgWidth, imgHeight);
            pdf.save('donation_report.pdf');
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>My Donations</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Your Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Check</button>
            </form>

            <input
                type="text"
                placeholder="Search Donations by donation type"
                value={search}
                onChange={handleSearch}
            />

            {searchNotFound && <p>No donations found.</p>}

            <ul>
                {filteredDonations.map((donation) => (
                    <li key={donation.id}>
                        <strong>Full Name:</strong> {donation.fullName}<br />
                        <strong>Address:</strong> {donation.address}<br />
                        <strong>Donation Type:</strong> {donation.donationType}<br />
                        {donation.donationType === 'cash' ? (
                            <div>
                                <strong>Amount:</strong> ${donation.payment}<br />
                            </div>
                        ) : (
                            <div>
                                <strong>Item Name:</strong> {donation.itemName}<br />
                                <strong>Quantity:</strong> {donation.quantity}<br />
                            </div>
                        )}
                        <button onClick={() => handleDelete(donation.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={generateDonationReport}>Generate Report</button>
        </div>
    );
}

export default MyDonations;