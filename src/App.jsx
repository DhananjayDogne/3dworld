import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import StarsCanvas  from "./components/Stars";

import "./App.css";

function App() {
  return (
    <div id="three-canvas-container">
      <StarsCanvas />
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }} >
     
      <Experience />
      </Canvas>
    </div>
    
  );
}

export default App;