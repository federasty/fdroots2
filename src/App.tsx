import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import NeuralBackground from "./components/NeuralBackground";

function App() {
  return (
    <NeuralBackground intensity="medium">
      <NavBar />
      <Hero />
      <Skills />
      {/* Otros componentes */}
    </NeuralBackground>
  );
}

export default App;