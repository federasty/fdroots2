import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Project from "./components/Project";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NeuralBackground from "./components/NeuralBackground";

function App() {
  return (
    <BrowserRouter>
      <NeuralBackground intensity="medium">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/proyectos" element={<Project />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
        <Footer />
      </NeuralBackground>
    </BrowserRouter>
  );
}

export default App;