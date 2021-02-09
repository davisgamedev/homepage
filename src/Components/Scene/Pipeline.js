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

export function updateUniforms(args) {

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

export function generateName(suffix) {
    return suffix + Math.random() * 10000 * Date.now();
}


export default GraphicsPlane = React.forwardRef((
    {
        meshName,
        preUpdateLogic,
        postUpdateLogic,
        shader: {fragmentShader, uniforms},
        additionalArgs: {meshProps, geometryProps, materialProps}

    }, 
    meshRef
    ) => {

    const tctx = useThree();
    const {windowWidth, windowHeight} = WindowDimensions();

    const initSize = initialSize || {width: 80, height:80};

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
                tctx, 
                state, 
                delta,
                camMoved,
                prevCamPos: previousCameraPosition,
                prevCamRot: previousCameraRotation,
                prevVwport: previousViewport,
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

            if(!previousViewport || previousViewport.center != currentViewPort.center) {

                bufferInitFn?.();

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




    meshName = meshName || generateName("GraphicsPlane-");

    return (
        <mesh 
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        {...meshProps} 
        ref={meshRef}
        name={meshName}
        >
            <planeBufferGeometry
                attach="geometry"
                args={[initSize.width, initSize.height]}
                {...geoProps} 
                name={geoProps.name || ''}
             />
            {shader? <shaderMaterial {...materialProps} uniforms={uniforms} shader
            
        }
        </mesh>
    );
});