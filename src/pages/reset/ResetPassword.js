import React, { useState } from "react";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import { PasswordRestFrm } from "../../components/reset-password/PasswordRestFrm";
import { RequestOTP } from "../../components/request-otp/RequestOTP";
import { fetchOtpRequest, resetPassRequest } from "../../helper/axios";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState({});
    const [showForm, setShowForm] = useState("otp");

    const handleOnChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handleOnOtpRequest = async (e) => {
        e.preventDefault();

        const { status, message } = await fetchOtpRequest({ email });

        toast[status](message);
        setResponse({ status, message });

        status === "success" && setShowForm("reset");
    };
    const handleOnPasswordReset = async (data) => {
        console.log("sending plassword to reset ", data);
        const { confirmPassword, ...rest } = data;
        if (rest.password !== confirmPassword) {
            return toast.error("Password do not match");
        }

        const { status, message } = await resetPassRequest({ ...rest, email });
        console.log(status, message);
        toast[status](message);
        setResponse({ status, message });
    };
    const forms = {
        otp: (
            <RequestOTP
                handleOnChange={handleOnChange}
                handleOnOtpRequest={handleOnOtpRequest}
            />
        ),

        reset: <PasswordRestFrm handleOnPasswordReset={handleOnPasswordReset} />,
    };
    return (
        <div>
            <Header />
            {response.message && (
                <Alert variant={response.status === "success" ? "success" : "danger"}>
                    {response.message}
                </Alert>
            )}

            <div className="main register-page p-5">{forms[showForm]}</div>
            <Footer />
        </div>
    )
}

export default ResetPassword