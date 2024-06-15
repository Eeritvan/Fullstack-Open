import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/blog'
import BlogForm from '../components/blogform.jsx'

describe('Testing blog component', () => {
    let container
    const mockHandler = vi.fn()

    beforeEach(() => {
        const blog = {
            title: 'testing with vitest',
            url: 'https://vitest.dev/',
            likes: 10,
            author: 'vitest',
            user: {
                username: 'Tester',
                name: 'Test user',
                id: 'b3672f0e703424079c912'
            },
        }

        container = render( <Blog blog={blog}
            allBlogs={[]}
            setBlogs={() => {}}
            user={{}}
            setNotification={() => {}}
            addLike={mockHandler}
        /> ).container
    })

    test('blog only renders title and author', () => {
        const collapsed = container.querySelector('.collapsed')
        expect(collapsed.style.cssText).toBe('')

        const visible = container.querySelector('.visible')
        expect(visible.style.cssText).toBe('display: none;')
    })

    test('blog renders all information once button is pressed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const collapsed = container.querySelector('.collapsed')
        expect(collapsed.style.cssText).toBe('display: none;')

        const visible = container.querySelector('.visible')
        expect(visible.style.cssText).toBe('')
    })

    test('like button is pressed twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

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