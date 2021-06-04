import React, { useState, useEffect } from 'react';
import Button from './component/button';
import Details from './component/details';
import Filter from './component/filter';
import Form from './component/form';
import services from './services/person'

const Phonebook = () => {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');

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
            setNewNumber('');
        } else if (!newNumber) {
            alert('Number filed is empty');
            setNewPerson('');
        } else {
            if (checkName.includes(newPerson)) {
                alert(`${newPerson} is already in the Phonebook`);
                setNewPerson('');
                setNewNumber('');
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
            }
        }
    }

    //filtering person list with the search value
    const filteredPerson = persons.filter(person => {
        return person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

    return (
        <div>
            <h3>Phonebook</h3>
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
                    <Details key={index} name={person.name} number={person.number} />
                )
            })}
        </div>
    )
}

export default Phonebook;