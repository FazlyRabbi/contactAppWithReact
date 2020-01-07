import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import AddContact from '../contacts/AddContact';
import EditContact from '../contacts/EditContact';
import Contacts from '../contacts/Contacts';
import Header from '../layout/Header';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import { ContactProvider } from '../../contexts/Contact.context';
//import '../styles/style.css';
const App = () => (
  <div className='container'>
    <ContactProvider>
      <Header />
      <Switch>
        <Route path='/' exact component={Contacts} />
        <Route path='/add' component={AddContact} />
        <Route path='/edit/:id' component={EditContact} />
        <Route path='/about' exact component={About} />
        <Route component={NotFound} />
      </Switch>
    </ContactProvider>
  </div>
);
export default App;
