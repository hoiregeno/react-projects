import Navbar from "./component/Navbar.jsx"

const App = () => {

  const links = [
    { name: "Home", url: "#home" },
    { name: "About", url: "#about" },
    { name: "Portfolio", url: "#portfolio" },
    { name: "Contact", url: "#contact" }
  ];

  return (
    <Navbar navLinks={links} />
  )
}

export default App