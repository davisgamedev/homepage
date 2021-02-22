import React from 'react';
import  {useFrame, useThree} from 'react-three-fiber';
import WindowDimensions from 'Tech/WindowDimensions';

import Vector from './Vector';

import {Vector3} from 'three';
import * as THREE from 'three';

import DebugLog, {DebugDir, DebugColorLog} from 'Tech/DebugTools';
import {GetScene, RegisterSceneObject, RenderBuffer, SetBufferTarget} from './SceneBufferRegister';


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

function nullify(obj) { return Object.keys(obj) > 0 ? obj : null; }

export default function GraphicsPlane(props){

    const {
        meshName,
    
        excludeFromMainScene = false,
        excludeFromBufferScene = false,
        initialSize,
    
        meshProps = {}, 
        geoProps  = {},
        matProps  = {},
    
        fragShader,
        fragShaderGetUniFn,
    
        bufferName, 
        bufferSceneObjects = {}, 
        bufferSceneName    = bufferName, 
    
        externalBufferOnly = false,
        externalBufferSource = bufferName, 
    
    } = props;

    const meshRef = React.useRef();

    const tctx = useThree();
    const {windowWidth, windowHeight} = WindowDimensions();

    const initSize = initialSize || {width: 80, height:80};
    const defaultResolution = {x: 800, y: 600};
    
    let id = generateID();
    let _meshName = meshName || ('GraphicsPlane_' + id);
    let geometryName = geoProps?.name || (_meshName + '_Geometry');
    let materialName = matProps?.name || (_meshName + '_Material');

    let _buffer = !externalBufferOnly;
    let _state = {};
    let _delta;
    let _init = false;


    function setBuffer() {
        if(_buffer) _buffer.setSize(windowWidth * window.pixelRatio, windowHeight * window.pixelRatio);
    }

    function getState() {
        return {
            mesh: meshRef.current, 
            meshName: _meshName,
            delta: _delta,
            tctx: tctx,
            ..._state
        };
    }

    function init() {
        RegisterSceneObject(_meshName, meshRef.current);

        if(_buffer) {
            _buffer = new THREE.WebGLRenderTarget(
                windowWidth * window.pixelRatio,
                windowHeight * window.pixelRatio,
                {
                    depthBuffer: false,
                    stencilBuffer: false, 
                    format: THREE.RGBAFormat,
                    minFilter: THREE.LinearFilter,  
                    magFilter: THREE.LinearFilter,
                    generateMipmaps: false,
                }
            );
            SetBufferTarget(bufferName, _buffer);
        }

        if(excludeFromMainScene) {
            tctx.scene.remove(meshRef.current);
        } 
        if(!excludeFromBufferScene) {
            bufferSceneObjects[_meshName] = meshRef.current;
        }

        _init = true;
    }

    // notes: we grab the mesh position, so that this mesh can be moved in the future for better
    //          object staging, rather than having to move all objects relative to the graphics plane

    useFrame((state, delta) => {

        let {
            cameraPosition,
            cameraRotation,
            viewport,
            meshPosition,
            meshCameraDistance
        } = _state;
        
        // if the camera moved
        let moved = _init || (
            !cameraPosition || !cameraPosition.checkEach(tctx.camera.position) ||
            !cameraRotation || !cameraRotation.checkEach(tctx.camera.rotation) 
        );
        
        _delta = delta;
        if(!_init) init();

        //preUpdateLogic?.(meshRef, getArgs());

        if(moved) {
            // current camera positions
            let currentCameraPosition = new Vector(tctx.camera.position);
            let currentCameraRotation = new Vector(tctx.camera.rotation);


                // if not a previous position, we'll base our future caluations form the current (initial) state
            // otherwise:
            if(cameraPosition) {
                // get the previous distance (new target distance)
                meshCameraDistance = new Vector(meshRef.current.position).sub(cameraPosition);

                meshRef.current.position.copy(tctx.camera.position);
                meshRef.current.rotation.copy(tctx.camera.rotation);
                meshRef.current.updateMatrix();
                meshRef.current.translateZ(-meshCameraDistance.mag());

            }


            // if this is our first time, we'll grab the distance for future updates
            meshCameraDistance = meshCameraDistance || new Vector(meshRef.current.position).sub(currentCameraPosition);



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
            let vFOV = THREE.MathUtils.degToRad( tctx.camera.fov );

            let currentViewport = {};
            currentViewport.height = 2 * Math.tan( vFOV / 2 ) * meshCameraDistance.mag();
            currentViewport.width = currentViewport.height * tctx.camera.aspect;   

            if(!viewport || viewport != currentViewport) {

                setBuffer();

                let scale = {
                    width:  currentViewport.width/initSize.width,
                    height: currentViewport.height/initSize.height
                };

                meshRef.current.scale.set(scale.width, scale.height, 1);

            }

            /*
                cameraPostition,
                cameraRotation,++++
                meshPosition,
                meshCameraDistance
            */
           

            // this is gross, but this is much faster than fun key string trickery
            _state = {

                previousCameraPosition:     cameraPosition,
                previousCameraRotation:     cameraRotation,
                previousViewport:           viewport,
                previousPosition:           meshPosition,
                previousMeshCameraDistance: meshCameraDistance, 

                cameraPosition:             currentCameraPosition,
                cameraRoatation:            currentCameraRotation,
                viewport:                   currentViewport,
                meshPosition:               meshRef.current.position,
                meshCameraDistance:         meshCameraDistance,

                currentCameraPosition,
                currentCameraRotation,
                currentViewport,
                currentMeshPosition:        meshRef.current.position,
                currentMeshCameraDistance:  meshCameraDistance,
                
                moved
            };

        }
        DebugLog(fragShader);

        if(fragShader) {
            DebugDir(getState());
            if(fragShaderGetUniFn) {
                meshRef.current.material.uniforms = fragShaderGetUniFn(getState());
            }
        }
        
    });

    return (
        <mesh 
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        {...meshProps} 
        ref={meshRef}
        name={_meshName}
        >
            <planeBufferGeometry attach="geometry"
                args={[initSize.width, initSize.height]}
                name={geometryName}
                {...geoProps} 
             />
            {
                fragShader? 
                    <shaderMaterial attach="geometry"

                    fragmentShader={fragShader}

                    transparent={true}
                    depthTest={false}
                    name={materialName}
                    {...matProps} 

                    />
                : 
                    <meshPhongMaterial attach="material" 
                    flatShading={true} 
                    name={materialName}
                    {...matProps}
                    />
            }
        </mesh>);
};
