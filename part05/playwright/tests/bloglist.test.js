const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('BlogApp login page testing', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User',
                username: 'AppUser',
                password: 'Secret'
            }
        })

        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User2',
                username: 'AppUser2',
                password: 'Secret2'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        // form is visible
        const form = await page.getByTestId('loginform')
        await expect(form).toBeVisible()

        // username textbox is visible
        await expect(form).toContainText('username')
        const username = page.getByRole('textbox').first()
        await expect(username).toBeVisible()

        // password textbox is visible
        await expect(form).toContainText('password')
        const password = page.getByRole('textbox').last()
        await expect(password).toBeVisible()

        // submit button is visible
        const button = await page.getByRole('button')
        await expect(button).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'AppUser', 'Secret')

            // notification and userinfo are correct
            await expect(page.getByText('Test User logged in')).toBeVisible()
            const notification = await page.locator('.success')
            await expect(notification).toContainText('Login successful')
            await expect(notification).toHaveCSS('color', 'rgb(0, 128, 0)')
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'AppUser', 'WrongPassword')

            // error notification shows up
            const notification = await page.locator('.error')
            await expect(notification).toContainText('Wrong credentials')
            await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')

            // login page is still displayed
            await expect(page.getByText('log in to application')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'AppUser', 'Secret')
        })

        test('a new blog can be created', async ({ page }) => {
            // filling textboxes and submitting form
            await createBlog(page, 'Test Title', 'Test Author', 'https://playwright.dev/')

            const addedBlog = await page.locator('.collapsed')
            await expect(addedBlog).toBeVisible()
        })

        test('Like button works', async ({ page }) => {
            // create new blog
            await createBlog(page, 'Test Title', 'Test Author', 'https://playwright.dev/')

            // open all info
            await page.getByRole('button', { name: 'view' }).click()

            // check if initial likes is 0
            const initialLikes = await page.getByText('likes 0')
            await expect(initialLikes).toBeVisible()

            // click like button
            await page.getByRole('button', { name: 'like' }).click()

            // check if likes is updated to 1
            const updatedLikes = await page.getByText('likes 1')
            await expect(updatedLikes).toBeVisible()
        })

        test('Deleting blogs work', async ({ page }) => {
            // create new blog
            await createBlog(page, 'Test Title', 'Test Author', 'https://playwright.dev/')

            // check for blog
            const addedBlog = await page.locator('.collapsed')
            await expect(addedBlog).toBeVisible()

            // open all info
            await page.getByRole('button', { name: 'view' }).click()

            // remove blog
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()

            // expecting blog to not show anymore
            await expect(addedBlog).not.toBeVisible()
        })

        test('Only blog added user can see delete button', async ({ page }) => {
            // create new blog
            await createBlog(page, 'Test Title', 'Test Author', 'https://playwright.dev/')

            // checking for delete button (should be visible)
            await page.getByRole('button', { name: 'view' }).click()
            let deleteButton = page.getByRole('button', { name: 'remove' })
            await expect(deleteButton).toBeVisible()

            // switching users
            page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'AppUser2', 'Secret2')

            // checking for delete button (shouldn't be visible)
            await page.getByRole('button', { name: 'view' }).click()
            deleteButton = page.getByRole('button', { name: 'remove' })
            await expect(deleteButton).not.toBeVisible()
        })

        test('Blogs are sorted by likes', async ({ page }) => {
            // creating a new blogs
            await createBlog(page, 'Test Title', 'Test Author', 'https://playwright.dev/')
            await createBlog(page, 'Test Title2', 'Test Author 2', 'https://playwright.dev/')

            // adding 2 likes to blog 1
            await page.getByRole('button', { name: 'view' }).click()
            for (let i = 0; i < 2; i++) {
                await page.getByRole('button', { name: 'like' }).click()
            }

            await page.reload()
            await page.waitForTimeout(20)

            // checking order of the blogs
            let blog1 = await page.getByRole('button', { name: 'view' }).first().locator('..')
            let blog2 = await page.getByRole('button', { name: 'view' }).last().locator('..')
            await expect(blog1).toContainText(' Title ')
            await expect(blog2).toContainText(' Title2 ')

            // adding 4 likes to the second blog
            await page.getByRole('button', { name: 'view' }).last().click()
            for (let i = 0; i < 4; i++) {
                await page.getByRole('button', { name: 'like' }).click()
            }

            await page.reload()
            await page.waitForTimeout(20)

            // The order of blogs should be flipped
            blog1 = await page.getByRole('button', { name: 'view' }).first().locator('..')
            blog2 = await page.getByRole('button', { name: 'view' }).last().locator('..')
            await expect(blog1).toContainText(' Title2 ')
            await expect(blog2).toContainText(' Title ')
        })
    })
})
