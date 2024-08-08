import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Navbar />
        </header>

        <main className="main">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Toaster />
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
