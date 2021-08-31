import React, { useState } from 'react'

const Stats = ({good, neutral, bad}) => {
  let all=good+neutral+bad
  if(all<=0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
  <>
  <StatisticLine text="Good" value={good}/>
  <StatisticLine text="Neutral" value={neutral}/>
  <StatisticLine text="Bad" value={bad}/>
  <StatisticLine text="All" value={all}/>
  <StatisticLine text="Average" value={(good-bad)/all}/>
  <StatisticLine text="Positive (percentage)" value={((good/all)*100)+" %"}/>
  </>
  )
}

const StatisticLine = ({text, value}) => 
<>
<table>
  <tbody>
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  </tbody> 
</table>
</>

const Header = props => <h2>{props.text}</h2>
const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)
  }
  return (
    <div>
      <Header text="Give feedback"/>
      <Button handleClick={() => setToGood(good+1)} text="Good"/>
      <Button handleClick={() => setToNeutral(neutral+1)} text="Neutral"/>
      <Button handleClick={() => setToBad(bad+1)} text="Bad"/>
      <Header text="Statistics"/>
      <Stats good={good} neutral={neutral} bad={bad}/>  
      </div>
  )
}

export default App