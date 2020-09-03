import React, { Suspense } from 'react';
import { Canvas, extend, useFrame } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Sky, OrbitControls, Plane, Stats } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Group, BoxBufferGeometry } from 'three';
import { DebugList } from 'Tech/DebugTools';
import SkyBox from './SkyBox';
import Blob from './Blob';
import { Ico } from './Blob';
import { EffectComposer, Bloom, SSAO, SMAA, Scanline, Noise, DepthOfField } from 'react-postprocessing';
import { BlendFunction, Resizer, KernelSize, GammaCorrectionEffect } from 'postprocessing';

import * as Three from 'three';

export function Effects(props) {

    const depth = React.useRef();

    const {windowWidth, windowHeight} = WindowDimensions();


    return(
    <EffectComposer>

    <DepthOfField 
    ref={depth}
    focusDistance={0.8} 
    focalLength={0.8} 
    bokehScale={1.5} 
    />

    <Bloom 
    intensity={1} // The bloom intensity.
    kernelSize={KernelSize.LARGE} // blur kernel size
    luminanceThreshold={0.65} // luminance threshold. Raise this value to mask out darker elements in the scene.
    luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
    />
    <Noise 
    opacity={0.04} 
    premultiply
    />

    </EffectComposer>
    );
}

export default function Scene(props) {

    const {windowWidth, windowHeight} = WindowDimensions();

    window.pixelRatio = window.devicePixelRatio * 1/3;

    return(
        <Canvas
            id="threeCanvas"
            style={{width: windowWidth, height: windowHeight}}
            camera={
                { 
                    fov: 55, 
                    position: [0, 0, -55],
                }}
            gl={{ 
                logarithmicDepthBuffer: false,

                antialias: false, 
                depth: false,
                powerPreference: "high-performance",
                stencil: false,
                alpha: true,
            }}
            onCreated={({gl}) => { 
                gl.setClearColor('black');
                gl.setClearAlpha(0);
            }}
            shadowMap={false}
            pixelRatio={window.pixelRatio}
        >

    <Suspense fallback={null}>

            <SkyBox />
            <Ocean />
            <ambientLight intensity={0.4} />
            <directionalLight intensity={1.} position={[-1, 1, -1]} args={[0xffffff]} />

            <Blob />

            <Stats />

            <OrbitControls />

            {/* <Effects /> */}

        </Suspense>

        </Canvas>
    );

}