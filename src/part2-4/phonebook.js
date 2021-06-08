import React, { useState, useEffect } from 'react';
import Button from './component/button';
import Details from './component/details';
import Filter from './component/filter';
import Form from './component/form';
import Message from './component/message';
import services from './services/person'

const Phonebook = () => {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchPerson = () => {
        services
            .getAll()
            .then(response => {
                //console.log(response.data);
                setPersons(response.data);
            }).catch(error => {
                console.log('Error', error);
            })
    }
    useEffect(fetchPerson, []);

    const checkName = persons.map(person => person.name);
    //console.log(checkName);

    //Stroing the value of name input field in newPeron
    const handleNameChange = (e) => {
        //console.log(e.target.value);
        setNewPerson(e.target.value);
    }

    //Storing the value of number input filed in newNumber
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
        //console.log(e.target.value)
    }

    //Storing the value of searh input to search
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const addPerson = (e) => {
        e.preventDefault();
        //console.log(e.target);
        const personObj = {
            name: newPerson,
            number: newNumber
        }
        if (!newPerson) {
            alert('Name filed is empty');
        } else if (!newNumber) {
            alert('Number filed is empty');
        } else {
            if (checkName.includes(newPerson)) {
                let confirm = window.confirm(`${newPerson} aleardy exits. Do you want to update phone number?`);
                if (confirm) {
                    let id = 0;
                    for (let i = 0; i < persons.length; i++) {
                        if (persons[i].name.includes(newPerson)) {
                            id = persons[i].id;
                        }
                    }
                    //console.log('ID', id);
                    services
                        .update(id, personObj)
                        .then(response => {
                            //console.log(response.data);
                            setPersons(
                                persons.map((person) =>
                                    //checks for id: if found replaces that person with response.data
                                    person.id !== id ? person : response.data
                                )
                            );
                            //console(response.data);
                            setNewPerson('');
                            setNewNumber('');
                        }).catch(error => {
                            setErrorMessage(`${personObj.name} is already removed from Server!`);
                        })
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000)
                }
            } else {
                services
                    .create(personObj)
                    .then(response => {
                        //prints the person object used in post method
                        //console.log(response.data);
                        setPersons(persons.concat(response.data));
                        setNewPerson('');
                        setNewNumber('');
                    })
                    .catch(error => {
                        setErrorMessage(error.response.data.error);
                    })
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000)
            }
        }
    }

    //filtering person list with the search value
    const filteredPerson = persons.filter(person => {
        return person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

    const handleDelete = (id, name) => {
        //console.log('Person', id, name);
        let newPersonList = persons.filter(person => person.id !== id);
        let confirm = window.confirm(`Pres OK to delete ${name}`);

        if (confirm) {
            services
                .deletePerson(id)
                .then(response => {
                    //console.log(`${id} deleted`);
                    setPersons(newPersonList);
                })
        }
    }

    return (
        <div>
            <h3>Phonebook</h3>
            <Message message={errorMessage} />
            <Filter search={search} handleSearch={handleSearch} />
            <h3>Add new Perons</h3>
            <Form
                addPerson={addPerson} newPerson={newPerson} handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange} newNumber={newNumber}
            />
            <Button addPerson={addPerson} />
            <h3>Numbers</h3>
            {filteredPerson.map((person, index) => {
                return (
                    <Details key={index} person={person} handleDelete={handleDelete} />
                )
            })}
        </div>
    )
}

export default Phonebook;