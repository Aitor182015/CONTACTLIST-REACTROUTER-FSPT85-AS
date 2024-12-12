import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/demo">Demo</Link>
                </li>
                <li>
                    <Link to="/add-contact">Add Contact</Link>
                </li>
            </ul>
        </nav>
    );
};
