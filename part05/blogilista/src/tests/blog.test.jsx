import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/blog'

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