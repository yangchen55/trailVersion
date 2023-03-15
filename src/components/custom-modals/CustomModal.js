import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModal } from '../../system/systemSlice';

const CustomModal = ({ title, children }) => {
    const dispatch = useDispatch()
    const { showModal } = useSelector((state) => state.system);
    useEffect(() => { }, [showModal]);
    const handleClose = (arg) => {

    }

    return (
        <>
            <Modal show={showModal}
                onHide={() => dispatch(setShowModal(false))} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(setShowModal(false))}>
                        cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}


export default CustomModal