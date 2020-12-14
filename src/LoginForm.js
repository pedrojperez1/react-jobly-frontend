import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./LoginForm.css";

const LoginForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: ''
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { logIn } = useContext(currentUserContext);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData(oldFormData => ({...oldFormData, [name] : value}))
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (await logIn(formData)) {
            console.log('login successful!')
            history.push("/jobs")
        } else {
            setFormData(INITIAL_STATE);
            setAlertText("Invalid username/password.");
            setAlertVisible(true);
        }
    }

    return (
        <div className="LoginForm">
            <Alert color="danger" isOpen={alertVisible} toggle={() => setAlertVisible(false)}>
                {alertText}
            </Alert>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={10} md={8} lg={6} xl={5}>
                        <Form className="LoginForm-form text-center border p-5">
                            <h1 className="mb-5">Welcome back!</h1>
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
                            <Button className="mt-4 mb-5" color="primary" size="lg" onClick={handleSignIn}>Sign In</Button>
                            <p>Need an account? <Link to="/signup">Sign up!</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default LoginForm;