const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [] 
        },
        actions: {

			/* funcion para crear la agenda en la api*/
            createAgenda: async () => {
                try {
                    let response = await fetch("https://playground.4geeks.com/contact/agendas/aitorsantos", {
                        method: "POST",
                    });
                    if (response.status === 400) {
                        console.log("Agenda ya existe, no es necesario crearla nuevamente.");
                        return;
                    }
                    if (!response.ok) {
                        console.log(`Error al crear la agenda: ${response.status}`);
                        return;
                    }
                    let data = await response.json();
                    console.log("Agenda creada exitosamente:", data);
                } catch (error) {
                    console.log("Error de red o servidor:", error);
                }
            },
			/* funcion para crear contacto en la api */
            createContact: async (contact) => {
                try {
                    let response = await fetch("https://playground.4geeks.com/contact/agendas/aitorsantos/contacts", {
                        method: "POST",
                        body: JSON.stringify(contact),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        console.log(`Error: ${response.status}`);
                        return false;
                    }

                    let data = await response.json();
                    console.log("Contacto creado:", data);

                    // Actualizamos los contactos en el store
                    const store = getStore();
                    setStore({ contacts: [...store.contacts, data] });

                    return true;
                } catch (error) {
                    console.log("Error al crear contacto:", error);
                    return false;
                }
            },
			/* funcion para actualizar la contactlist desde la api */
            getContacts: async () => {
                try {
                    let response = await fetch("https://playground.4geeks.com/contact/agendas/aitorsantos/contacts", {
                        method: "GET",
                    });
                    if (!response.ok) return;
                    let data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (error) {
                    console.log("Error al obtener contactos:", error);
                }
            },
			/* funcion para borrar contacto de la api */
            removeContact: async (contactId) => {
                try {
                    let response = await fetch(`https://playground.4geeks.com/contact/agendas/aitorsantos/contacts/${contactId}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        console.log(`Error al eliminar contacto, código de estado: ${response.status}`);
                        return;
                    }
                    console.log(`Contacto con id ${contactId} borrado con éxito.`);
                    
                    const store = getStore();
                    const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);

                    setStore({ contacts: updatedContacts });  // Actualiza solo los contactos restantes
                } catch (error) {
                    console.log("Error al eliminar contacto:", error);
                }
            },
        }
    };
};

export default getState;
