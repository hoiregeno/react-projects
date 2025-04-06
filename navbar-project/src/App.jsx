import Navbar from "./component/Navbar.jsx"

const App = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" }
  ];

  return (
    <Navbar links={links} />
  )
}

export default App