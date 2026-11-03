import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import KlubNavbar from './components/Navigation Components/KlubNavbar';
import Footer from './components/Other Components/Footer';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Booking from './pages/Booking';
import ScrollToTop from './components/Other Components/ScrollToTop';
import BackToTop from './components/Other Components/BackToTop';
import { PlayerProvider } from './components/Player/PlayerContext';
import { Intro, PageWipe } from './components/Other Components/Motion';


function App() {
  return (
    <div className="App overflow-x-hidden">
      <BrowserRouter>
      <PlayerProvider>
      <ScrollToTop />
      <Intro />
      <PageWipe />
      <KlubNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
      <BackToTop />
      </PlayerProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
