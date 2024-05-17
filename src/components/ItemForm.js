import React, { useState } from 'react';
import { Form } from "react-bootstrap";

const ItemForm = ({ SetItemData, onSave,EnableAddButton }) => {

    
    const [validated] = useState(false);

    const [form_Data, set_Form_Data] = useState({
        title: "",
        Name: "",
        description: "",
    });


    const chngFn = (event) => { 
        const { name, value } = event.target;
        set_Form_Data({
            ...form_Data,
            [name]: value,
        });
        
        if (form_Data.title.trim().length > 0 
            && form_Data.Name.trim().length > 0 
            && form_Data.description.trim().length > 0 
            && /^[a-zA-Z0-9]+$/.test(form_Data.title) 
            && form_Data.title.length < 50 
            && form_Data.Name.length < 32) 
            {
                EnableAddButton(false);
                SetItemData(form_Data);
            }
    };

  return (
    <>
        
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={form_Data.title}
                                    onChange={chngFn}
                                    minLength={6}
                                    maxLength={50}
                                    pattern="^[a-zA-Z0-9]+$"
                                    required
                                    isInvalid={
                                        validated &&
                                        !/^[a-zA-Z0-9]+$/.test(form_Data.title)
                                        && form_Data.title.length < 50
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid title (alphanumeric
                                    characters only) and 50 characters only
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="Name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Name"
                                    value={form_Data.Name}
                                    onChange={chngFn}
                                    maxLength={32}
                                    minLength={6}
                                    required
                                    isInvalid={
                                        validated && form_Data.Name.length < 32
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Name 32 characters long.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" aria-label="With textarea"
                                    name="description"
                                    value={form_Data.description}
                                    onChange={chngFn}
                                    required
                                    isInvalid={
                                        validated
                                        && form_Data.description.split(" ").length < 1
                                    } />

                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid 50 character only.
                                </Form.Control.Feedback>
                            </Form.Group>

                           
    </>
  )
}

export default ItemForm
