const initialBlogs = id =>[
    {
        title: "Test1",
        author: "Tester One",
        url: "test1.example.com",
        likes: 100,
        user: id
    },
    {
        title: "Test2",
        author: "Tester Two",
        url: "test2.example.com",
        likes: 10,
        user: id
    },
    {
        title: "Test3",
        author: "Tester Three",
        url: "test3.example.com",
        likes: 50,
        user: id
    }
]

module.exports = { initialBlogs }