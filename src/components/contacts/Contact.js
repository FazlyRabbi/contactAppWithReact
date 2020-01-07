import React, { memo, useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ContactContext } from '../../contexts/Contact.context';
import toggleConatctHooks from '../../hooks/toggleInput.hook';
//this reference should be change in functional component
//state reference should be change
//context(if using) - direct access of dispatch

const Contact = props => {
  const context = useContext(ContactContext);
  const { dispatch } = context;
  const [toggleContact, setToggleContact] = toggleConatctHooks(false);

  const handleDelete = id => async () => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
      dispatch({ type: 'CLEAR_SELECTED_CONTACT' });
    } catch (e) {
      dispatch({ type: 'CONTACT_ERROR', payload: e.message });
    }
  };
  const handleEdit = contact => () => {
    dispatch({ type: 'EDIT_CONTACT', payload: contact });
  };

  const {
    contact,
    contact: { id, firstName, lastName, email, profession }
  } = props;
  return (
    <div className='card'>
      <div className='card-content z-depth-3'>
        <h6 className='card-title'>
          {firstName} {lastName}
          <a href='#!' onClick={setToggleContact}>
            <i className='material-icons medium right'>
              {toggleContact ? 'arrow_drop_up' : 'arrow_drop_down'}
            </i>
          </a>
          <a href='#!' onClick={handleDelete(id)}>
            <i className='material-icons right'>delete</i>
          </a>
          <Link to={`/edit/${id}`} onClick={handleEdit(contact)}>
            <i className='material-icons right'>edit</i>
          </Link>
        </h6>
        {toggleContact && (
          <ul>
            <li>{email}</li>
            <li>{profession}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(Contact);
