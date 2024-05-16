const Course = ({course}) => (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
)

const Header = ({name}) => (
    <h2>{name}</h2>
)

const Content = ({parts}) => (
  <div>
    {parts.map(x => <Part key={x.id} name={x.name} exercises={x.exercises} /> )}
  </div>
)

const Part = ({name, exercises}) => (
  <p> {name} {exercises} </p>
)

const Total = ({parts}) => (
  <b>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
)

export default Course