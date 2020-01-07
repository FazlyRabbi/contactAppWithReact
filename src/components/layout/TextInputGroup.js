import React from 'react';
import { useContext } from 'react';
import { ContactContext } from '../../contexts/Contact.context';
const TextInputGroup = props => {
  const context = useContext(ContactContext);
  const { selectedContact } = context.state;
  const { label, type, name, value, onChange, error } = props;
  return (
    <div className='input-field'>
      <label htmlFor={label} className={selectedContact && 'active'}>
        {label}
      </label>
      <input type={type} onChange={onChange} value={value} name={name} />
      <span className='helper-text'>{error && error}</span>
    </div>
  );
};

export default TextInputGroup;
