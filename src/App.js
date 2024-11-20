import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navigation Components/Navbar';
import PrettyNavbar from './components/Navigation Components/PrettyNavbar';
import Footer from './components/Other Components/Footer';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import ScrollToTop from './components/Other Components/ScrollToTop';
import YouTubeVisualizer from './components/Other Components/YouTubeVisualizer';


function App() {
  return (
    <div className="App overflow-x-hidden">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dejan Jorgacevic
        </p>
  
      </header> */}
      <BrowserRouter>
      <ScrollToTop />
      {/* <Navbar /> */}
      <PrettyNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/videos" element={<Videos />} />
      </Routes>
      {/* <YouTubeVisualizer videoId="qL96iv_bfZo&t=958s" /> */}
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
