import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CreateOrder from "./pages/CreateOrder";
import MyOrders from "./pages/MyOrders";
import HowToUse from "./pages/HowToUse";

export default function App() {
  return (
    <Router>
      <div className="relative z-0">
        <AppNavbar />
        <main className="relative z-10 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

