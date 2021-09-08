import React, { useState, useEffect } from 'react'
import personService from "./services/persons"

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage===null) {
    return null
  }
    if(errorMessage){
      return <div className="error">
       {errorMessage}
      </div>
    }
  else return (
    <div className="success">
      {successMessage}
    </div>
  )
}

const Filter = ({searchedNameValue, searchedNameOnChange, personArray}) => {
  return(
    <>
    <div>filter shown with:
      <input
        value={searchedNameValue}
        onChange={searchedNameOnChange}
      />
    </div>
    <ul>
      {personArray.filter(person => person.name.toUpperCase()===searchedNameValue.toUpperCase())
      .map(person => <li key={person.name}>{person.name} {person.number}</li>)
      }
    </ul>
    </>
  )}
const Persons = ({persons,setPersons, setSuccessMessage, setErrorMessage}) => {
  const deletePerson = (removedPerson) => {
    if(window.confirm(`Delete ${removedPerson.name}?`)){
      console.log(`before ${removedPerson.id}`)
    personService
      .remove(removedPerson.id)
      .then(()=>{
        setPersons(persons.filter(person=>person.id!==removedPerson.id))
        setSuccessMessage(`${removedPerson.name} is deleted.`)
        setTimeout(() => {          setSuccessMessage(null)        }, 5000)
      })
      .catch(()=>{
        setErrorMessage(`${removedPerson.name} has already been deleted.`)
        setTimeout(() => {          setErrorMessage(null)        }, 5000)
        setPersons(persons.filter(person=>person.id!==removedPerson.id))
      })
    }
  }
  return(
    <ul>
        {
        persons.map(person => 
        <div key={person.name}>
          <li>{person.name} {person.number}</li>
          <button onClick={()=>deletePerson(person)}>delete</button>
        </div>
        )}
    </ul>
  )}
const PersonForm = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => 
{
  return(
  <>
  <form onSubmit={onSubmit}>
    <div>name:
      <input
        value={nameValue}
        onChange={nameOnChange}
      />
    </div>
    <div>number:
      <input
        value={numberValue}
        onChange={numberOnChange}
        />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </>
)}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('05xxxxxxxxx')
  const [searchedName, setSearchedName] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    console.log("effect")
    personService.getAll()
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
  },[])
  console.log("render", persons.length, "persons")

  const addName = (event) => {
    event.preventDefault()
    let exists=0
    let id=-1
    for(const person of persons){
      if(person.name===newName){
        exists=1
        id=person.id
        break
      }
    }
    if(exists){
      if(window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)){
        let updatedObject = {
          name: newName ,
          number: newNumber
        }
        personService
          .update(id, updatedObject)
          .then(response => {
            updatedObject.id=response.data.id
            setPersons(persons.map(person=> person.name!==updatedObject.name ? person : updatedObject))
            setSuccessMessage(`${updatedObject.name}'s number is updated.`)
            setTimeout(() => {          setSuccessMessage(null)        }, 5000)
            setNewName("")
            setNewNumber("")
          })
          .catch(()=>{
            setErrorMessage(`${updatedObject.name} has already been deleted.`)
            setTimeout(() => {          setErrorMessage(null)        }, 5000)
            setPersons(persons.filter(person=> person.name!==updatedObject.name))
          })
      }
    }
    else {
      const personObject = {
        name: newName ,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setSuccessMessage(`${personObject.name} is added.`)
        setTimeout(() => {          setSuccessMessage(null)        }, 5000)
        setNewName("")
        setNewNumber("")
      })
    }  
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
 
  const handleSearchedNameChange = (event) => {
    setSearchedName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage}></Notification>
      <h2>Phonebook</h2>
      <Filter searchedNameValue={searchedName} searchedNameOnChange={handleSearchedNameChange}
        personArray={persons}
      ></Filter>
      <h3>Add new number</h3>
      <PersonForm onSubmit={addName} 
        nameValue= {newName} nameOnChange={handleNameChange}
        numberValue= {newNumber} numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}></Persons>
    </div>
  )
}
export default App
