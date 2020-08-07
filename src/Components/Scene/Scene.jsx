import React, { Suspense } from 'react';
import { Canvas, extend } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import SkyBox from "./SkyBox";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Controls from './Controls';
import Ocean from './Ocean';

import * as THREE from 'three';
import { Ico } from 'Components/webg-tests/TestIcoBackgroundScene';


extend({OrbitControls})



export default function Scene(props) {

    const {windowWidth, windowHeight} = WindowDimensions();

    return(
        <Canvas
            id="threeCanvas"
            style={{width: windowWidth, height: windowHeight}}
            camera={{ fov: 55, position: [-15, 7, 15] }}
            gl={{ antialias: true, logarithmicDepthBuffer: true }}
        >
        <ambientLight intensity={0.4} />
        <directionalLight position={[-1, 1, 1]} intensity={0.6}/>

            <Controls />

            <SkyBox />
            

            <Ico position={[0, 10, 0]} radius={1}></Ico>

            <ambientLight intensity={0.4} />
            <directionalLight position={[-1, 1, 1]} intensity={0.6}/>


        <Suspense fallback={null}>
            <Ocean />
        </Suspense>

        </Canvas>
    );

}