interface courseName {
  name: string;
}

const Header = (props: courseName) => {
  return <h1>{props.name}</h1>;
}

export default Header;