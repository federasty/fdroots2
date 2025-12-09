import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Project from "./components/Project"
import NeuralBackground from "./components/NeuralBackground";

function App() {
  return (
    <NeuralBackground intensity="medium">
      <NavBar/>
      <Hero/>
      <Skills/>
       <Project/>

       
      {/* Otros componentes */}
    </NeuralBackground>
  );
}

export default App;