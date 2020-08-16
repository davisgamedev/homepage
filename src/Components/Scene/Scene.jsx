import React, { Suspense } from 'react';
import { Canvas, extend } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Ico } from 'Components/webg-tests/TestIcoBackgroundScene';
import { Sky, OrbitControls, Plane } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Group, BoxBufferGeometry } from 'three';
import { DebugList } from 'Tech/DebugTools';
import SkyBox from './SkyBox';


export default function Scene(props) {

    const {windowWidth, windowHeight} = WindowDimensions();

    return(
        <Canvas
            id="threeCanvas"
            style={{width: windowWidth, height: windowHeight}}
            camera={
                { 
                    fov: 55, 
                    position: [0, 0, -10],
                }}
            gl={{ antialias: true, logarithmicDepthBuffer: true }}
            onCreated={({gl}) => { gl.setClearColor('black'); }}
        >

    <Suspense fallback={null}>

            <SkyBox />

            {/* <SkyShader />
            <Ocean /> */}

            <OrbitControls />

            <Ico position={[0, 0, 0]} radius={1}></Ico>


        </Suspense>

        </Canvas>
    );

}