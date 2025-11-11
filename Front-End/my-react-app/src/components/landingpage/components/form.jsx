import React from "react";
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Form, Row, Stack } from "react-bootstrap";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { useState } from "react";
import Fab from '@mui/material/Fab';


function MessageForm(props) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState({
        email: "",
        content: "",
        file: null
    })


    function handleChange(event) {
        const { name, value, files } = event.target
        setEmail((prevValue) => {
            return {
                ...prevValue,
                [name]: files ? files[0] : value
            }
        })
    }

    async function sendEmail(formData) {
        await axios.post(`${props.baseurl}/send_email`, formData);
        await props.emailSent()
    };

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            const formData = new FormData()
            formData.append("email", email.email)
            formData.append("content", email.content)
            if (email.file) {
                formData.append("file", email.file)
            }
            sendEmail(formData);
        } catch (error) {
            console.log(error);
        } finally {
            props.showForm()
        };
    };

    function handleClose(event) {
        event.preventDefault()
        props.showForm()
    }

    return (
        <div open={props.show} className="d-flex justify-content-center align-items-center vh-50 bg-tranparent">
            <Form className="form-div bg-dark p-3 pt-1 border-white" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="d-flex justify-content-end"><EmailIcon /></div>

                <Form.Group>
                    <Form.Label>
                        Email:
                    </Form.Label>
                    <Form.Control type="email" name="email" required onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please Enter valid Email Address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Content:
                    </Form.Label>
                    <Form.Control as="textarea" rows={5} name="content" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Stack gap={3} direction="horizontal" className="text-light  pt-3 justify-content-end">
                        <Form.Control type="file" name="file" accept="image/*" onChange={handleChange} />
                        <Fab className="text-light" type="submit" variant="extended" color="primary">
                            <SendIcon />
                        </Fab>
                        <div className="vr bg-light" />
                        <Fab onClick={handleClose} type="cancel" variant="extended" color="secondary" >
                            <DeleteIcon />
                        </Fab>
                    </Stack>
                </Form.Group>
            </Form>

        </div>

    )
}


export default MessageForm;