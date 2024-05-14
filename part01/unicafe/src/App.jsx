import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick()}> {text} </button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(good + bad*-1) / all} />
          <StatisticLine text="positive" value={(good / all)*100 + " %"} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <p> No feedback given</p>
    </div>
  )
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => () => setGood(good + 1)
  const neutralFeedback = () => () => setNeutral(neutral + 1)
  const badFeedback = () => () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} text="good" />
      <Button handleClick={neutralFeedback} text="neutral" />
      <Button handleClick={badFeedback} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App