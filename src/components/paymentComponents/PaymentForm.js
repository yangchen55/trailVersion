import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { postPayment } from '../../pages/payment/PaymentAction'


const PaymentForm = () => {
    const dispatch = useDispatch()
    const [payDetails, setPayDetails] = useState({})
    const handleOnChange = (e) => {
        const { name, value } = e.target

        setPayDetails({
            ...payDetails,
            [name]: value
        })

    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(postPayment(payDetails))

    }

    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label>payment name</Form.Label>
                    <Form.Control name='pname' type='string' onChange={handleOnChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' type='string' as="textarea" onChange={handleOnChange} required />
                </Form.Group>
                <hr></hr>
                <div className='text-end'>
                    <Button variant='primary' type='submit'>Save Changes</Button>
                </div>

            </Form>
        </div>
    )
}

export default PaymentForm