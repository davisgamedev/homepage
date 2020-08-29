import React from 'react';

import { Water } from 'three/examples/jsm/objects/Water.js';
import { extend, useThree, useLoader, useFrame } from 'react-three-fiber';
import { PlaneBufferGeometry, Vector2, TextureLoader, RepeatWrapping, Vector3, SphereBufferGeometry, IcosahedronBufferGeometry, TorusKnotBufferGeometry } from 'three';
import { DebugDir } from 'Tech/DebugTools';

extend({Water})

// 'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596832830/Textures/waternormals_vgvtks.jpg'


export default function Ocean(props) {
    const THREE = useThree();
    
    var waterGeometry = new PlaneBufferGeometry(10000, 10000);

    var textureLoader = new TextureLoader();
    var waterNormals = textureLoader.load('https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596832830/Textures/waternormals_vgvtks.jpg', function(map) {
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
    });

    var water = new Water( waterGeometry, {
        scale: 0.5,

        textureWidth: 1024,
        textureHeight: 1024,
        waterNormals: waterNormals,
        distortionScale: 15,
        alpha: 0.9,
        sunDirection: new Vector3(0, 1, 0),
        waterColor: 0x000033,
    } );

    water.position.y = -10;
    water.rotation.x = -Math.PI/2;

    water.material.side = THREE.BackSide;

    useFrame((state, delta) => {
        water.material.uniforms['time'].value += 0.5 * delta;
    });



    THREE.scene.add( water );

    return null;
}