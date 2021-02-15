import React from 'react';
import  {useFrame, useThree} from 'react-three-fiber';
import WindowDimensions from 'Tech/WindowDimensions';

import {Vector} from './Vector';

import {Vector3} from 'three';
import * as THREE from 'three';




export function initBuffer(args) {



}

export function getBuffer(args) {

}


// export function getPixelCoordinate(vec, cam, z=-1) {
//     // -1 grabs near plane
//     return new Vector3(vec.x, vec.y, z).unproject(camera);
// }

// export function getViewportCoordinates(camera, windowWidth, windowHeight, dist=-1) {

//     let min = getPixelCoordinate(0, 0, dist);
//     let max = getPixelCoordinate(windowWidth, windowHeight, dist);

//     return {
//         min: getPixelCoordinate(0, 0),
//         max: getPixelCoordinate(windowWidth, windowHeight),
//         center: new Vector3().subVectors(max, min),
//         width: max.x,
//         height: max.y
//     }
// }

function generateID(suffix) {
    return Math.random() * 10000 * Date.now();
}



/**
 * each buffer needs a scene
 * each buffer needs a target
 */
export function Buffer(targetGraphicsPlane, scene) {

    


}




export default GraphicsPlane = (
    {
        meshName,
        preUpdateLogic,
        postUpdateLogic,
        shader: {fragmentShader, uniforms},
        additionalArgs: {meshProps, geometryProps, materialProps},
        createBuffer = true
    }
    ) => {


    const meshRef = React.useRef();

    const tctx = useThree();
    const {windowWidth, windowHeight} = WindowDimensions();

    const initSize = initialSize || {width: 80, height:80};
    const defaultResolution = {x: 800, y: 600};


    if(createBuffer) {
        this.Buffer = new THREE.WebGLRenderTarget(
            windowWidth * window.pixelRatio,
            windowHeight * window.pixelRatio,
            {
                depthBuffer: false,
                stencilBuffer: false, 
                format: Three.RGBAFormat,
                minFilter: Three.LinearFilter, 
                magFilter: Three.LinearFilter,
                generateMipmaps: false,
            }
        )
    }




    this.UpdateUniforms = function(uniforms) {
        meshRef.current.material.uniforms = uniforms;
    }

    this.setBuffer = function() {
        if(createBuffer) {
            this.Buffer.setSize(windowWidth * window.pixelRatio, windowHeight * window.pixelRatio);
        }
    }

    // 
    let previousCameraPosition;
    let previousCameraRotation;
    let previousViewport;

    // notes: we grab the mesh position, so that this mesh can be moved in the future for better
    //          object staging, rather than having to move all objects relative to the graphics plane
    let previousMeshPosition;

    
    // distance of previous camera to mesh
    let previousMeshCameraDistance;

    useFrame((state, delta) => {
        
        // if the camera moved
        let camMoved = (
            !previousCameraPosition || !previousCameraPosition.checkEach(tctx.camera.position) ||
            !previousCameraRotation || !previousCameraRotation.checkEach(tctx.camera.rotation) 
        );

        getArgs = () => { 
            return {
                mesh: meshRef.current,
                tctx, state, delta,
                camMoved,
                previousCameraPosition,
                previousCameraRotation,
                previousViewport,
            };
        };
        
        preUpdateLogic?.(meshRef, getArgs());

        if(camMoved) {
            // current camera positions
            let currCamPos = new Vector(tctx.camera.position);
            let currCamRot = new Vector(tctx.camera.rotation);


                // if not a previous position, we'll base our future caluations form the current (initial) state
            // otherwise:
            if(previousCameraPosition) {
                // get the previous distance (new target distance)
                previousMeshCameraDistance = new Vector(mesh.current.position).sub(previousCameraPosition);

                meshRef.current.position.copy(tctx.camera.position);
                meshRef.current.rotation.copy(tctx.camera.rotation);
                meshRef.current.updateMatrix();
                meshRef.current.translateZ(-previousMeshCameraDistance.mag());

            }


            // if this is our first time, we'll grab the distance for future updates
            previousMeshCameraDistance = previousMeshCameraDistance || new Vector(mesh.current.position).sub(currCamPos);



            // make the plane take up the full screen viewport width
            // camera view in gl units https://stackoverflow.com/a/13351534
            /*
                One way of adjusting to screen size is to check for changes
                 in the window, and then unprojecting the new dimensions
                But really the window size isn't important, only the aspect ratio
                If the aspect ration changes, we can instead of unprojecting, borrow
                 the angle of the FoV, and do some trig to recalculate a corner of the plane
                 and then readjust the scale of the plane
                I didn't write the code below but I'm pretty sure that's what it's doing
                 and far more elegantly than what I could do.
            */
            let vFOV = Three.MathUtils.degToRad( tctx.camera.fov );

            let currentViewPort = {};
            currentViewPort.height = 2 * Math.tan( vFOV / 2 ) * previousMeshCameraDistance.mag();
            currentViewPort.width = currentViewPort.height * tctx.camera.aspect;   

            if(!previousViewport || previousViewport != currentViewPort) {

                setBuffer();

                let scale = {
                    width:  currentViewPort.width/initSize.width,
                    height: currentViewPort.height/initSize.height
                };

                meshRef.current.scale.set(scale.width, scale.height, 1);

            }

            postUpdateLogic?.(meshRef, getArgs());

            previousCameraPosition = currCamPos;
            previousCameraRotation = currCamRot;
            previousViewport = currentViewPort;

        }


        if(!moved) postUpdateLogic?.(meshRef, getArgs());
        
    });



    let id = generateID();
    meshName = meshName || ('GraphicsPlane_' + id);
    let geometryName = geometryProps.name || (meshName + '_Geometry');
    let materialName = materialProps.name || (meshName + '_Material');

    return (
        <mesh 
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        {...meshProps} 
        ref={meshRef}
        name={meshName}
        >
            <planeBufferGeometry attach="geometry"
                args={[initSize.width, initSize.height]}
                name={geometryName}
                {...geometryProps} 
             />
            {
                shader? 
                    <shaderMaterial attach="geometry"

                    {...shader}
                    // frag and unis should be unrolled above, but just in case
                    fragmentShader={shader.fragmentShader}
                    uniforms={shader.uniforms}

                    transparent={true}
                    depthTest={false}
                    name={materialName}
                    {...materialProps} 

                    />
                :
                    <meshPhongMaterial attach="material" 
                    flatShading={true} 
                    name={materialName}
                    {...materialProps}
                    />
            }
        </mesh>
    );
});