import React, { useRef, useState, Suspense, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader, extend } from 'react-three-fiber';
import { DebugDir } from 'Tech/DebugTools';
import WindowDimensions from 'Tech/WindowDimensions';
import { DebugList } from 'Tech/DebugTools';
import * as THREE from 'three';
import { RenderPass } from 'postprocessing';


import albedoUrl from './Textures/marble_albedo.jpg';
import roughUrl from './Textures/marble_rough.jpg';

import pxUrl from './EnvMaps/Gentor/px.png'
import nxUrl from './EnvMaps/Gentor/nx.png'
import pyUrl from './EnvMaps/Gentor/py.png'
import nyUrl from './EnvMaps/Gentor/ny.png'
import pzUrl from './EnvMaps/Gentor/pz.png'
import nzUrl from './EnvMaps/Gentor/nz.png'


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CubeTextureLoader } from 'three';
extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame with useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      enableZoom={false}
    />
  );
};

let skyMap = null;

function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    
    const texture = loader.load(
        [pxUrl, nxUrl, pyUrl, nyUrl, pzUrl, nzUrl]
    );
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    skyMap = texture;
    return null;
  }


const Materials = {
    normal: (<meshNormalMaterial attach="material" args={[{flatShading: true}]}></meshNormalMaterial>),
    phongWhite: (<meshPhongMaterial attach="material" color="white" args={[{flatShading: true}]}></meshPhongMaterial>),
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function randomRange(from, to) { return map(Math.random(), 0, 1, from, to); }


function position() {
    return Array.from({length: 3}, () => randomRange(-3, 3));
}

function Ico(props) {

    const mesh = useRef();

    const speed = {
        x: Math.random() * 1,
        y: Math.random() * 1,
        z: Math.random() * 1,
    }

    useFrame((state, delta) => {
        mesh.current.rotation.x += speed.x * delta;
        mesh.current.rotation.y += speed.y * delta;
        mesh.current.rotation.z += speed.z * delta;
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
            {props.material || Materials.normal}
        </mesh>
    )
}

export function Wall(props) {

    
    const [albedo, rough] = useLoader(THREE.TextureLoader, [albedoUrl, roughUrl]);
    
    [albedo, rough].forEach(e => {
        e.wrapS = THREE.RepeatWrapping;
        e.wrapT = THREE.RepeatWrapping;
        e.repeat.set(3, 3);
    })


    const mesh = useRef();


    return(
        <mesh ref={mesh}
        position= {props.position}
        >
            <planeBufferGeometry attach="geometry" args={[35, 35]} ></planeBufferGeometry>
            <meshStandardMaterial 
            attach="material"
            map={albedo} 
            roughnessMap={rough}
            envMap={skyMap}
            args={[{
                color: 'white',
                emissive: 'black',
                roughness: 0.8,
                metalness: 0.5,

            }]}
            />
 
        </mesh>
    )
}

export function MoveLight(props) {

    let mouse = props.mouse;
    const light = useRef();

    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    useFrame(state => {
        light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0);
    });

    return(<pointLight ref={light} distance={40} intensity={1} color="lightblue"></pointLight>)
}


export default function BackgroundScene(){

    const {windowWidth, windowHeight} = WindowDimensions();

    const mouse = useRef([0, 0])
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
  

    return(
        <Canvas 
        id="threeCanvas" 
        style={{width: windowWidth, height: windowHeight}}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
        camera={{ fov: 75, position: [0, 0, 15] }}
        onCreated={({ gl }) => {
            gl.clearColor('white');
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.5;
            gl.outputEncoding = THREE.sRGBEncoding;
            gl.gammaOutput = true;
            gl.gammaFactor = 1;
          }}
        onMouseMove={onMouseMove}
        >
            
          <Suspense fallback={null}>

          <CameraControls />
          <SkyBox></SkyBox>

        <pointLight position={[100, 100, 100]} intensity={0.1} />
        <pointLight position={[-100, -100, -100]} intensity={0.1} color="red" />

          <MoveLight mouse={mouse} />
          <Wall position={[0, 0, -5]} />
          <Ico position={[-10, -10, 0]} material={Materials.normal} radius={1}></Ico>
          <Ico position={[10, 10, 0]} material={Materials.normal} radius={1}></Ico>

            {/* {
                Array.from({length: 50}, (_, i) => 
                <Ico 
                position={position()}
                radius={randomRange(0.2, 1.2)}
                detail={1}
                key={i}
                material={Materials.phongWhite}
                />)
            } */}
            </Suspense>
        </Canvas>
    )
}