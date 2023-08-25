import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import StarsCanvas  from "./components/Stars";

import "./App.css";

function App() {
  // useEffect(() => { 
  //   const canvas = document.querySelector("#three-canvas-container canvas");
  //   const context = canvas.getContext("webgl2");
  //   context.canvas.width = window.innerWidth;
  //   context.canvas.height = window.innerHeight;
    
  // });
  return (
    <div className="app">
      <StarsCanvas />
      
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }} id="three-canvas-container">
       <Experience />
      </Canvas>
     
    </div>
    
  );
}

export default App;