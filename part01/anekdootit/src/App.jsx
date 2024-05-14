import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Section = ({header, anecdotes, votes, func}) => (
  <div>
    <h1>{header}</h1>
    <p>{anecdotes[func]}</p>
    <p>has {votes[func]} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostvotes, setMostvotes] = useState(0)

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    
    if (newVotes[selected] > newVotes[mostvotes]) {
      setMostvotes(selected)
    }
  }

  return (
    <div>
      <Section header="Anecdote of the day" anecdotes={anecdotes} votes={votes} func={selected} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />
      <Section header="Anecdote with the most votes" anecdotes={anecdotes} votes={votes} func={mostvotes} />
    </div>
  )
}

export default App