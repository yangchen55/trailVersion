import React, { useEffect, useState, useRef } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { useSearchParams } from "react-router-dom";
import { postEmailVerification } from "../../helper/axios";

export const NewAccVerify = () => {
  // call the api with the code and email
  // show the message if verified or not
  // use  useSearchParams let you get the  data from current Url 
  const [response, setResponse] = useState({})
  const isFetch = useRef(true);

  let [URLSearchParams] = useSearchParams()
  const emailVerificationCode = URLSearchParams.get("c")
  const email = URLSearchParams.get("email")

  useEffect(() => {
    const emailVerificationCode = URLSearchParams.get("c")
    const email = URLSearchParams.get("email")
    emailVerificationCode && email && callAPI({ emailVerificationCode, email })
    isFetch.current = false;

  }, [URLSearchParams])


  console.log(emailVerificationCode, email)


  const callAPI = async (obj) => {
    if (isFetch.current) {
      const response = await postEmailVerification(obj)
      setResponse(response)
      console.log(response)
    }
  }



  return (
    <>
      <Header />
      <div className="main p-5 d-flex justify-content-center align-items-center">
        {response?.message ? (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response?.message}
          </Alert>
        ) : (
          <Spinner animation="border" variant="primary" className="fs-1" />
        )}
      </div>

      <Footer />
    </>
  );
};
