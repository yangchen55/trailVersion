import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postNewCategory } from '../../pages/category/categoryAction';


const AddNewCatForm = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")



    const handleOnSubmit = (e) => {
        e.preventDefault()

        dispatch(postNewCategory({ name }))
    }

    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control placeholder='name' name="name" type='string' onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                    </Col>

                    <Col>
                        <Button variant="danger" type="submit">Add new item</Button>
                    </Col>
                </Row>
            </Form>
        </div >
    )
}


export default AddNewCatForm