import React from 'react';

import { Water } from 'three/examples/jsm/objects/Water.js';
import { extend, useThree, useLoader, useFrame } from 'react-three-fiber';
import { PlaneBufferGeometry, Vector2, TextureLoader, RepeatWrapping, Vector3, SphereBufferGeometry } from 'three';

extend({Water})

// 'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596832830/Textures/waternormals_vgvtks.jpg'


export default function Ocean() {
    const THREE = useThree();
    
    var waterGeometry = new PlaneBufferGeometry(1000, 1000);

    var textureLoader = new TextureLoader();
    var waterNormals = textureLoader.load('https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596832830/Textures/waternormals_vgvtks.jpg', function(map) {
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
    });

    var water = new Water( waterGeometry, {
        scale: 50,
        flowDirection: new Vector2( -1, 1 ),
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        waterColor: 0xffffff,
        distortionScale: 5,
        alpha: 1.0,
        sunDirection: new Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
    } );

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;


    useFrame((state, delta) => {
        water.material.uniforms['time'].value += delta;
    });



    THREE.scene.add( water );

    return null;
}