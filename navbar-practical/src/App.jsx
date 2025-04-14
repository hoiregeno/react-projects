import Navbar from "./components/Navbar.jsx";

function App() {

  // An array of objects representing the navigation links.
  const links = [
    { id: 1, name: "Home", url: "#home" },
    { id: 2, name: "About", url: "#about" },
    { id: 3, name: "Portfolio", url: "#portfolio" },
    { id: 4, name: "Contact", url: "#contact" }];

  return (
    <Navbar navLinks={links} />
  );
}

export default App