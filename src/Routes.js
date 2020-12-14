import React from "react";
import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import currentUserContext from "./currentUserContext"

const Routes = () => {
    const { currentUser } = useContext(currentUserContext);
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/companies">
                {currentUser ? <CompanyList /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/companies/:handle">
                <CompanyDetail />
            </Route>
            <Route exact path="/jobs">
                {currentUser ? <JobList /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/profile">
                {currentUser ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/signup">
                <SignUpForm />
            </Route>
            <Route><h1>404: Not Found</h1></Route>
        </Switch>
    )
};

export default Routes;