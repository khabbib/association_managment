import { Fragment, useState, useEffect } from "react"

const Header = (e) =>{
    return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">#Name</a>
                </div>
                <ul className="nav navbar-nav flex">
                    <li className="active nav-item"><a href="#" className="nav-link">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Page 1</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Page 2</a></li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    
                    <button class="btn btn-secondry" type="submit">Register</button>
                    <button class="btn btn-dark" type="submit">Log out</button>
                    </form>
            </div>
            </nav>
    )
}

export default Header;