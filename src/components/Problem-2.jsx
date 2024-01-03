import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';

const Problem2 = () => {
    const [showAllContactsModal, setShowAllContactsModal] = useState(false);
    const [showUSContactsModal, setShowUSContactsModal] = useState(false);
    const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const placeholderData = [
                { id: 1, phone: '01773239086', country: { id: 1, name: 'Bangladesh' } },
                { id: 2, phone: '01914290302', country: { id: 2, name: 'United States' } },
                { id: 3, phone: '01914290302', country: { id: 3, name: 'India' } },
                { id: 4, phone: '01773239086', country: { id: 4, name: 'United States' } },
            ];

            setContacts(placeholderData);
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const filteredContacts = contacts.filter((contact) =>
            contact.phone.includes(searchTerm) ||
            contact.country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredContacts);
    }, [searchTerm, contacts]);

    const handleAllContactsClick = () => {
        setShowAllContactsModal(true);
        setShowUSContactsModal(false);
    };

    const handleUSContactsClick = () => {
        setShowUSContactsModal(true);
        setShowAllContactsModal(false);
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setShowContactDetailsModal(true);
    };

    const handleCloseAllContactsModal = () => {
        setShowAllContactsModal(false);
    };

    const handleCloseUSContactsModal = () => {
        setShowUSContactsModal(false);
    };

    const handleCloseContactDetailsModal = () => {
        setShowContactDetailsModal(false);
    };

    const handleCheckboxChange = () => {
        setOnlyEvenChecked(!onlyEvenChecked);
    };

    const handleSearchChange = (e) => {
        setTimeout(() => {
            setSearchTerm(e.target.value);
        }, 300);
    };

    const renderContacts = () => {
        const filteredContacts = onlyEvenChecked
            ? searchResults.filter((contact) => contact.id % 2 === 0)
            : searchResults;

        return filteredContacts.map((contact) => (
            <p
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className="contact-item hover-effect"
            >
                ID: {contact.id}, Phone: {contact.phone}, Country: {contact.country.name}
            </p>
        ));
    };

    const renderUSContacts = () => {
        const usContacts = searchResults.filter((contact) => contact.country.name === 'United States');
        const filteredUSContacts = onlyEvenChecked
            ? usContacts.filter((contact) => contact.id % 2 === 0)
            : usContacts;

        return filteredUSContacts.map((contact) => (
            <p
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className="contact-item hover-effect"
                style={{ cursor: 'move', transition: 'background-color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#96CC2A'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'inherit'}
            >
                ID: {contact.id}, Phone: {contact.phone}, Country: {contact.country.name}
            </p>
        ));
    };

    const renderContactDetailsModal = () => {
        if (!selectedContact) {
            return null;
        }

        return (
            <Modal show={showContactDetailsModal} onHide={handleCloseContactDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>ID: {selectedContact.id}</p>
                    <p>Phone: {selectedContact.phone}</p>
                    <p>Country: {selectedContact.country.name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseContactDetailsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={handleAllContactsClick}
                        style={{ backgroundColor: '#46139f', borderColor: '#46139f' }}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={handleUSContactsClick}
                        style={{ backgroundColor: '#ff7150', borderColor: '#46139f' }}
                    >
                        US Contacts
                    </button>
                </div>

                <Modal show={showAllContactsModal} onHide={handleCloseAllContactsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal A - All Contacts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormControl
                                type="text"
                                placeholder="Search..."
                                onChange={handleSearchChange}
                                className="mb-3"
                            />
                        </Form>
                        {renderContacts()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Check
                            type="checkbox"
                            label="Only even"
                            checked={onlyEvenChecked}
                            onChange={handleCheckboxChange}
                        />
                        <Button variant="secondary" onClick={handleCloseAllContactsModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showUSContactsModal} onHide={handleCloseUSContactsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal B - US Contacts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormControl
                                type="text"
                                placeholder="Search..."
                                onChange={handleSearchChange}
                                className="mb-3"
                            />
                        </Form>
                        {renderUSContacts()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUSContactsModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {renderContactDetailsModal()}
            </div>
        </div>
    );
};

export default Problem2;
