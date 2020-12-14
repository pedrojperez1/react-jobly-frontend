import React, { useContext } from "react";
import currentUserContext from "./currentUserContext";
import "./Home.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
    const { currentUser } = useContext(currentUserContext);
    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            {!currentUser &&
                <Link to="/login"><Button color="primary">Log In</Button></Link>
            }
            {!currentUser &&
                <Link to="/signup"><Button color="primary">Sign Up</Button></Link>
            }
        </div>
    )
};

export default Home;