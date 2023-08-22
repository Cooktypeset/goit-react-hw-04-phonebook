import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm"
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import  css from './App.module.css'

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formAddContact  = data => {
    const checkList = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === data.name.toLowerCase() ||
        contact.number === data.number
      );
    });
    if (checkList) {
      alert(`${data.name}, number: ${data.number} is already in contacts !`);
      return;
    }
    setContacts([
      ...contacts,
      { id: nanoid(), name: data.name, number: data.number },
    ]);
  };

  const  deleteContact= contactID => {
    setContacts(prev => prev.filter(contact => contact.id !== contactID));
  };

  const  changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normalize = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalize)
  );

  return (
    <div className={css.container}>
    <h2 className = {css.title}>Phonebook</h2>
      <ContactForm  onSubmit={formAddContact } />
      <h3 className = {css.title}>Contacts</h3>
      <Filter value={filter} onChange={changeFilter}/>
      <ContactList contacts={filterContacts} onDeleteContact={deleteContact} />
      </div>
  );
  }
