import React from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, useThree } from "react-three-fiber";

extend({OrbitControls})

export default function Controls() {
    const { camera, gl: { domElement } } = useThree()

    return (<orbitControls args={[camera, domElement]} />);
}