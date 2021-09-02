import React, { useState } from 'react'

const Button = (props) => 
  <>
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  </>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const len = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(len).fill(0))
  const [top, setTop] = useState(0)

  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * len))
  }

  const changeTop = (index) => {
    setTop(index)
  }

  const addVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    for(let i=0;i<len;i++){
      console.log("is ",vote[top], "smaller than", copy[i])
      if(vote[top]<copy[i]){
        console.log("yes")
        changeTop(i)
      }
      else console.log("no")
    }
  }

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <div>{anecdotes[selected]}</div>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={selectRandom} text="next quote"/>
      <h2>Anecdote with the Most Votes</h2>
      <div>{anecdotes[top]}</div>
      <p>has {vote[top]} votes</p>
    </div>
  )
}

export default App