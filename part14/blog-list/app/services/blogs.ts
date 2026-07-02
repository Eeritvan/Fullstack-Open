// id, title, author, url, and likes
const blogs = [
  {
    id: 1,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 15
  },
  {
    id: 2,
    title: 'The Law of Leaky Abstractions',
    author: 'Joel Spolsky',
    url: 'https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/',
    likes: 5
  },
  {
    id: 3,
    title: 'Ajax: A New Approach to Web Applications',
    author: 'Jesse James Garrett',
    url: 'https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf',
    likes: 10
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, url: string, author: string) => {
  blogs.push({ id: nextId++, title, url, author, likes: 0 })
}

export const getBlogById = (blogId: number) => {
  return blogs.find(b => b.id === blogId)
}

export const addLikeToBlog = (blogId: number) => {
  const blog = blogs.find(b => b.id === blogId)
  if (blog) {
    blog.likes += 1
  }
}
