import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Sky, OrbitControls, Plane } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Vector2, Vector3, IcosahedronBufferGeometry, Vector4 } from 'three';
import { DebugList } from 'Tech/DebugTools';
import SkyBox from './SkyBox';
import { useMemo } from 'react';
import Vector from './Vector';
import {MeshLambertMaterial, Color} from 'three';

import RaymarchBlobFragShader from './RaymarchBlobFragShader';

import * as Three from 'three';


const showDebugIcos = true;


/*
    Uniforms are passed into shader in Blob update,
    Update logic is called in Blob update

    Only relevant Uniforms are passed during Blob Update

*/
let Uniforms = {

    DebugLocation: true,

    NumSpheres: 15, // check length below
    SphereRadius: 0.1,

    Spheres: Array.from({length: 15}, () => new Vector3()),

    Overdraw: 2,
    Resolution: new Vector2(600, 800),
    Eye: new Vector3(0, 0, 0),
        
    AmbientLight: new Vector3(0.3, 0.3, 0.3),

    DirectionLightPosition: new Vector3(-1, 1, -1),
    DirectionLightColor: new Vector3(1., 1., 1.),
    DirectionLightIntensity: 1.2,
    
    SpecularColor: new Vector3(0.25, 0.25, 0.25),
    SpecularAlpha: 30.,

    // r g b dist
    GradientColorSteps: [
        // new Vector4(64, 31, 62,       1.0 ), // to color
        // new Vector4(69, 63, 120,      2.0 ),
        // new Vector4(117, 154, 171,    2.5 ),
        // new Vector4(250, 242, 161,    3.5 ),
        new Vector4(256., 0., 0., 10.),        
        new Vector4(256., 0., 0., 10.),
        new Vector4(256., 0., 0., 10.),
        new Vector4(256., 0., 0., 10.),

    ],

}


Uniforms.GradientColorSteps.forEach(c => {
    c.x /= 256;
    c.y /= 256;
    c.z /= 256;
});


// Convert each property to a Three 'Uniform' object
let temp = Uniforms;
Object.keys(temp).forEach(k => {
    Uniforms[k] = new Three.Uniform(temp[k])
});



const UniformUpdateKeys = [ "Spheres", "Eye", "Resolution" ];


// GooUpdate: { mesh, rotationSpeed, position, velocity }
const GooUpdates = [];

const spread = 50;
const initialSpeed = 5;

const origin = new Vector(0, 0, -10);
const originMass = 10000; // with each object being 1
const inertia = 1;

const grav = 0.02;


let gravForce;
let diff;


const UpdateLogic = (delta) => {

    // slowdown

    delta *= 0.9;

    GooUpdates.forEach((
        {mesh, rotationSpeed, position, velocity, mapped}, i
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

            mapped = position.map(-10, 10, 0.9, -0.9);

            if(Uniforms.Spheres.value[i])
             Uniforms.Spheres.value[i].set(mapped.x, mapped.y, mapped.z);
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
    
    let color = "red";

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
            {
                showDebugIcos? (<>
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
                </>) : null
            }
        </mesh>
    );
}








export default function Blob(props) {


    const materialRef = React.useRef();
    const ref = React.useRef();

    const THREE = useThree();

    const {windowWidth, windowHeight} = WindowDimensions();



    Uniforms.Resolution.value = new Vector2(
        windowWidth * Uniforms.Overdraw.value,
        windowHeight * Uniforms.Overdraw.value);
    
    useFrame((state, delta) => {

        UpdateLogic(delta);

        let eye = THREE.camera.position.clone();

        eye.multiplyScalar(0.5);


        Uniforms.Eye.value = eye;
        
        UniformUpdateKeys.forEach(key => materialRef.current.uniforms[key].value = Uniforms[key].value);

    });
    
    return(<group>
        {
            Array.from({length: Uniforms.NumSpheres.value}, (_, i) => <Goo key={i} index={i} />)
        }
        <mesh
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            ref={ref}
        >
        <planeBufferGeometry 
            attach="geometry"
            args={[80, 80]}
        />
        <shaderMaterial 
            attach="material" 
            ref={materialRef}
            uniforms={Uniforms}
            fragmentShader={RaymarchBlobFragShader}
            // uniforms={{
            //     iResolution: new Three.Uniform(new Vector3(600, 800, 0)),
            //     iTime: { value: 1.0 }
            // }}
            // fragmentShader={SandboxFragShader}
            transparent={true}

        />

        </mesh>
    </group>);
}