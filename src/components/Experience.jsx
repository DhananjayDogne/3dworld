import { useState,useRef, useEffect } from 'react';
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useGLTF, useTexture, Text, CameraControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from '@react-three/fiber';
import * as easing from "maath/easing";

export const Experience = () => { 
    const [active, setActive] = useState(null);
    const Fish = useGLTF("/models/Fish.gltf");
    const Dragon = useGLTF("/models/Dragon.gltf");
    const Ghost = useGLTF("/models/Ghost.gltf");
    const scene=useThree((state)=>state.scene)
    const refCamera = useRef();
    const fish = new Audio("./sounds/fish.mp3");
    const snow = new Audio("./sounds/snow.mp3");
    const desert = new Audio("./sounds/desert.mp3");
    const exit = new Audio("./sounds/exit.mp3");
    useEffect(() => {
        if (active) {
            const targetposition = new THREE.Vector3();
            scene.getObjectByName(active).getWorldPosition(targetposition);
            refCamera.current.setLookAt(
                0, 0, 5,
                targetposition.x,
                targetposition.y,
                targetposition.z,
                true
                
            )
        } else {
            refCamera.current.setLookAt(
                0, 0, 10,
                0,0,0,
                true

            )
        }
        if (active === null) { 
            exit.play();
        }
        if (active === "Fish") {
            fish.play();
        }
        if (active === "Dragon") {
            desert.play();
        }
        if (active === "Ghost") {
            snow.play();
        }
      
    }, [[active], [fish], [desert], [snow], [exit]])
 

    return (
        
        <>
          
            <CameraControls ref={refCamera} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.5}/>
            <AllMonsters texture={'/textures/water_world.jpg'} name={"Fish"} color={"#03607a"} position={[0, 0, -1]} active={active} setActive={setActive} >
                <mesh>
                    <primitive object={Fish.scene} scale={0.5} position={[0, -1, 0]} />
                </mesh>
            </AllMonsters>
            <AllMonsters texture={'/textures/fire_world.jpg'} name={"Dragon"} color={"#7a4119"} position={[-3, 0, 0]} rotation-y={Math.PI / 8} active={active} setActive={setActive}>
                <mesh>
                    <primitive object={Dragon.scene} scale={0.5} position={[0, -1, 0]} />
                </mesh>
            </AllMonsters>
            <AllMonsters texture={'/textures/ice_land.jpg'} name={"Ghost"} color={"#200b25"} position={[3, 0, 0]} rotation-y={-Math.PI / 8} active={active} setActive={setActive}>
                <mesh>
                    <primitive object={Ghost.scene} scale={0.5} position={[0, -1, 0]} />
                </mesh>
            </AllMonsters>
        </>
           
           
        
    )

}

const AllMonsters = ({ children,texture,name,color,active,setActive,...props }) => {
    const water = useTexture(texture);
    const refPortal = useRef();

    useFrame((_state, delta) => {
        const worldOpen = active === name;
        easing.damp(refPortal.current,"blend",worldOpen ? 1 : 0 ,0.2 ,delta);
    })
    return <group {...props}>
        <Text
            fontSize={0.3}
            position={[0, -1.5, 0.051]}
            anchorY="bottom"
        >
            {name}
            <meshBasicMaterial color={color} toneMapped={false}/>
        </Text>
        <RoundedBox
            name={name}
            args={[2, 3, 0.1]}
            onDoubleClick={() => { setActive(active === name ? null : name);  }}
            
        >

            <MeshPortalMaterial side={THREE.DoubleSide} ref={refPortal}>
                <ambientLight intensity={2} />
                {/* fish */}
                {children}
                {/* background image */}
                <mesh>
                    <sphereGeometry args={[5, 64, 64]} />
                    <meshStandardMaterial map={water} side={THREE.BackSide} />
                </mesh>

            </MeshPortalMaterial>
        </RoundedBox>

    </group>
}