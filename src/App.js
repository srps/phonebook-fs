import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const Filter = ({ filter, handleFilter }) => (
  <div>
    Filter shown with <input onChange={handleFilter} value={filter} />
  </div>
);

const PersonsForm = ({
  name,
  handleName,
  number,
  handleNumber,
  handleSubmit,
}) => (
  <form>
    <div>
      name: <input onChange={handleName} value={name} />
    </div>
    <div>
      number: <input onChange={handleNumber} value={number} />
    </div>
    <div>
      <button type="submit" onClick={handleSubmit}>
        add
      </button>
    </div>
  </form>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  // Button Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    existingPerson === undefined
      ? createPerson(newPerson)
      : updatePerson({ ...existingPerson, number: newNumber });
  };

  const handleRemovePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService
        .remove(personToRemove.id)
        .then((returnedPerson) => {
          setPersons(
            persons.filter((person) =>
              person.id !== personToRemove.id ? true : false
            )
          );
          setMessage(`${personToRemove.name} removed from the Phonebook`)
          setTimeout(() => {
            setMessage(null)
          },2000)
        })
        .catch((error) => {
          const personNotRemoved = persons.find(
            (person) => person.id === personToRemove.id
          );
          personNotRemoved === undefined
            ? setErrorMessage(error)
            : setErrorMessage(`${personNotRemoved.name} has already been removed from the Phonebook`);
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        });
    }
  };

  // Input State Handlers
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };

  // Helper functions
  const filterPersons = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().indexOf(newFilter.toLowerCase()) === -1
        ? false
        : true
    );
  };

  const createPerson = (person) => {
    personService
      .create(person)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`${returnedPerson.name} added to the Phonebook`)
          setTimeout(() => {
            setMessage(null)
          },2000)
      })
      .catch((error) => {
        setErrorMessage(`${newName} is already in the Phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      });
  };

  const updatePerson = (person) => {
    if (window.confirm(`Update ${person.name}?`)) {
      personService.update(person.id, person).then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={true} />
      <Notification message={message} isError={false}/>
      <Filter filter={newFilter} handleFilter={handleNewFilter} />
      <h2>Add a new</h2>
      <PersonsForm
        name={newName}
        handleName={handleNewName}
        number={newNumber}
        handleNumber={handleNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons()} handleRemove={handleRemovePerson} />
    </div>
  );
};

export default App;
