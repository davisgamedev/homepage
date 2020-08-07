import React, { useRef, useState, Suspense, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader, extend } from 'react-three-fiber';
import { DebugDir } from 'Tech/DebugTools';
import WindowDimensions from 'Tech/WindowDimensions';
import { DebugList } from 'Tech/DebugTools';
import * as THREE from 'three';
import { RenderPass } from 'postprocessing';

import { Water } from 'three/examples/jsm/objects/Water.js';

import waterURL from './Textures/waternormals.jpg';

import { CameraControls, Ico } from './TestIcoBackgroundScene';
import { PlaneBufferGeometry, Vector2, Vector3, TextureLoader } from 'three';


import pxUrl from './EnvMaps/Gentor/px.png'
import nxUrl from './EnvMaps/Gentor/nx.png'
import pyUrl from './EnvMaps/Gentor/py.png'
import nyUrl from './EnvMaps/Gentor/ny.png'
import pzUrl from './EnvMaps/Gentor/pz.png'
import nzUrl from './EnvMaps/Gentor/nz.png'


import albedoUrl from './Textures/marble_albedo.jpg';
import roughUrl from './Textures/marble_rough.jpg';


import { CubeTextureLoader } from 'three';

extend({Water})

const Materials = {
    normal: (<meshNormalMaterial attach="material" args={[{flatShading: true}]}></meshNormalMaterial>),
    phongWhite: (<meshPhongMaterial attach="material" color="white" args={[{flatShading: true}]}></meshPhongMaterial>),
}



function WaterPlane(props) {

    const THREE = useThree();
    
    var waterGeometry = new PlaneBufferGeometry(20, 20);

    var textureLoader = new TextureLoader();
    var waterNormals = textureLoader.load(waterURL, function(map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
    });

    var water = new Water( waterGeometry, {
        scale: 5,
        flowDirection: new Vector2( 5, 5 ),
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        waterColor: 0xffffff,
        distortionScale: 20,

    } );

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    THREE.scene.add( water );


    return null;
}



let skyMap = null;

function Plane(props) {
    
    const [albedo, rough] = useLoader(THREE.TextureLoader, [albedoUrl, roughUrl]);
    
    [albedo, rough].forEach(e => {
        e.wrapS = THREE.RepeatWrapping;
        e.wrapT = THREE.RepeatWrapping;
        e.repeat.set(3, 3);
    })


    const mesh = useRef();

    return(
        <mesh ref={mesh}
        position={props.position}
        rotation={[-Math.PI/2, 0, 0]}
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



export default function Backdrop() {

    const {windowWidth, windowHeight } = WindowDimensions();

    
    return(
        <Canvas 

        id="threeCanvas" 

        style={{width: windowWidth, height: windowHeight}}

        camera={{ fov: 55, position: [-15, 7, 15] }}
 
        gl={{ antialias: true, logarithmicDepthBuffer: true }}

        // onCreated={({ gl }) => {
        //     gl.clearColor('white');
        //     gl.toneMapping = THREE.ACESFilmicToneMapping;
        //     gl.toneMappingExposure = 0.5;
        //     gl.outputEncoding = THREE.sRGBEncoding;
        //     gl.gammaOutput = true;
        //     gl.gammaFactor = 1;
        //   }}
          
        ><Suspense fallback={null}>

            
          <Plane position={[0, 0, 0]} />

          <Ico position={[0, 10, 0]} material={Materials.normal} radius={1}></Ico>

          <ambientLight intensity={0.4} />
          <directionalLight position={[-1, 1, 1]} intensity={0.6}/>
{/* 
        <pointLight position={[100, 100, 100]} intensity={1} />
        <pointLight position={[-100, -100, -100]} intensity={1} color="red" /> */}

        <WaterPlane />
        <SkyBox />

        <CameraControls />

        </Suspense></Canvas>
    )


}