import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
    postPaymentMethod,
    updatePaymentMethod,
} from "../../pages/payment-method/pmAction";
import { CustomeInputeField } from "../custom-inpute-field/CustomeInputeField";

export const EditPaymentMethodFrm = ({ selectedPm }) => {
    const dispatch = useDispatch();
    const [frm, setFrm] = useState({});

    useEffect(() => {
        setFrm(selectedPm);
    }, [frm, selectedPm]);

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

        const { __v, updatedAt, createdAt, ...rest } = frm;
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
                    name="name"
                    placeholder="Credit card"
                    value={frm?.name}
                />
                <CustomeInputeField
                    onChange={handleOnChange}
                    required={true}
                    label="Description"
                    name="description"
                    as="textarea"
                    placeholder="Please click the checkout button to process for the credit card payment"
                    value={frm?.description}
                />
                <div className="py-3 d-grid">
                    <Button type="submit" variant="success">
                        Update Payment Method
                    </Button>
                </div>
            </Form>
        </div>
    );
};
