import React, { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber';
import { DebugDir } from 'Tech/DebugTools';
import WindowDimensions from 'Tech/WindowDimensions';
import { DebugList } from 'Tech/DebugTools';
import * as THREE from 'three';
import { RenderPass } from 'postprocessing';

import marbleAlbedo from './Textures/MarbleTiles_albedo.tif';
import marbleNormal from './Textures/MarbleTiles_normal.tif';
import marbleRough from './Textures/MarbleTiles_roughness.tif';




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

    const [albedo, normal, rough ] = useLoader(THREE.TextureLoader,
                [marbleAlbedo, marbleNormal, marbleRough])

    const mesh = useRef();

    return(
        <mesh ref={mesh}
        position= {props.position}
        >
            <planeBufferGeometry attach="geometry" args={[15, 15]} ></planeBufferGeometry>
            <meshPhongMaterial attach="material"
                args={[{
                    map: albedo,
                    normalMap: normal,
                    bumpMap: rough
                }]}
        </mesh>
    )
}


export default function BackgroundScene(){

    const {windowWidth, windowHeight} = WindowDimensions();

    return(
        <Canvas 
        id="threeCanvas" 
        style={{width: windowWidth, height: windowHeight}}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
        camera={{ fov: 75, position: [0, 0, -15] }}
        onCreated={({ gl }) => {
            gl.setClearColor('white')
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.outputEncoding = THREE.sRGBEncoding;
            gl.gammaOutput = true;
            gl.gammaFactor = 2.2;
          }}
        >
            
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} intensity={2} />
        <pointLight position={[-100, -100, -100]} intensity={5} color="red" />



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
        </Canvas>
    )
}