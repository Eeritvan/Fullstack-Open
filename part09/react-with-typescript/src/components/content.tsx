interface courseParts {
  parts: string;
}

const Part = (part) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b> {part.name} {part.exerciseCount} </b> <br />
          {part.description} <br />
        </p>
      )
    case 'group':
      return (
        <p>
          <b> {part.name} {part.kind} </b> <br />
          {part.description} <br />
          Group projects: {part.groupProjectCount}
        </p>
      )
    case 'background':
      return (
        <p>
          <b> {part.name} {part.kind} </b> <br />
          {part.description} <br />
          background material: {part.backgroundMaterial}
        </p>
      )
    case 'special':
      return (
        <p>
          <b> {part.name} {part.kind} </b> <br />
          {part.description} <br />
          required skills: {part.requirements.join(', ')}
        </p>
      )
    default:
      break;
  }
}

const Content = (props: courseParts) => {
  return (
    <div>
      { props.parts.map(x => Part(x)) }
    </div>
  )
}

export default Content;