import React, { Component, useReducer, useEffect } from 'react';
import axios from 'axios';
export const ContactContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'EDIT_CONTACT':
      return {
        ...state,
        selectedContact: action.payload
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    case 'SEARCH_FILTER':
      return {
        ...state,
        filterText: action.payload
      };
    case 'CONTACT_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'CLEAR_SELECTED_CONTACT':
      return {
        ...state,
        selectedContact: null
      };
    default:
      return state;
  }
};

export const ContactProvider = props => {
  const initialState = {
    contacts: [],
    selectedContact: null,
    filterText: '',
    error: ''
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await axios.get('/api/contacts');
        dispatch({ type: 'GET_CONTACTS', payload: res.data });
      } catch (e) {
        dispatch({ type: 'CONTACT_ERROR', payload: e.message });
      }
    };
    getContacts();
  }, []);

  // async componentDidMount() {
  //   try {
  //     const res = await axios.get('http://localhost:3000/contacts');
  //     this.dispatch({ type: 'GET_CONTACTS', payload: res.data });
  //   } catch (e) {
  //     this.dispatch({ type: 'CONTACT_ERROR', payload: e.message });
  //   }
  // }
  // dispatch = action => this.setState(state => reducer(state, action));

  return (
    <ContactContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
