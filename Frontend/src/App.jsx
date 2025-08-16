import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OwnerSignup from './pages/OwnerSignup';
import OwnerLogin from './pages/OwnerLogin';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterRooms from './pages/RegisterRooms';
import RoomDetails from './pages/RoomDetails';
import Maps from './pages/Maps';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps" element={<Maps/>} />
          <Route path="/login" element={<OwnerLogin />} />
          <Route path="/signup" element={<OwnerSignup />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/registerroom" element={<RegisterRooms />} />
          <Route path="/roomdetails/:id" element={<RoomDetails/>} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
