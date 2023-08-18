import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',  
    }


handleChange = e => {
    const { name, value } = e.target;
    this.setState({
        [name]: value,
    });
};
handleSubmit = e => {
    e.preventDefault();
    const { onAddContact } = this.props;
    onAddContact(this.state);
    this.setState({ name: '', number: '' });
};
render() {
    const { name, number } = this.state;

    return(
     <form onSubmit={this.handleSubmit} className={css.form}>
        <label className={css.subTitle}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. 
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChange}
          />
        </label>

        <label className={css.subTitle}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Enter your number"
            value={number}
                onChange={this.handleChange}
             required
          />
        </label>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
};