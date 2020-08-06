import React, { useRef, useState, Suspense, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader, extend } from 'react-three-fiber';
import { DebugDir } from 'Tech/DebugTools';
import WindowDimensions from 'Tech/WindowDimensions';
import { DebugList } from 'Tech/DebugTools';
import * as THREE from 'three';
import { RenderPass } from 'postprocessing';

import { Water } from 'three/examples/jsm/objects/Water2.js';

import waterURL from './Textures/waternormals.jpg';

import { CameraControls, Ico } from './TestIcoBackgroundScene';

extend({Water})

const Materials = {
    normal: (<meshNormalMaterial attach="material" args={[{flatShading: true}]}></meshNormalMaterial>),
    phongWhite: (<meshPhongMaterial attach="material" color="white" args={[{flatShading: true}]}></meshPhongMaterial>),
}



function WaterPlane() {

    const THREE = useThree();
    
    var waterGeometry = new THREE.PlaneBufferGeometry( 20, 20 );

    var water = new Water( waterGeometry, {
        color: '#ffffff',
        scale: 4,
        flowDirection: new THREE.Vector2( 1, 1 ),
        textureWidth: 1024,
        textureHeight: 1024
    } );

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    THREE.scene.add( water );


    return null;
}



export default function Backdrop() {

    const {windowWidth, windowHeight } = WindowDimensions();

    
    return(
        <Canvas 

        id="threeCanvas" 

        style={{width: windowWidth, height: windowHeight}}

        camera={{ fov: 55, position: [30, 30, 100] }}
 
        gl={{ antialias: true, logarithmicDepthBuffer: true }}

        onCreated={({ gl }) => {
            gl.clearColor('white');
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.5;
            gl.outputEncoding = THREE.sRGBEncoding;
            gl.gammaOutput = true;
            gl.gammaFactor = 1;
          }}
          
        ><Suspense fallback={null}>

            
          <Ico position={[-10, -10, 0]} material={Materials.normal} radius={1}></Ico>
        <pointLight position={[100, 100, 100]} intensity={0.1} />
        <pointLight position={[-100, -100, -100]} intensity={0.1} color="red" />


          <ambientLight intensity={1} />
        {/* <pointLight position={[100, 100, 100]} intensity={0.1} />
        <pointLight position={[-100, -100, -100]} intensity={0.1} color="red" /> */}

        <WaterPlane />

        <CameraControls />

        </Suspense></Canvas>
    )


}