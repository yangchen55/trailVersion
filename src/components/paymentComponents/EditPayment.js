import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updatePaymentMethod } from '../../pages/payment/PaymentAction'
import { CustomeInputeField } from '../custom-inpute-field/CustomeInputeField'



const EditPayment = ({ selectedPm }) => {
    const dispatch = useDispatch()
    const [frm, setFrm] = useState({})


    useEffect(() => {
        setFrm(selectedPm);
    }, [setFrm, selectedPm]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFrm({
            ...frm,
            [name]: value,
        });
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(frm, " iam from submit")
        const { __v, updatedAt, createdAt, ...rest } = frm;
        console.log(rest)
        dispatch(updatePaymentMethod(rest));
    };
    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status: </Form.Label>
                    <Form.Check
                        type="radio"
                        name="status"
                        label="Active"

                        checked={frm.status === "active"}
                        value="active"
                        onChange={handleOnChange}
                    />
                    <Form.Check
                        type="radio"
                        name="status"
                        label="Inactive"

                        checked={frm.status === "inactive"}
                        value="inactive"
                        onChange={handleOnChange}
                    />
                </Form.Group>

                <CustomeInputeField
                    onChange={handleOnChange}
                    required={true}
                    label="Name"
                    name="pname"
                    placeholder="Credit card"
                    value={frm?.pname}
                    readOnly={false}
                />
                <CustomeInputeField
                    onChange={handleOnChange}
                    required={true}
                    label="Description"
                    name="description"
                    as="textarea"
                    placeholder="Please click the checkout button to process for the credit card payment"
                    value={frm?.description}
                    readOnly={false}
                />
                <div className="py-3 d-grid">
                    <Button type="submit" variant="success">
                        Update Payment Method
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EditPayment