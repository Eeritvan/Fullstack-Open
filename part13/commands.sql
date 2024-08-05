CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text, url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES 
(
  'Michael Chan', 
  'https://reactpatterns.com/', 
  'React patterns'
);

INSERT INTO blogs (author, url, title, likes) 
VALUES 
(
  'Edsger W. Dijkstra', 
  'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 
  'Go To Statement Considered Harmful', 
  10
);