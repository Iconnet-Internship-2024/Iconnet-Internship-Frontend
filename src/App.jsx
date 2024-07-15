import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Creator from "./pages/creator";
import Community from "./pages/Community";
import Creatorspage from "./pages/Creatorspage";
import Upgradetocreators from "./pages/Upgradetocreators";
import Mypage from "./pages/Creator/Mypage";
import Audience from "./pages/Creator/Audience";
import Settingscreator from "./pages/Creator/Settingcreator";
import Notifications from "./pages/Creator/Notifications";
import Login from "./pages/login";
import Register from "./pages/register";
import Settings from "./pages/settings";
import Membership from "./pages/Creator/Membership";
import ListMembership from "./pages/Creator/ListMembership";
import UpdateMembership from './pages/Creator/UpdateMembership'; 
import UpdatePassword from "./pages/updatepassword";
import Dashboard from "./pages/dashboard";
import Questions from "./pages/admin/questions";
import Reports from "./pages/admin/reports";
import Result from "./pages/result";
import Resultcategory from "./pages/resultcategory";
import ListPostCreator from "./pages/ListPostCreator.jsx";
import ListPostUser from "./pages/ListPostUser.jsx";
import EditPost from "./components/EditPost.jsx";
import SyaratdanKetentuan from "./pages/SyaratdanKetentuan";
import Magang from "./pages/magang"; // Import halaman Magang

function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Setiap kali ada perubahan lokasi, scroll ke atas
  }, [location]);

  return (
    <Router>
      <div className="h-screen">
        {showHeaderFooter && <Navbar />}
        <div className="bg-stone-100">
          <Routes>
            <Route
              path="/"
              element={<LandingPage setShowHeaderFooter={() => setShowHeaderFooter(true)} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<Dashboard setShowHeaderFooter={() => setShowHeaderFooter(false)} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<Creator />} />
            <Route path="/Creatorspage" element={<Creatorspage />} />
            <Route path="/Upgradetocreators" element={<Upgradetocreators />} />
            <Route path="/community" element={<Community />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route
              path="/results/:searchTerm"
              element={<Result />} // Komponen yang diperbarui
            />
            <Route
              path="/resultcategory/:category"
              element={<Resultcategory />}
            />
            <Route
              path="/settings"
              element={<Settings setShowHeaderFooter={() => setShowHeaderFooter(false)} />}
            />
            <Route
              path="/questions"
              element={<Questions setShowHeaderFooter={() => setShowHeaderFooter(false)} />}
            />
            <Route
              path="/reports"
              element={<Reports setShowHeaderFooter={() => setShowHeaderFooter(false)} />}
            />
            <Route path="/postCreator" element={<ListPostCreator />} />
            <Route path="/postUser" element={<ListPostUser />} />
            <Route path="/editPost/:id" element={<EditPost />} />
            <Route path="/Creator" element={<Mypage />} />
            <Route path="/Audience" element={<Audience />} />
            <Route path="/Settingcreator" element={<Settingscreator />} />
            <Route path="/Membership" element={<Membership />} />
            <Route path="/ListMembership" element={<ListMembership />} />
            <Route path="/tier/update/:id" element={<UpdateMembership />} />
            <Route path="/Notifications" element={<Notifications />} />

            {/* Tambahkan route untuk SyaratdanKetentuan */}
            <Route path="/SyaratdanKetentuan" element={<SyaratdanKetentuan />} />

            {/* Tambahkan route untuk Magang */}
            <Route path="/magang" element={<Magang />} />
          </Routes>
        </div>
        {showHeaderFooter && <Footer />}
      </div>
    </Router>
  );
}

export default App;
