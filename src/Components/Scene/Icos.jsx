import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Sky, OrbitControls, Plane } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Group, BoxBufferGeometry, MeshPhongMaterial, TorusGeometry, Material } from 'three';
import { DebugList } from 'Tech/DebugTools';
import SkyBox from './SkyBox';
import { useMemo } from 'react';
import Vector from './Vector';
import {MeshLambertMaterial, Color} from 'three';


import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';


extend({ MarchingCubes });




const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;






const Colors = [
    0xf46036,
    0x2e294e,
    0x1b998b,
    0xe71d36,
    0xc6d86d,

    // "#f47c7c",
    // "#f7f48b",
    // "#a1de93",
    // "#70a1d7",

    // "#00a8b5",
    // "#774898",
    // "#e62a76",
    // "#fbb901",

];

const numIcos = 30;

const IcoUpdates = [];


const spread = 50;
const initialSpeed = 10;

const origin = new Vector(0, 0, -10);
const originMass = 10000; // with each object being 1
const inertia = 1;

const grav = 0.01;


let gravForce;
let diff;


const UpdateLogic = (delta) => {

    IcoUpdates.forEach((
        {mesh, rotationSpeed, position, velocity}
            ) => {

                mesh.current.rotation.x += rotationSpeed.x * delta;
                mesh.current.rotation.y += rotationSpeed.y * delta;
                mesh.current.rotation.z += rotationSpeed.z * delta;

                // vector from point to origin
                diff = origin.sub(position);
                gravForce = (grav * originMass / diff.sqMag()) * delta;

                velocity.add(diff.mult(gravForce, true), true);


                velocity.mult(inertia, true);

                position.add(velocity.mult(delta), true);

                if(position.max() > 200) {
                    position[position.max()] = 199;
                    velocity.mult(-0.5, true);
                }

                mesh.current.position.x = position.x;
                mesh.current.position.y = position.y;
                mesh.current.position.z = position.z;

    });
};



const randomAxis = () => {
    const factor= Math.random();
    const sign = Math.random() > 0.5 ? 1 : -1;
    if(factor < 0.33) return new Vector().up().mult(sign, true);
    if(factor > 0.67) return new Vector().right().mult(sign, true);
    return new Vector().forward().mult(sign, true);
}



export function Ico(props) {

    const mesh = React.useRef();

    let rotationSpeed;
    let position;
    let velocity;
    
    let color;

    useMemo(() => {
        rotationSpeed = new Vector().random();

        position = new Vector().random().mult(spread, true).subScalar(spread/2, true);

        velocity = new Vector().random().mult(initialSpeed, true).subScalar(initialSpeed/2);
        
        let nudge = randomAxis().mult(initialSpeed, true);
        velocity.add(nudge);
    
        IcoUpdates.push({mesh, rotationSpeed, position, velocity});
    });

    return(
        <mesh
            ref={mesh}
            position={props.position}
            scale={[1, 1, 1]}
        >
            <icosahedronBufferGeometry 
            attach="geometry" 
            args={[props.radius||2, props.detail||1]}
            />
           <meshPhongMaterial
                attach="material"
                args={[{
                    color: 
                    
                    props.index == 0? 0x00ff00 :
                    Colors[Math.floor(Math.random() * Colors.length)],


                    shininess: 30,
                    specular: 0x454545,
                    flatShading: true,
                }]}
            />
        </mesh>
    )
}



export function RaymarchPlane(props) {

}



export default function Icos(props) {

    useFrame((state, delta) => UpdateLogic(delta));


    return(<group>
        {
            Array.from({length: numIcos}, (_, i) => <Ico key={i} index={i} />)
        }
    </group>);
}