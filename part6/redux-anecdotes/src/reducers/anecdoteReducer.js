import anecdoteService from "../services/anecdotes"

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type:"VOTE",
      data: {newAnecdote}
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case "VOTE":
      return state.map(anecdote => anecdote.id===action.data.newAnecdote.id ? {...anecdote, votes:anecdote.votes+1} : anecdote)
    case "NEW_ANECDOTE":
      return state.concat(action.data)
    case "INIT_ANECDOTES":
      return action.data
    default:
        return state
  }
}



export default reducer
