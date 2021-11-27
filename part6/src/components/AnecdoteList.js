import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification} from "../reducers/notificationReducer"

const AnecDoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter.toUpperCase())

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
    }
    return(
        anecdotes
        .filter(anecdote => anecdote.content.toUpperCase().search(filter)!==-1))
        .sort(function (a,b){
          return b.votes - a.votes
        })
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>       
        )
}

export default AnecDoteList