const NewAnecdote = ({ create }) => {
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        if (content.length > 4) {
            create.mutate(content)
        } else {
            console.log("too short!")
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <input name="content"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote