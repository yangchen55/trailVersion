import React, { useState } from 'react'
import PaymentForm from '../../components/paymentComponents/PaymentForm'
import PaymentTable from '../../components/paymentComponents/PaymentTable'
import { AdminLayout } from '../layout/AdminLayout'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import CustomModal from '../../components/custom-modals/CustomModal'
import { setShowModal } from '../../system/systemSlice'

const Payment = () => {
    const dispatch = useDispatch()
    const handleShow = () => {
        dispatch(setShowModal(true))
    }

    return (
        <AdminLayout>
            <div className="mt-3">
                <h3>welcome to payment </h3>
                <hr />
            </div>

            <Container className="text-end" >
                <Button variant="danger" onClick={handleShow}>
                    + new payment method
                </Button>
            </Container>
            <hr></hr>


            {/* <CustomModal title="Add new payment method">
                <PaymentForm />
            </CustomModal> */}
            <PaymentTable />

        </AdminLayout>



    )
}

export default Payment