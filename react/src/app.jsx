import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state)

    const createData = data => {
        dispatch({ type: data })
    }

    return (
        <div>
            <div>
                {count}
            </div>
            <button onClick={() => createData('INCREMENT')}>
                plus
            </button>
            <button onClick={() => createData('DECREMENT')}>
                minus
            </button>
            <button onClick={() => createData('ZERO')}>
                zero
            </button>
        </div>
    )
}
export default App