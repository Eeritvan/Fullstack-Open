import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/blogform'

describe('Testing creation of a blog', () => {
    let container
    let mockHandler

    beforeEach(() => {
        mockHandler = vi.fn()

        container = render( <BlogForm logOut={() => {}}
            blogs={[]}
            setBlogs={() => {}}
            user={{}}
            notification={null}
            setNotification={() => {}}
            handleNewBlog={mockHandler}
        /> ).container
    })

    test('creation of a blog return correct info', async () => {
        const user = userEvent.setup()
        const title = container.querySelector('.title')
        const author = container.querySelector('.author')
        const url = container.querySelector('.url')
        const button = screen.getByText('create')

        const testTitle = 'Test Title'
        const testAuthor = 'Test Author'
        const testUrl = 'https://vitest.dev/'

        await user.type(title, testTitle )
        await user.type(author, testAuthor )
        await user.type(url, testUrl )
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][1]).toBe(testTitle)
        expect(mockHandler.mock.calls[0][2]).toBe(testAuthor)
        expect(mockHandler.mock.calls[0][3]).toBe(testUrl)
    })
})