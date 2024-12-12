import "../../styles/home.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    // Estado local para controlar el modal
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        actions.getContacts(); // Obtiene los contactos al cargar la página
    }, []);

    const buttonCreateAgenda = () => {
        actions.createAgenda(); // Llama a la función createAgenda
    };

    const handleShowModal = (contactId) => {
        setSelectedContact(contactId); // Guarda el contacto que se eliminará
        setShowModal(true); // Muestra el modal
    };

    const handleDeleteContact = () => {
        if (selectedContact) {
            actions.removeContact(selectedContact); // Elimina el contacto seleccionado
        }
        setShowModal(false); // Oculta el modal
    };

    return (
        <div className="container mt-4">
            {/* Botón para añadir contactos */}
            <div className="d-flex justify-content-end mb-3">
                <Link className="btn btn-success" to="/add-contact" role="button">
                    Create new contact
                </Link>
            </div>

            {/* Botón para crear agenda */}
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={buttonCreateAgenda}>
                    Create Agenda
                </button>
            </div>

            {/* Lista de contactos */}
            {store.contacts.length > 0 ? (
                store.contacts.map((item, index) => (
                    <div className="card mb-3" style={{ maxWidth: "1000px" }} key={index}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src="https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg"
                                    className="img-fluid"
                                    alt="Card image"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    {/* Botón "X" para eliminar el contacto */}
                                    <span
                                        className="btn-close position-absolute top-0 end-0 m-2"
                                        onClick={() => handleShowModal(item.id)} // Abre el modal con el ID del contacto
                                    ></span>

                                    <h5 className="card-title">{item.name || "No Name"}</h5>
                                    <p className="card-text">{item.address || "No Address"}</p>
                                    <p className="card-text">{item.phone || "No Phone"}</p>
                                    <p className="card-text">{item.email || "No Email"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">No contacts available. Please add a new contact.</p>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this contact?
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteContact}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
