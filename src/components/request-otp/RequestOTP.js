import React from "react";
import { Button, Form } from "react-bootstrap";

export const RequestOTP = ({ handleOnChange, handleOnOtpRequest }) => {
  return (
    <div>
      <Form
        className="border p-4 rounded shadow-lg"
        onSubmit={handleOnOtpRequest}
      >
        <h3 className="text-center">Request OTP!</h3>
        <hr className="mb-5" />
        <p>OTP will be sent to your email</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Request OTP
        </Button>
      </Form>
    </div>
  );
};
