import React from 'react'
  
const Persons = ({persons, handleRemove}) => (
    <ul>
      {persons.map(person => <Person key={person.id} person={person} handleRemove={handleRemove} />)}
    </ul>
 )
  
 const Person = ({person, handleRemove}) => (
    <li key={person.name}>{person.name} {person.number} <button onClick={() => handleRemove(person)}>Delete</button></li>
 )

export default Persons