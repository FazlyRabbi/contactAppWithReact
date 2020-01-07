import React, { useContext, useEffect } from 'react';
import ContactForm from './ContactForm';
import { ContactContext } from '../../contexts/Contact.context';
const AddContact = () => {
  const context = useContext(ContactContext);
  const { selectedContact } = context.state;
  useEffect(() => {
    const { dispatch } = context;

    //If anyone click AddContact menu link, we are forcing o selectedContact to be empty
    dispatch({ type: 'CLEAR_SELECTED_CONTACT' });
  }, [selectedContact]);
  return <ContactForm />;
};

export default AddContact;
