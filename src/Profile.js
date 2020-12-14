import React, { useState, useEffect, useContext } from "react";
import currentUserContext from "./currentUserContext";
import JoblyApi from "./JoblyApi";
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert, Label } from "reactstrap";
import "./Profile.css";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState(INITIAL_STATE)
    const { currentUser } = useContext(currentUserContext);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const history = useHistory();

    useEffect(() => {
        const getUserData = async function() {
            const res = await JoblyApi.getUser(currentUser.username, currentUser.token);
            console.log(res);
            setUserData(res);
        };
        getUserData();
    }, [currentUser]);

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData(oldFormData => ({...oldFormData, [name] : value}))
    }

    const handleUpdateProfile = async () => {
        const validPass = await confirmPassword(formData.password);
        if (validPass) {
            const data = {
                firstName: formData.firstName || userData.firstName,
                lastName: formData.lastName || userData.lastName,
                email: formData.email || userData.email
            }
            const newUserData = await JoblyApi.updateProfile(currentUser.username, data)
            history.push("/profile");
            formData.password = "";
            setAlertText("Successfully updated!");
            setAlertVisible(true);
        } else {
            formData.password = "";
            setAlertText("Invalid password.");
            setAlertVisible(true);
        }
    }

    const confirmPassword = async (password) => {
        const data = {
            username: currentUser.username,
            password: password
        }
        let res = await JoblyApi.login(data);
        return res.token ? true : false
    }
    return ( userData &&
        <div className="Profile">
            <Alert color="danger" isOpen={alertVisible} toggle={() => setAlertVisible(false)}>
                {alertText}
            </Alert>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={10} md={8} lg={6} xl={5}>
                        <Form className="ProfileForm-form text-center border p-5">
                            <h1 className="mb-5">Profile</h1>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input className="form-control"
                                    type="text"
                                    name="username"
                                    disabled={true}
                                    defaultValue={userData.username}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input className="form-control"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    defaultValue={userData.firstName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input className="form-control"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    defaultValue={userData.lastName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input className="form-control"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    defaultValue={userData.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Confirm password</Label>
                                <Input className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                            </FormGroup>
                            <Button className="mt-4 mb-5" color="primary" onClick={handleUpdateProfile}>Save Changes</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
    
};

export default Profile;