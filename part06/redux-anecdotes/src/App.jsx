
import { useReducer } from 'react'
import notificationContext from './NotificationContext'

import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, addNew, addVote } from './services/anecdotes'

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

const App = () => {
    const [notification, dispatchNotification] = useReducer(notificationReducer, '')

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation({
        mutationFn: addNew,
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], [...anecdotes, anecdote])
            dispatchNotification({
                type: 'SET',
                payload: `Added anecdote '${anecdote.content}'`
            })
            setTimeout(() => { dispatchNotification({type: 'CLEAR'}) }, 5000)
        }
    })

    const newVoteMutation = useMutation({
        mutationFn: addVote,
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const newState = anecdotes.map(a => a.id === anecdote.id ? {...a, votes: a.votes + 1} : a)
            newState.sort((b, a) => a.votes - b.votes)
            queryClient.setQueryData(['anecdotes'], newState)
            dispatchNotification({
                type: 'SET',
                payload: `You voted for ${anecdote.content}`
            })
            setTimeout(() => { dispatchNotification({type: 'CLEAR'}) }, 5000)
        }
    })

    // getting data
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: false
    })
    if ( result.isLoading ) {
        return <div>anecdote service is not available due to problems in server</div>
    }

    // order by votes
    let sorted = [];
    if (result.data) {
        sorted = [...result.data].sort((b, a) => a.votes - b.votes);
    }

    return (
        <notificationContext.Provider value={[notification, dispatchNotification]}>
            <div>
                <h2>Anecdotes</h2>
                <Notification />
                {/*<Filter />*/}
                <AnecdoteList anecdotes={sorted} vote={newVoteMutation}/>
                <NewAnecdote create={newAnecdoteMutation} />
            </div>
        </notificationContext.Provider>
    )
}

export default App