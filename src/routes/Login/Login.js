import React, { useState } from 'react';
import { Container, Form, Button, Modal, Spinner } from 'react-bootstrap';
import './Login.scss';

import { setCookie } from '../../utils/storage';
import { postRequestAsync } from '../../common/genericAPIs';

function Login() {
    const [values, setValues] = useState({});
    const [register, setRegisterValues] = useState({});
    const [errorRegister, setErrorRegister] = useState({});
    const [error, setError] = useState({});
    const [spinner, setSpinner] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const submitOnClick = async () => {
        if (!values.userName || values.userName.length < 3 || !validateEmail(values.userName)) {
            setError((val) => ({
                ...val,
                userName: "Invalid emailId"
            }));
        } else {
            const errorObject = error;
            delete errorObject.userName;
            setError(errorObject);
        }

        if (!values.password || values.password.length < 3) {
            setError((val) => ({
                ...val,
                password: "Invalid password"
            }));
        } else {
            const errorObject = error;
            delete errorObject.password;
            setError(errorObject);
        }
        if (isEmpty(error)) {
            try {
                const { data: { token } } = await postRequestAsync('/auth/login', values);
                setCookie('food', token);
                window.location.href = '/';
            } catch {
            }
        }

    };

    const handleOnChange = (e, key) => {
        setValues((value) => ({
            ...value,
            [key]: e.target.value
        }));
    };

    const handleOnRegisterChange = (e, key) => {
        setRegisterValues((value) => ({
            ...value,
            [key]: e.target.value
        }));
    };

    const registerMe = async() => {
        setErrorRegister({});
        const errorObject = {}
        if (!register.name || register.name.length < 3) {
            errorObject.name = "invalid Name"
        }
        if (!register.email || !validateEmail(register.email)) {
            errorObject.email = "invalid email"
        }
        if (!register.password || register.password < 6) {
            errorObject.password = "invalid Password"
        }
        if (!register.phone || register.phone.length !== 10) {
            errorObject.phone = "invalid phone"
        }
        if (!register.address || register.address.length < 10) {
            errorObject.address = "invalid address"
        }
        if (!isEmpty(errorObject)) {
            setErrorRegister(errorObject)
        } else {
            try {
                // dispatch(setLoader(true));
                const { data } = await postRequestAsync('/User/register', register);
                handleClose();
                // dispatch(setLoader(false));
            } catch {
                // dispatch(setLoader(false));
                // dispatch(setSnackbar({ type: "error", message: e.message }));
            }
        }

    }

    const registerModel = () => {
        return (
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Register Me!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Please enter your name"
                                    onChange={(value) => { handleOnRegisterChange(value, "name") }}
                                    isInvalid={!!errorRegister.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorRegister.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Please enter emailid"
                                    onChange={(value) => { handleOnRegisterChange(value, "email") }}
                                    isInvalid={!!errorRegister.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorRegister.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Please enter password"
                                    onChange={(value) => { handleOnRegisterChange(value, "password") }}
                                    isInvalid={!!errorRegister.password}
                                />
                                 <Form.Control.Feedback type="invalid">
                                    {errorRegister.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Please enter phone"
                                    onChange={(value) => { handleOnRegisterChange(value, "phone") }}
                                    isInvalid={!!errorRegister.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorRegister.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Please enter your address"
                                    onChange={(value) => { handleOnRegisterChange(value, "address") }}
                                    isInvalid={!!errorRegister.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorRegister.address}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={registerMe}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
    const spinnerView = () => {
        return <Spinner animation="border" variant="primary" />
    }

    return (
        <Container className='loginPage'>
            <div className='loginBox'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Please enter emailid"
                            onChange={(value) => { handleOnChange(value, "userName") }}
                            isInvalid={!!error.userName}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Please enter password"
                            onChange={(value) => { handleOnChange(value, "password") }}
                            isInvalid={!!error.password}
                        />
                    </Form.Group>
                    <Button className='loginBtn' onClick={submitOnClick}>Login</Button>
                    <Button className='registerBtn' onClick={handleShow}>Create an account</Button>
                </Form>
            </div>
            {registerModel()}
            {spinner && spinnerView() }
        </Container>
    );
}

export default Login;
