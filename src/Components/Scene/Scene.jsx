import React, { Suspense } from 'react';
import { Canvas, extend } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Sky, OrbitControls, Plane, Stats } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Group, BoxBufferGeometry } from 'three';
import { DebugList } from 'Tech/DebugTools';
import SkyBox from './SkyBox';
import Icos from './Icos';
import { Ico } from './Icos';


export default function Scene(props) {

    const {windowWidth, windowHeight} = WindowDimensions();

    return(
        <Canvas
            id="threeCanvas"
            style={{width: windowWidth, height: windowHeight}}
            camera={
                { 
                    fov: 55, 
                    position: [0, 0, -75],
                }}
            gl={{ antialias: true, logarithmicDepthBuffer: true }}
            onCreated={({gl}) => { gl.setClearColor('black'); }}
        >

    <Suspense fallback={null}>

            <SkyBox />

            <ambientLight intensity={0.4} />
            <directionalLight intensity={0.8} position={[-1, 1, -1]} args={[0xffffff]} />

            <Ico />


            <Icos />

            <Stats />

            <OrbitControls />



        </Suspense>

        </Canvas>
    );

}