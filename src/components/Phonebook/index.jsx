import { Component } from 'react';
import css from './Phonebook.module.css';
import shortid from 'shortid';

import Form from 'components/Form';
import { Contacts } from '../Contacts';
import Notification from 'components/Notification';

export let userContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

class Phonebook extends Component {
  state = {
    contacts: userContacts,
    filter: '',
  };

  

  //Функция фильтра
  handleFilterChange = event => {
    let filterInData = event.currentTarget.value;
    this.setState({ filter: event.currentTarget.value });
    this.filterContacts(filterInData);
  };

  filterContacts = filterInData => {
    let searchData = filterInData.toString().toUpperCase();
    console.log(searchData);

    if (searchData !== '') {
      return this.setState({
        contacts: userContacts.filter(search =>
          search.name.toUpperCase().includes(searchData)
        ),
      });
    }
    return this.setState({ contacts: userContacts });
  };

  //Функция фильтра

  //Функция удаления

  deleteContact = e => {
    let deleted = e.currentTarget.id.toString();
    console.log(e.currentTarget);

    
    //let indexDelete = userContacts.findIndex();
    //userContacts.splice(indexDelete, 1);

    userContacts = userContacts.filter(item => item.id !== deleted);
    this.setState({
      contacts: userContacts,
    });
    console.log(userContacts);
  };

  //Функция удаления

  

  //Функция добавления контакта
  addContact = inputData => {
    const name = inputData.name;
    const number = inputData.number;
    const contactId = shortid.generate().toString();
    console.log(name, number, contactId);

  

    let userData = {
      number: number,
      name: name,
      id: contactId,
    };

    let data = [];
    data.push(userData);

    let updateData = userContacts.find(
      item => item.name.toUpperCase() === userData.name.toUpperCase()
    );
    console.log(userData.name.toUpperCase());
    console.log(updateData);
    if (updateData !== undefined) {
      return alert(userData.name.toUpperCase() + ' is already in contacts');
    }
    //userContacts = userContacts.push(userData);
    userContacts = userContacts.concat(data);
    console.log(userContacts);
    this.setState({contacts: userContacts,});
    
   
  };

  //Функция добавления контакта
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    userContacts = JSON.parse(contacts);
    console.log("component did mount!");
    this.setState({ contacts: userContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.contacts);
    console.log(userContacts);
    if (userContacts !== prevState.contacts) {
      console.log("contacts update");
      localStorage.setItem('contacts', JSON.stringify(userContacts));
    }
  }

  render() {
    return (
      <div className={css.form}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h1>Contacts</h1>
        {this.state.contacts.length === 0 && (
          <Contacts
            filter={this.state.filter}
            contacts={this.state.contacts}
            //id={this.state.contacts.id}
            onChange={this.handleFilterChange}
            deleteContact={this.deleteContact}
            //contactId = {this.state.contacts.id}
          >
            {userContacts.length !== 0 && (
              <Notification message="No Contact with this name" />
            )}
          </Contacts>
        )}
        {this.state.contacts.length !== 0 && (
          <Contacts
            filter={this.state.filter}
            contacts={this.state.contacts}
            // id={this.state.contacts.id}
            onChange={this.handleFilterChange}
            deleteContact={this.deleteContact}
            //contactId = {this.state.contacts.id}
          />
        )}
      </div>
    );
  }
}

export default Phonebook;
