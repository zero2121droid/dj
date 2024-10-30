import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navigation Components/Navbar';
import PrettyNavbar from './components/Navigation Components/PrettyNavbar';
import Footer from './components/Other Components/Footer';
import Gallery from './pages/Gallery';


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
      <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
