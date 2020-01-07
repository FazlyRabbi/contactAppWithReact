import React, { Component } from 'react';
class ContactForm extends Component {
  constructor() {
    super();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.profession = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();
    const myValue = {
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      email: this.email.current.value,
      profession: this.profession.current.value
    };
    console.log(myValue);
  };
  render() {
    return (
      <React.Fragment>
        <h3>Contact Form</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='input-field'>
            <label htmlFor='firstName'>FirstName</label>
            <input
              type='text'
              ref={this.firstName}
              defaultValue='samim'
              name='firstName'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='lastName'>LastName</label>
            <input
              type='text'
              ref={this.lastName}
              defaultValue='Hasan'
              name='lastName'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              ref={this.email}
              defaultValue='s@gmail.com'
              name='email'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='profession'>Profession</label>
            <input
              type='text'
              ref={this.profession}
              defaultValue='web developer'
              name='profession'
            />
          </div>

          <button className='btn waves-effect waves-light' type='submit'>
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ContactForm;
