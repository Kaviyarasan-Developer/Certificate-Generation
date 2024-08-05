import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'


export default function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="nav">
       
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/org">Certificate</Link>
        <Link className="nav-link" to="/find">Find</Link>
       
        
      </nav>
    </div>
  );
}
