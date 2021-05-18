import React, { useReducer, useRef, useState } from 'react'
import reducer from './reducer'
import Modal from './Modal'

const initialState = {
  Person: [],
  ShowModal: false,
  Modalcontent: '',
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const MaleRef = useRef(null)
  const FemaleRef = useRef(null)
  const JobRef = useRef(null)
  const [action, setAction] = useState('Save')
  const [person, setPerson] = useState({
    Id: '',
    Name: '',
    Phone: '',
    DoB: '',
    Gender: '',
    Job: '',
  })

  const handleclick = () => {
    if (
      person.Name &&
      person.Phone &&
      person.DoB &&
      person.Gender &&
      person.Job
    ) {
      if (action === 'Save') {
        dispatch({ type: 'Add_Person', payload: person })
        setPerson({
          Id: '',
          Name: '',
          Phone: '',
          DoB: '',
          Gender: '',
          Job: '',
        })
        FemaleRef.current.checked = false
        MaleRef.current.checked = false
        JobRef.current.checked = false
        return
      } else if (action === 'Edit') {
        dispatch({ type: 'Edit_PERSON', payload: person })
        setPerson({
          Id: '',
          Name: '',
          Phone: '',
          DoB: '',
          Gender: '',
          Job: '',
        })
        FemaleRef.current.checked = false
        MaleRef.current.checked = false
        JobRef.current.checked = false
        setAction('Save')
        return
      }
    }
  }
  const handleclear = () => {
    setAction('Save')
    setPerson({
      Id: '',
      Name: '',
      Phone: '',
      DoB: '',
      Gender: '',
      Job: '',
    })
    FemaleRef.current.checked = false
    MaleRef.current.checked = false
    JobRef.current.checked = false
  }
  const HandleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'Job') {
      if (e.target.checked) {
        setPerson({ ...person, [name]: value })
        return
      }
      setPerson({ ...person, [name]: '' })
      return
    }
    setPerson({ ...person, [name]: value })
  }

  const EditPerson = (id) => {
    const person = state.Person.find((person) => person.Id === id)
    setPerson(person)
    person.Gender === 'Male'
      ? (MaleRef.current.checked = true)
      : (FemaleRef.current.checked = true)
    JobRef.current.checked = true
    setAction('Edit')
  }
  const RemovePerson = (id) => {
    dispatch({ type: 'REMOVE_PERSON', payload: id })
  }
  const CloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
  return (
    <>
      <div className='container'>
        <div className='content'>
          <div className='form'>
            {state.ShowModal && (
              <Modal
                modalcontent={state.Modalcontent}
                closemodal={CloseModal}
              />
            )}
            <input
              type='text'
              placeholder='Enter Name'
              name='Name'
              value={person.Name}
              onChange={HandleChange}
            />
            <input
              type='number'
              placeholder='Enter Number'
              name='Phone'
              value={person.Phone}
              onChange={HandleChange}
              style={{ marginLeft: '5px' }}
            />
            <input
              type='date'
              name='DoB'
              value={person.DoB}
              style={{ marginLeft: '5px' }}
              onChange={HandleChange}
            />
          </div>
          <div className='form'>
            <input
              type='radio'
              name='Gender'
              value='Male'
              onChange={HandleChange}
              ref={MaleRef}
            />
            Male
            <input
              type='radio'
              name='Gender'
              value='Female'
              onChange={HandleChange}
              ref={FemaleRef}
            />
            Female
          </div>
          <div className='form'>
            <input
              type='checkbox'
              name='Job'
              value='Developer'
              onChange={HandleChange}
              ref={JobRef}
            />
            Are You Developer
          </div>
          <button className='btn' type='button' onClick={handleclick}>
            Save
          </button>
          <button className='btn' type='button' onClick={handleclear}>
            Clear
          </button>
        </div>
        <div className='content _content'>
          {state.Person.map((person) => {
            const { Id, Name, Phone, DoB, Gender, Job } = person

            return (
              <div key={Id}>
                <div style={{ width: '40%', display: 'inline-block' }} key={Id}>
                  <p>
                    My name is {Name} and Phone is {Phone}.<br />I m {Gender}{' '}
                    and Date of birth is {DoB}. i m {Job}
                  </p>
                </div>
                <div
                  style={{
                    width: '40%',
                    display: 'inline-block',
                    textAlign: 'right',
                  }}
                >
                  <button
                    className='btn btn-remove'
                    onClick={() => EditPerson(Id)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-remove'
                    onClick={() => RemovePerson(Id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App

