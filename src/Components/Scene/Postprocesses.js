import React, { useEffect, useMemo, useRef } from "react";
import { GaussianEffect } from "./GaussianEffect";

import { extend, useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'
import { TextureLoader } from "three";
import { EffectPass } from "postprocessing";
import { GaussianEffectPass } from "./GaussianEffect";

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass, TexturePass })


export default function Postprocesses () {
    // const composer = 
    // console.log(composer);

     const composer = useRef()
     const { scene, gl, size, camera } = useThree()

     
    useEffect(() => void composer.current.setSize(size.width, size.height), [size])


    useEffect(() => {

        const texturePass = new TexturePass();
        const skybox = new TextureLoader().load(
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1598829307/pz_modified_j2baxh.png'
    );//, (map) => texturePass.map = map);
        //composer.current.addPass(texturePass);
        scene.background = skybox;

        composer.current.addPass(new RenderPass(scene, camera));

        // const gaussianEffect = new GaussianEffect();
        // const effectPass = new EffectPass(camera, gaussianEffect);
        // effectPass.renderToScreen = true;
        // composer.current.addPass(effectPass);
        composer.current.addPass(new GaussianEffectPass());

        console.log(composer);


    }, [composer.current]);
    
    useFrame(() => {
        composer.current.render();
    }, 500);

    return(
        <effectComposer ref={composer} args={[gl]}></effectComposer>
    )
}