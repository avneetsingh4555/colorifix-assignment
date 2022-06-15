import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return(
 <div className="container">
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand mx-3" to="/">Home</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/users-list">Users List</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add-permission-group">Add Permission</Link>
      </li>
     
     
 
    </ul>
  </div>
</nav>
</div> 

    );
}

export default Navbar;