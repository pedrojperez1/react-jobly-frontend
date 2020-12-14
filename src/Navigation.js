import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom"
import {Navbar, NavbarBrand, Nav, NavItem} from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./Navigation.css";

const Navigation = () => {
    const { currentUser, logOut } = useContext(currentUserContext);
    let history = useHistory();
    const handleLogOut = (e) => {
        e.preventDefault();
        logOut();
        history.push("/");
    }
    return (
        <div className="Navigation">
            <Navbar className="bg-dark navbar-dark">
                <NavbarBrand href="/">Jobly</NavbarBrand>
                <Nav>
                    {currentUser &&
                        <NavItem>
                            <NavLink to="/companies" className="Navigation-NavLink" activeClassName="activeTab">Companies</NavLink>
                        </NavItem>
                    }
                    {currentUser &&
                        <NavItem>
                            <NavLink to="/jobs" className="Navigation-NavLink" activeClassName="activeTab">Jobs</NavLink>
                        </NavItem>
                    }   
                    {currentUser &&
                        <NavItem>
                            <NavLink to="/profile" className="Navigation-NavLink" activeClassName="activeTab">Profile</NavLink>
                        </NavItem>
                    }
                    {currentUser &&
                        <NavItem>
                            <span onClick={handleLogOut} className="Navigation-NavLink">Log out</span>
                        </NavItem>
                    }
                    {!currentUser &&
                        <NavItem>
                            <NavLink to="/login" className="Navigation-NavLink" activeClassName="activeTab">Log In</NavLink>
                        </NavItem>
                    }
                    {!currentUser &&
                        <NavItem>
                            <NavLink to="/signup" className="Navigation-NavLink" activeClassName="activeTab">Sign Up</NavLink>
                        </NavItem>
                    }
                </Nav>
            </Navbar>
        </div>
    )
};

export default Navigation;