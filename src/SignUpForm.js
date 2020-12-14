import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./LoginForm.css";

const LoginForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { signUp } = useContext(currentUserContext);
    const [alert, setAlert] = useState({visible: false, text: ''});

    let history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData(oldFormData => ({...oldFormData, [name] : value}))
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (await signUp(formData)) {
            history.push("/jobs");
        } else {
            setFormData(INITIAL_STATE);
            setAlert({
                visible: true,
                text: 'Something went wrong. Please try again.'
            });
        }

    }

    return (
        <div className="LoginForm">
            <Alert color="danger" isOpen={alert.visible} toggle={() => setAlert({visible: false, text: ''})}>
                {alert.text}
            </Alert>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={10} md={8} lg={6} xl={5}>
                        <Form className="LoginForm-form text-center border p-5">
                            <h1 className="mb-5">Sign up for Jobly!</h1>
                            <FormGroup>
                                <Input className="form-control"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input className="form-control"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input className="form-control"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button className="mt-4 mb-5" color="primary" size="lg" onClick={handleSignUp}>Sign Up</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default LoginForm;