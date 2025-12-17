import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Project from "./components/Project"
import About from "./components/About";
import Contact from "./components/Contact"
import NeuralBackground from "./components/NeuralBackground";

function App() {
  return (
    <NeuralBackground intensity="medium">
      <NavBar/>
      <Hero/>
       <About/>
      <Skills/>
       <Project/>
       <Contact/>

        

       
      {/* Otros componentes */}
    </NeuralBackground>
  );
}

export default App;