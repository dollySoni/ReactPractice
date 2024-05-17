import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card,Modal } from "react-bootstrap";
import ItemForm from './ItemForm';


export default function AddEmailTemplate() {
    const [validated, set_Validated] = useState(false);
    const [show, setShow] = useState(false);
    const [form_Data, set_Form_Data] = useState({
        title: "",
        Name: "",
        description: "",
    });
    
    const [Editbutton, setEditbutton] = useState(true);
    const [addbutton, setAddbutton] = useState(true);
    const [removebutton, setRemovebutton] = useState(true);
    const [Cards, setCards] = useState([
        {
            title: "",
            Name: "",
            description: "",
        }
    ])

    const handleClose = () => {setShow(false); setEditbutton(true); };

    const EnableAddButton=(states)=>{
        setAddbutton(states);
    }

    const EnableEditButton=(states)=>{
        setEditbutton(states);
    }
    
    
    
    const SetItemData=(form_Data)=>{
        set_Form_Data(form_Data);
    }




    const submitFn = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form_Data.title.trim().length > 0 && form_Data.Name.trim().length > 0 && form_Data.description.trim().length > 0 && /^[a-zA-Z0-9]+$/.test(form_Data.title) && form_Data.title.length < 50 && form_Data.Name.length < 32) {
            let newCard = form_Data;
            setCards([...Cards, newCard]);
            set_Form_Data({
                title: "",
                Name: "",
                description: "",
            });
            setAddbutton(true);
            setRemovebutton(false);
        }
          set_Validated(false);
    };


    const removeItem = () => {
        let data = [...Cards];
        data.splice(-1, 1)
        setCards(data)
        if (data.length < 2) {
            setRemovebutton(true);
        }
    }

    const setData = (data) => {
        console.log(data);
        set_Form_Data({
            title: data.title,
            Name: data.Name,
            description: data.description,
        });
        setShow(true);
    }

    return (
        <>


            <Container className="mt-5">

                <Row>
                    <Col
                        md={{
                            span: 4,
                            offset: 1,

                        }}
                    >

                    <Form noValidate validated={validated} >
                      <ItemForm EnableAddButton={EnableAddButton}  SetItemData={SetItemData} />
                      <Button type="button" disabled={addbutton} onClick={submitFn}>Add</Button>
                      <Button variant="dark" disabled={removebutton} onClick={removeItem}>Remove</Button>
                    </Form>

                    </Col>

                    <Col
                        md={{
                            span: 6,
                            offset: 1,
                        }}

                    >
                        <Row>
                            {Cards.map((item, index) => {
                                if (item.title.length > 0)
                                    return (

                                        <Col
                                            md={{
                                                span: 2,
                                                offset: 1,
                                            }}

                                        >
                                            <Card key={index} bg="info" text="white">
                                                <Card.Body  onClick={() => setData(item)}>
                                                    <Card.Title>{item.title}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">{item.Name}</Card.Subtitle>
                                                    <Card.Text>{item.description}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} >
                        <ItemForm  EnableAddButton={EnableEditButton} SetItemData={SetItemData}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" disabled={Editbutton} >
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
