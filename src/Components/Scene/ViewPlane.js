import React from 'react';
import  {useFrame, useThree} from 'react-three-fiber';
import WindowDimensions from 'Tech/WindowDimensions';

import {Vector} from './Vector';
import * as THREE from 'three';

export default ViewPlane = React.forwardRef((
    {
        material,
        meshProps,
        geoProps,
        preUpdateLogicFn,
        postUpdateLogicFn,
        bufferInitFn,
        initialSize
    }, 
    meshRef
    ) => {

    const tctx = useThree();
    const {windowWidth, windowHeight} = WindowDimensions();

    const initSize = initialSize || {width: 80, height:80};

    let prevCamPos;
    let prevCamRot;
    let prevVwport;
    let prevMeshPos;

    useFrame((state, delta) => {
        
        // if the camera moved
        let camMoved = (
            !prevCamPos || !prevCamPos.checkEach(tctx.camera.position) ||
            !prevCamRot || !prevCamRot.checkEach(tctx.camera.rotation) 
        );

        getArgs = () => { 
            return {
                tctx, 
                state, 
                delta,
                camMoved,
                prevCamPos,
                prevCamRot,
                prevVwport,
            };
        };
        
        preUpdateLogicFn?.(meshRef, getArgs());

        if(camMoved) {
            // current camera positions
            let currCamPos = new Vector(tctx.camera.position);
            let currCamRot = new Vector(tctx.camera.rotation);

            // distance of previous camera to mesh
            let prevMeshCamDist;

                // if not a previous position, we'll base our future caluations form the current (initial) state
            // otherwise:
            if(prevCamPos) {
                // get the previous distance (new target distance)
                prevMeshCamDist = new Vector(mesh.current.position).sub(prevCamPos);

                meshRef.current.position.copy(tctx.camera.position);
                meshRef.current.rotation.copy(tctx.camera.rotation);
                meshRef.current.updateMatrix();
                meshRef.current.translateZ(-prevMeshCamDist.mag());

            }


            // if this is our first time, we'll grab the distance for future updates
            prevMeshCamDist = prevMeshCamDist || new Vector(mesh.current.position).sub(currCamPos);

            // make the plane take up the full screen viewport width
            // camera view in gl units https://stackoverflow.com/a/13351534
            let vFOV = Three.MathUtils.degToRad( tctx.camera.fov );

            let currVport = {};
            currVport.height = 2 * Math.tan( vFOV / 2 ) * prevMeshCamDist.mag();
            currVport.width = currVport.height * tctx.camera.aspect;   

            if(!prevVwport || prevVwport != currVport) {

                bufferInitFn?.();

                let scale = {
                    width:  currVport.width/initSize.width,
                    height: currVport.height/initSize.height
                };

                meshRef.current.scale.set(scale.width, scale.height, 1);

            }

            postUpdateLogicFn?.(meshRef, getArgs());

            prevCamPos = currCamPos;
            prevCamRot = currCamRot;
            prevVwport = currVport;

        }


        if(!moved) postUpdateLogicFn?.(meshRef, getArgs());
        
    });


    return (
        <mesh 
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        {...meshProps} 
        ref={meshRef}
        >
            <planeBufferGeometry
                attach="geometry"
                args={[initSize.width, initSize.height]}
                {...geoProps} 
             />
            {material}
        </mesh>
    );
});