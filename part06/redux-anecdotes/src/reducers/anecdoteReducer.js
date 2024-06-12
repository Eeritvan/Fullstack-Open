import anecdoteService from '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteReducer = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
      addVote(state, action) {
          const newState = state.map(a => a.id === action.payload ? {...a, votes: a.votes + 1} : a)
          return newState.sort((b, a) => a.votes - b.votes)
      },
      addAnecdote(state, action) {
          return state.concat(action.payload)
      },
      setAnecdotes(state, action) {
          return action.payload
      }
    }
})

export const { addVote, addAnecdote,setAnecdotes } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const response = await anecdoteService.getAll()
        dispatch(setAnecdotes(response))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const response = await anecdoteService.addNew(content)
        dispatch(addAnecdote(response))
    }
}

export const addNewVote = (content) => {
    return async dispatch => {
        await anecdoteService.addVote(content)
        dispatch(addVote(content.id))
    }
}

export default anecdoteReducer.reducer