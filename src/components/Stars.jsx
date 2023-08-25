
import Particles from "react-tsparticles";

import particlesConfig from "/public/particle-config.js";
import { loadFull } from "tsparticles";

export default function StarsCanvas() {
    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
    };
    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (
        <Particles
            
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig}
        />
    );
}