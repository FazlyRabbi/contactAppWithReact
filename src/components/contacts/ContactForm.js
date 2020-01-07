import React, { useContext, useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import TextInputGroup from '../layout/TextInputGroup';
import RadioInputGroup from '../layout/RadioInputGroup';

import { ContactContext } from '../../contexts/Contact.context';
const ContactForm = props => {
  const context = useContext(ContactContext);
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profession: '',
    selectedValue: 'personal'
  });
  const [errors, setErrors] = useState({});

  const { selectedContact } = context.state;
  const { dispatch } = context;
  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    } else {
      //this else part is required because
      //if you try to edit a contact and goes edit form and
      //In that page clicking Add contact menu immediately not working without this
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        profession: '',
        selectedValue: 'personal'
      });
    }
  }, [selectedContact]);

  const handleChange = e => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (
      contact.firstName === '' ||
      !validator.isLength(contact.firstName, { min: 3, max: 5 })
    ) {
      setErrors({
        ...errors,
        firstName: 'please provide firstName with 3 and 5 character'
      });
      return;
    }
    if (contact.lastName === '') {
      setErrors({
        ...errors,
        lastName: 'please provide lastName'
      });
      return;
    }
    if (contact.email === '' || !validator.isEmail(contact.email)) {
      setErrors({
        ...errors,
        email: 'please provide valid email'
      });
      return;
    }
    if (contact.profession === '') {
      setErrors({
        ...errors,
        profession: 'please provide profession'
      });
      return;
    }
    const { id } = contact;
    //posting data to server
    if (id) {
      try {
        const res = await axios.put(`/api/contacts/${id}`, contact);

        dispatch({ type: 'UPDATE_CONTACT', payload: res.data });
        dispatch({ type: 'CLEAR_SELECTED_CONTACT' });

        props.history.push('/');
      } catch (e) {
        dispatch({ type: 'CONTACT_ERROR', payload: e.message });
      }
    } else {
      try {
        const res = await axios.post('/api/contacts', contact);

        dispatch({ type: 'ADD_CONTACT', payload: res.data });

        props.history.push('/');
      } catch (e) {
        dispatch({ type: 'CONTACT_ERROR', payload: e.message });
      }
    }
  };

  const { firstName, lastName, email, profession, selectedValue } = contact;
  return (
    <React.Fragment>
      <h3>{selectedContact ? 'Edit Contact' : 'Add Contact'}</h3>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label='FirstName'
          type='text'
          name='firstName'
          value={firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <TextInputGroup
          label='lastName'
          type='text'
          name='lastName'
          value={lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <TextInputGroup
          label='email'
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextInputGroup
          label='profession'
          type='text'
          name='profession'
          value={profession}
          onChange={handleChange}
          error={errors.profession}
        />

        <p>
          <RadioInputGroup
            label='personal'
            name='selectedValue'
            type='radio'
            value='personal'
            onChange={handleChange}
            selectedValue={selectedValue}
          />
          <RadioInputGroup
            label='professional'
            name='selectedValue'
            type='radio'
            value='professional'
            onChange={handleChange}
            selectedValue={selectedValue}
          />
        </p>
        <button className='btn waves-effect waves-light' type='submit'>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};
export default withRouter(ContactForm);
