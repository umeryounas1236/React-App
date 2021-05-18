const reducer = (state, action) => {
  if (action.type === 'Add_Person') {
    const person = action.payload
    person.Id = new Date().getTime().toString()
    const newPerson = [...state.Person, person]
    return {
      ...state,
      Person: newPerson,
      ShowModal: true,
      Modalcontent: 'Item Added',
    }
  }
  if (action.type === 'REMOVE_PERSON') {
    const newPerson = state.Person.filter(
      (person) => person.Id !== action.payload
    )
    return {
      ...state,
      Person: newPerson,
      ShowModal: true,
      Modalcontent: 'Item Removed',
    }
  }
  if (action.type === 'Edit_PERSON') {
    const id = action.payload.Id
    const index = state.Person.findIndex((person) => person.Id === id)
    state.Person[index] = action.payload
    return {
      ...state,
      ShowModal: true,
      Modalcontent: 'Edit Done',
    }
  }
  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      ShowModal: false,
      Modalcontent: '',
    }
  }
}

export default reducer
