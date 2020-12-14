import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Routes from "./Routes";
import './App.css';
import { Container } from "reactstrap";
import currentUserContext from "./currentUserContext";
import JoblyApi from "./JoblyApi";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('loggedInUser')) {
      setCurrentUser(JSON.parse(localStorage.getItem('loggedInUser')))
    }
  }, []);

  const logIn = async (loginData) => {
      let res = await JoblyApi.login(loginData); // log in with API
      const { username, token } = res;
      if (token) {
        setCurrentUser({username, token}); // set current user state
        localStorage.setItem('loggedInUser', JSON.stringify({username, token})); // save to storage
        JoblyApi.token = token; // set token on API 
        return true;
      }
      else {
        return false;
      }

  }

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
    return true;
  };

  const signUp = async (signUpData) => {
    let res = await JoblyApi.signUp(signUpData);
    if (res.token) {
      const currentUser = {
        username: signUpData.username,
        token: res.token
      };
      setCurrentUser(currentUser);
      localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
      JoblyApi.token = res.token; // set token on API 
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App">
      <currentUserContext.Provider value={{currentUser, logIn, logOut, signUp}}>
        <Navigation />
        <Container className="bg-light py-3" fluid={true}>
            <Routes />
        </Container>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
