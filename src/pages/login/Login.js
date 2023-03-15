import React, { useEffect, useRef } from "react";
import { Button, FormControl } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Footer } from '../layout/Footer'
import { Header } from '../layout/Header'
import { loginAction } from "./authAction";

const Login = () => {
    const dispatch = useDispatch();
    const emailRef = useRef("");
    const passRef = useRef("");
    const { isLoading, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formDt = {
            email: emailRef.current.value,
            password: passRef.current.value,
        };
        if (!formDt.email || !formDt.password) {
            return alert("Please fill in both the fields!");
        }

        dispatch(loginAction(formDt))
        console.log(emailRef, formDt)
    }
    useEffect(() => {
        user?._id && navigate("/dashboard");

        // TODO: make router private and auto login
    }, [user, navigate]);
    return (
        <div>
            <Header />
            <div className='main login-page  p-5'>
                <Form className="shadow-lg rounded" onSubmit={handleOnSubmit}>
                    <h3 className='text-center'> welcome to the trail Version</h3>
                    <hr></hr>
                    <Form.Group>
                        <Form.Label>email address</Form.Label>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            placeholder="Enter email"
                            required
                        />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            ref={passRef}
                            type="password"
                            placeholder='password'
                            required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isLoading ? (
                            <Spinner variant="dark" animation="border" />
                        ) : (
                            " Submit"
                        )}
                    </Button>
                    <div className="text-end">
                        Forget password? <a href="/resetPassword">Reset now</a>
                    </div>
                </Form>
            </div>
            <Footer />

        </div>
    )
}

export default Login