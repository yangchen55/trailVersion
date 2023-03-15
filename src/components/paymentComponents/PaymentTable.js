import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { deletePaymentMethod, getPayment } from '../../pages/payment/PaymentAction.js';
import { setSelectedPM } from '../../pages/payment/PaymentSlice.js';
import { setShowModal } from '../../system/systemSlice.js';
import CustomModal from '../custom-modals/CustomModal.js';
import EditPayment from './EditPayment.js';
import PaymentForm from './PaymentForm.js';

const PaymentTable = () => {
    const dispatch = useDispatch()
    // const [payments, setPayments] = useState([])
    const { paymentMethods, selectedPm } = useSelector((state) => state.payment);
    console.log(selectedPm, "Iam from selected Pm")
    useEffect(() => {
        dispatch(getPayment())
        // setPayments(paymentMethods)
    }, [dispatch])
    const handleDelete = (_id) => {
        if (
            window.confirm("Are you sure you want to delete this payment method?")
        ) {
            dispatch(deletePaymentMethod(_id));
        }


    }
    const handleEdit = (data) => {

        dispatch(setShowModal(true))
        dispatch(setSelectedPM(data))
        // console.log(status, pname, description)

    }
    return (
        <>
            {selectedPm._id ? (
                <CustomModal title="Edit payment method">
                    <EditPayment selectedPm={selectedPm} />
                </CustomModal>
            ) : (
                <CustomModal title="Add new payment method">
                    <PaymentForm />
                </CustomModal>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Status</th>
                        <th> Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {paymentMethods.map((item, i) => (
                        <tr key={item?._id}>
                            <td>{i + 1}</td>
                            <td>{item.status}</td>
                            <td>
                                {item.pname}
                            </td>
                            <td>
                                {item.description}
                            </td>
                            <td>
                                <div className='d-flex justify-content-center'>
                                    <Button variant="success" className="m-1" onClick={() => handleEdit(item)
                                    }>edit</Button>
                                    <Button variant="danger" className="m-1" onClick={() => handleDelete(item?._id)}>Delete</Button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        </>

    )
}

export default PaymentTable