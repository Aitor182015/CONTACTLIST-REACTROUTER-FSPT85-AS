import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContact = () => {
    const { actions } = useContext(Context); // Accede a las acciones desde el contexto
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [id]: value,
        }));
    };

    const handleSave = async () => {
        const success = await actions.createContact(contact);
        if (success) navigate("/");
    };

    useEffect(() => {
        actions.createAgenda(); // Crear la agenda 
    }, [actions]);

    return (
        <>
            <h1>Add a new contact</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Full name"
                    value={contact.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter e-mail"
                    value={contact.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone"
                    value={contact.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    value={contact.address}
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
            <br />
            <Link to="/">or get back to contacts</Link>
        </>
    );
};

export default AddContact;
