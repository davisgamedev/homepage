import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Sky, OrbitControls, Plane } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Group, BoxBufferGeometry, MeshPhongMaterial, TorusGeometry, Material, PlaneBufferGeometry, Vector3, IcosahedronBufferGeometry, Vector4 } from 'three';
import { DebugList } from 'Tech/DebugTools';
import SkyBox from './SkyBox';
import { useMemo } from 'react';
import Vector from './Vector';
import {MeshLambertMaterial, Color} from 'three';

import RaymarchBlobFragShader from './RaymarchBlobFragShader';

import * as Three from 'three';


const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;


const debugFragShader = `
    void main() {
        gl_FragColor = vec4(1., 0., 0., 1.);
    }
`;


/*
    Uniforms are passed into shader in Blob update,
    Update logic is called in Blob update

    Only relevant Uniforms are passed during Blob Update

*/
let Uniforms = {

    NumSpheres: 15, // check length below
    SphereRadius: 0.1,

    Spheres: Array.from({length: 15}, () => new Vector3()),

    Resolution: new Vector3(0, 0, 0),
    Eye: new Vector3(0, 0, 0),
        
    AmbientLight: new Vector3(0.1, 0.1, 0.1),

    DirectionLightPosition: new Vector3(5., 7., 1.),
    DirectionLightColor: new Vector3(1., 1., 1.),
    DirectionLightIntensity: 10.,
    
    SpecularColor: new Vector3(1., 1., 1.),
    SpecularAlpha: 100.,

    // r g b dist
    GradientColorSteps: [
        new Vector4(64, 31, 62,       1.0 ), // to color
        new Vector4(69, 63, 120,      2.0 ),
        new Vector4(117, 154, 171,    2.5 ),
        new Vector4(250, 242, 161,    3.5 ),
    ],

}

// Convert each property to a Three 'Uniform' object
let temp = Uniforms;
Object.keys(temp).forEach(k => {
    Uniforms[k] = new Three.Uniform(temp[k])
});

const UniformUpdateKeys = [ "Spheres", "Eye" ];


// GooUpdate: { mesh, rotationSpeed, position, velocity }
const GooUpdates = [];

const spread = 50;
const initialSpeed = 10;

const origin = new Vector(0, 0, -10);
const originMass = 10000; // with each object being 1
const inertia = 1;

const grav = 0.01;


let gravForce;
let diff;


const UpdateLogic = (delta) => {

    GooUpdates.forEach((
        {mesh, rotationSpeed, position, velocity}, i
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

            Uniforms.Spheres.value[i] = new Vector3(0, 0, 0);
    });

};



const randomAxis = () => {
    const factor= Math.random();
    const sign = Math.random() > 0.5 ? 1 : -1;
    if(factor < 0.33) return new Vector().up().mult(sign, true);
    if(factor > 0.67) return new Vector().right().mult(sign, true);
    return new Vector().forward().mult(sign, true);
}



export function Goo(props) {

    const mesh = React.useRef();

    let rotationSpeed;
    let position;
    let velocity;
    
    let color = "white";

    useMemo(() => {
        rotationSpeed = new Vector().random();

        position = new Vector().random().mult(spread, true).subScalar(spread/2, true);

        velocity = new Vector().random().mult(initialSpeed, true).subScalar(initialSpeed/2);
        
        let nudge = randomAxis().mult(initialSpeed, true);
        velocity.add(nudge);
    
        GooUpdates.push({mesh, rotationSpeed, position, velocity});
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
                    color: color,
                    shininess: 30,
                    specular: 0x454545,
                    flatShading: true,
                }]}
            />
        </mesh>
    )
}



export default function Blob(props) {


    const materialRef = React.useRef();
    const ref = React.useRef();

    const THREE = useThree();

    const {windowWidth, windowHeight} = WindowDimensions();

    if(windowWidth && materialRef.current) 
        materialRef.current.uniforms["Resolution"].value = new Vector3(windowWidth/3, windowHeight/3, 0.);
    else Uniforms.Resolution.value = new Vector3(100., 100., 0.);
    

    useFrame((state, delta) => {

        UpdateLogic(delta);

        Uniforms.Eye = THREE.camera.position;
        
        materialRef.current.uniforms["Eye"].value = Uniforms.Eye;


        UniformUpdateKeys.forEach(key => materialRef.current.uniforms[key].value = Uniforms[key].value);

    });
    
    return(<group>
        {
            Array.from({length: Uniforms.NumSpheres}, (_, i) => <Goo key={i} index={i} />)
        }
        <mesh
            position={[0, 10, 0]}
            rotation={[0, Math.PI, 0]}
            ref={ref}
        >
        <planeBufferGeometry 
            attach="geometry"
            args={[50, 50]}
        />
        <shaderMaterial 
            attach="material" 
            ref={materialRef}
            uniforms={Uniforms}
            fragmentShader={RaymarchBlobFragShader}
            transparent={true}
        />

        </mesh>
    </group>);
}