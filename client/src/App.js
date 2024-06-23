import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ProductInfo from "./pages/ProductInfo";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import MPHome from "./pages/MPHome";
import MPmanager from "./pages/MPmanager";
import DoNationHome from "./pages/DoNationHome";
import InventoryManager from "./pages/InventoryManager";
import CRmanager from "./pages/CRmanager";
import CareerHome from "./pages/CareerHome";
import CareerManager from "./pages/CareerManager";
import CRhome from "./pages/CRhome";
import DonationManager from "./pages/DonationManager";
import DonorHome from "./pages/DonorHome";
import FinancialManager from "./pages/FinancialManager";
import EventsManager from "./pages/EventManager";
import EventHome from "./pages/EventHome";
import UserManager from "./pages/UserManager";
import DisplayDon from "./pages/FinancialManager/DisplayDon";
import DisplayMship from "./pages/FinancialManager/DisplayMship";
import Mship from "./pages/FinancialManager/Mship";
import Don from "./pages/FinancialManager/Don";
import Updatemember from "./pages/FinancialManager/Updatemember";
import Updatedon from "./pages/FinancialManager/Updatedon";
import Displayform from "./pages/CRmanager/Displayform";
import Requestform from "./pages/CRhome/Requestform";
import CustomerDetails from "./pages/CRhome/CustomerDetails";
import Feedbackform from "./pages/CRhome";
import Updateform from "./pages/CRhome";
import Footer from "./components/footer/Footer";
import ApplyVolunteer from "./pages/CareerHome/ApplyVolunteer";
import Job from "./pages/CareerHome/Job";
import Internship from "./pages/CareerHome/Internship";
import AllVolunteers from "./pages/CareerManager/AllVolunteers";
import AddVolunteer from "./pages/CareerManager/AddVolunteer";
import UpdateVolunteer from "./pages/CareerManager/UpdateVolunteer";
import AddConfirm from "./pages/EventHome/AddConfirm";
import AddEvent from "./pages/EventManager/AddEvent";
import AllEvents from "./pages/EventManager/AllEvents";
import UpdateEvent from "./pages/EventManager/UpdateEvent";
import UpdateAccount from "./pages/DonationManager/UpdateDetails";
import MyDonations from "./pages/DonorHome/MyDonation";
import UpdateAccountFC from "./pages/DonorHome/UpdateDetailsFC";
function App() {
  const { loading } = useSelector((state) => state.loaders);

  //navbar
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <div>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />

        <div className="mp">
          {loading && <Spinner />}
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedPage>
                    <DoNationHome />
                  </ProtectedPage>
                }
              />
              <Route
                path="/DonorHome"
                element={
                  <ProtectedPage>
                    <DonorHome />
                  </ProtectedPage>
                }
              />
              <Route
                path="/EventHome"
                element={
                  <ProtectedPage>
                    <EventHome />
                  </ProtectedPage>
                }
              />
              <Route
                path="/DonationManager"
                element={
                  <ProtectedPage>
                    <DonationManager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/EventsManager"
                element={
                  <ProtectedPage>
                    <EventsManager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <ProtectedPage>
                    <MPHome />
                  </ProtectedPage>
                }
              />

              {/* career */}
              <Route
                path="/CareerHome"
                element={
                  <ProtectedPage>
                    <CareerHome />
                  </ProtectedPage>
                }
              />

              <Route
                path="/ApplyVolunteer"
                element={
                  <ProtectedPage>
                    <ApplyVolunteer />
                  </ProtectedPage>
                }
              />

              <Route
                path="/Job"
                element={
                  <ProtectedPage>
                    <Job />
                  </ProtectedPage>
                }
              />

              <Route
                path="/Internship"
                element={
                  <ProtectedPage>
                    <Internship />
                  </ProtectedPage>
                }
              />
              <Route
                path="/UpdateDetails/:id"
                element={
                  <ProtectedPage>
                    <UpdateAccount />
                  </ProtectedPage>
                }
              />

              <Route
                path="/MyDonation/:email"
                element={
                  <ProtectedPage>
                    <MyDonations />
                  </ProtectedPage>
                }
              />

              <Route
                path="/UpdatteDetailsFC/:id"
                element={
                  <ProtectedPage>
                    <UpdateAccountFC />
                  </ProtectedPage>
                }
              />

              <Route
                path="/AllVolunteers"
                element={
                  <ProtectedPage>
                    <AllVolunteers />
                  </ProtectedPage>
                }
              />

              <Route
                path="/AddVolunteer"
                element={
                  <ProtectedPage>
                    <AddVolunteer />
                  </ProtectedPage>
                }
              />

              <Route
                path="/UpdateVolunteer/:nid"
                element={
                  <ProtectedPage>
                    <UpdateVolunteer />
                  </ProtectedPage>
                }
              />

              {/* event */}

              <Route
                path="/addevent"
                element={
                  <ProtectedPage>
                    <AddEvent />
                  </ProtectedPage>
                }
              />
              <Route
                path="/addconfirm"
                element={
                  <ProtectedPage>
                    <AddConfirm />
                  </ProtectedPage>
                }
              />
              <Route
                path="/allevent"
                element={
                  <ProtectedPage>
                    <AllEvents />
                  </ProtectedPage>
                }
              />
              <Route
                path="/updateEvent/:id"
                element={
                  <ProtectedPage>
                    <UpdateEvent />
                  </ProtectedPage>
                }
              />

              <Route
                path="/profile/:nid"
                element={
                  <ProtectedPage>
                    <Profile />
                  </ProtectedPage>
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProtectedPage>
                    <ProductInfo />
                  </ProtectedPage>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedPage>
                    <Profile />
                  </ProtectedPage>
                }
              />
              <Route
                path="/MPmanager"
                element={
                  <ProtectedPage>
                    <MPmanager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/InventoryManager"
                element={
                  <ProtectedPage>
                    <InventoryManager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/CareerManager"
                element={
                  <ProtectedPage>
                    <CareerManager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/UserManager"
                element={
                  <ProtectedPage>
                    <UserManager />
                  </ProtectedPage>
                }
              />
              {/* Financial Manager  */}
              <Route
                path="/FinancialManager"
                element={
                  <ProtectedPage>
                    <FinancialManager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/DisplayDonation"
                element={
                  <ProtectedPage>
                    <DisplayDon />
                  </ProtectedPage>
                }
              />
              <Route
                path="/DisplayMembership"
                element={
                  <ProtectedPage>
                    <DisplayMship />
                  </ProtectedPage>
                }
              />
              <Route
                path="/Membership"
                element={
                  <ProtectedPage>
                    <Mship />
                  </ProtectedPage>
                }
              />
              <Route
                path="/Donation"
                element={
                  <ProtectedPage>
                    <Don />
                  </ProtectedPage>
                }
              />
              <Route
                path="/updateM/:id"
                element={
                  <ProtectedPage>
                    <Updatemember />
                  </ProtectedPage>
                }
              />
              <Route
                path="/updateD/:id"
                element={
                  <ProtectedPage>
                    <Updatedon />
                  </ProtectedPage>
                }
              />
              {/* customer request */}
              <Route
                path="/CRmanager"
                element={
                  <ProtectedPage>
                    <CRmanager />
                  </ProtectedPage>
                }
              />
              <Route
                path="/displayform"
                element={
                  <ProtectedPage>
                    <Displayform />
                  </ProtectedPage>
                }
              />
              <Route
                path="/CRhome"
                element={
                  <ProtectedPage>
                    <CRhome />
                  </ProtectedPage>
                }
              />

              <Route
                path="/customer/:nic"
                element={
                  <ProtectedPage>
                    <CustomerDetails />
                  </ProtectedPage>
                }
              />
              <Route
                path="/feedback"
                element={
                  <ProtectedPage>
                    <Feedbackform />
                  </ProtectedPage>
                }
              />
              <Route
                path="/Requestform"
                element={
                  <ProtectedPage>
                    <Requestform />
                  </ProtectedPage>
                }
              />
              <Route
                path="/update/:id"
                element={
                  <ProtectedPage>
                    <Updateform />
                  </ProtectedPage>
                }
              />
              <Route
                path="/Updateform"
                element={
                  <ProtectedPage>
                    <Updateform />
                  </ProtectedPage>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
