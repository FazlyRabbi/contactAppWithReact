import React, { useContext } from 'react';
import Contact from './Contact';
import { ContactContext } from '../../contexts/Contact.context';
import SearchFilter from './SearchFilter';
const Contacts = () => {
  const context = useContext(ContactContext);
  const { contacts, filterText } = context.state;
  const filteredList = contacts.filter(
    contact =>
      contact.firstName.toLowerCase().indexOf(filterText) !== -1 ||
      contact.lastName.toLowerCase().indexOf(filterText) !== -1
  );
  return (
    <React.Fragment>
      <h3>Contacts</h3>
      <SearchFilter />
      {filteredList.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </React.Fragment>
  );
};

export default Contacts;
