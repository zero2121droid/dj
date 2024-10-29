import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navigation Components/Navbar';
import PrettyNavbar from './components/Navigation Components/PrettyNavbar';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dejan Jorgacevic
        </p>
  
      </header> */}
      <BrowserRouter>
      {/* <Navbar /> */}
      <PrettyNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
