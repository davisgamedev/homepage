import React, { Suspense } from 'react';
import { Canvas, extend } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";
import Ocean from './Ocean';

import { Ico } from 'Components/webg-tests/TestIcoBackgroundScene';
import { Sky, OrbitControls } from '@react-three/drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';
import SkyShader from './SkyShader';
import { Group, BoxBufferGeometry } from 'three';
import { DebugList } from 'Tech/DebugTools';


export function Box(props) {
    const ref = React.useRef();

    DebugLog("check");
    return(<mesh ref={ref} position={props.position} rotation={props.rotation}>
        <boxBufferGeometry attach="geometry" args={[props.width, props.size, props.size]} />
        <meshStandardMaterial attach="material" color="red" />
        {props.material}
    </mesh>)
}


export function BoxedRoom(props) {

    const size = props.size||50;
    const width = props.width||1;

    const colors = props.colors||[
        0xff0000,
        0xffff00,
        0x00ff00,
        0x00ffff,
        0x0000ff,
        0xff00ff,
    ];

    const positions = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [-1, 0, 0],
        [0, -1, 0],
        [0, 0, -1],
    ];
    
    const rotations = [
        [-1, 0, 0],
        [0, 0, -1],
        [0, -1, 0],
        [1, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
    ];

    return (<group>
    {
        Array.from({length: 6}, (_, i) => {
            // let position = [0, 0, 0];
            // let sign = i%2 ? -1 : 1;
            // let comp = i%3;
            // position[comp] += sign * size/2;

            // rotation
            // if(comp < 2) {

            // }
            let position = positions[i].map(x => x * size/2 + width);
            position[1] += size * 2/6;

            DebugDir(position);

            return(<Box 
                position={position}
                rotation={rotations[i].map(x => x * Math.PI/2)}
                size={size}
                width={width}
                key={i}
                material={
                    props.materials? props.materials[i] :
                    <meshStandardMaterial attach="material" args={[{
                        color: colors[i], 
                        flatShading: false,
                        roughness: 0.25,

                    }]} />
                }/>);
        })
    }
    </group>)
}
