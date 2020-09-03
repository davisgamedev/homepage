import React, { Suspense } from 'react';
import { useFrame, useThree } from "react-three-fiber";
import WindowDimensions from "Tech/WindowDimensions";

import { Icosahedron, Reflector } from 'drei';
import { Vector2, Vector3, IcosahedronBufferGeometry, Vector4, PlaneBufferGeometry } from 'three';
import { useMemo } from 'react';
import Vector, {map} from './Vector';

//import RaymarchBlobFragShader from './Shaders/Old_RaymarchBlobFragShader';

import RaymarchMain from './Shaders/RaymarchMain.js';
import RaymarchPrepass from './Shaders/RaymarchPrepass';
import RaymarchPostpass from './Shaders/RaymarchPostpass';
import GaussianBottomUp from './Shaders/GaussianBottomUp';

import * as Three from 'three';
import { DebugDir } from 'Tech/DebugTools';

const showDebugIcos = false;


/*
    Uniforms are passed into shader in Blob update,
    Update logic is called in Blob update

    Only relevant Uniforms are passed during Blob Update

*/
let Uniforms = {

    DebugLocation: false,

    SampleSize: 10,

    NumSpheres: 15, // check length below
    SphereRadius: 0.5,
    SmoothFactor: 7.5,

    Spheres: Array.from({length: 15}, () => new Vector4()),

    Center: new Vector3(0, -2, 0),
    Eye: new Vector3(0, 0, 0),
    Resolution: new Vector2(600, 800),
    Overdraw: 1,

    BokehStart: 50,
    BokehEnd: 10,
    BokehAdjust: 0.8, 

    GaussianDepth: 2,
    GaussianRingSamples: 12,
    GaussianSizeStart: 1.,
    GaussianSizeEnd: 24.,
    BokehMult: 2.25,
    GammaAdjust: 0.,

    BlurTileDist: 5,

    AmbientLight: new Vector3(0.4, 0.4, 0.4),

    DirectionLightPosition: new Vector3(0., 10., -10.),
    DirectionLightColor: new Vector3(1., 1., 1.),
    DirectionLightIntensity: 1.,
    
    SpecularColor: new Vector3(1., 1., 1.),
    SpecularAlpha: 30.,

    // r g b prevMeshCamDist
    GradientColorSteps: [
        new Vector4( 135, 0, 88,  3 ),
        new Vector4( 242, 66, 54  ,  7 ),
        new Vector4( 245, 247, 73 , 9 ),
        new Vector4( 38, 196, 133 , 12 ),
    ],

    iChannel0: new Three.Texture(),
    iChannel1: new Three.Texture(),
}


Uniforms.GradientColorSteps.forEach(c => {
    c.x /= 256;
    c.y /= 256;
    c.z /= 256;
});


// Convert each property to a Three 'Uniform' object
let temp = Uniforms;
Object.keys(temp).forEach(k => {
    Uniforms[k] = new Three.Uniform(temp[k])
});



const UniformUpdateKeys = [ "Spheres", "Eye", "Center", "Resolution" ];


// GooUpdate: { mesh, rotationSpeed, position, velocity }
const GooUpdates = [];

const spread = 30;
const initialSpeed = 15;

const origin = new Vector(0, 0, -10);
const originMass = 3000; // with each object being 1
const inertia = 1;

const grav = 0.025;


let gravForce;
let deltaCamPos;


const UpdateLogic = (delta) => {

    if(delta > 0.5) return;

    //delta *= 1;

    GooUpdates.forEach((
        {mesh, rotationSpeed, position, velocity, mapped}, i
            ) => {

            mesh.current.rotation.x += rotationSpeed.x * delta;
            mesh.current.rotation.y += rotationSpeed.y * delta;
            mesh.current.rotation.z += rotationSpeed.z * delta;

            // vector from point to origin
            deltaCamPos = origin.sub(position);
            gravForce = (grav * originMass / deltaCamPos.sqMag()) * delta;

            velocity.add(deltaCamPos.mult(gravForce, true), true);


            velocity.mult(inertia, true);

            position.add(velocity.mult(delta), true);

            if(position.max() > 200) {
                position[position.max()] = 199;
                velocity.mult(-0.5, true);
            }

            mesh.current.position.x = position.x;
            mesh.current.position.y = position.y;
            mesh.current.position.z = position.z;

            // closest to actual icos is from 100 - -100, sphere size 1
            mapped = position.map(-200, 200, 75, -75);

            if(Uniforms.Spheres.value[i])
             Uniforms.Spheres.value[i].set(mapped.x, mapped.y, mapped.z, 1);
    });

};



const randomAxis = () => {
    const factor= Math.random();
    const sign = Math.random() > 0.5 ? 1 : -1;
    if(factor < 0.33) return new Vector().up().mult(sign, true);
    if(factor > 0.67) return new Vector().right().mult(sign, true);
    return new Vector().forward().mult(sign, true);
}






export function Goo(props) {

    const mesh = React.useRef();

    let rotationSpeed;
    let position;
    let velocity;
    
    let color = "red";

    useMemo(() => {
        rotationSpeed = new Vector().random();

        position = new Vector().random().mult(spread, true).subScalar(spread/2, true);

        velocity = new Vector().random().mult(initialSpeed, true).subScalar(initialSpeed/2);
        
        let nudge = randomAxis().mult(initialSpeed, true);
        velocity.add(nudge);
    
        GooUpdates.push({mesh, rotationSpeed, position, velocity});
    });

    return(
        <mesh
            ref={mesh}
            position={props.position}
            scale={[1, 1, 1]}
        >
            {
                showDebugIcos? (<>
                    <icosahedronBufferGeometry 
                        attach="geometry" 
                        args={[props.radius||2, props.detail||1]}
                        />
                    <meshPhongMaterial
                            attach="material"
                            args={[{
                                color: color,
                                shininess: 30,
                                specular: 0x454545,
                                flatShading: true,
                            }]}
                        />
                </>) : null
            }
        </mesh>
    );
}


/*
    Thoughts:
        - we do a lot of work to update a plane to fit the screen when we probably 
            could've used a ShaderPass
            However:
                - Shaderpass would implicitly add an overdraw due to it using a single triangle, no?
                - That would involve more raycasts
                - Object scene distance if over screen and not in scene
*/
export default function Blob(props) {

    const mesh = React.useRef();
    const meshBufferA = React.useRef();
    const meshBufferB = React.useRef();

    const meshGaussPrepass = React.useRef();

    const THREE = useThree();
    const {windowWidth, windowHeight} = WindowDimensions();


    Uniforms.Resolution.value = new Vector2(
        windowWidth * Uniforms.Overdraw.value * window.pixelRatio, // set in Scene
        windowHeight * Uniforms.Overdraw.value * window.pixelRatio);


    let previousPosition;
    let previousRotation;
    let previousViewport;
    let previousMeshPosition;

    let initSize = {width: 80, height: 80};

    let bufferAScene;
    let bufferARenderTarget ;
    let bufferBScene;
    let bufferBRenderTarget;


    function setBuffers() {
        bufferARenderTarget = new Three.WebGLRenderTarget(
            Uniforms.Resolution.value.x, Uniforms.Resolution.value.y,
            {
                depthBuffer: false,
                stencilBuffer: false, 
                format: Three.RGBAFormat,
                minFilter: Three.LinearFilter, 
                magFilter: Three.LinearFilter,
                generateMipmaps: false,
            });
        bufferBRenderTarget  = new Three.WebGLRenderTarget(
            Uniforms.Resolution.value.x, Uniforms.Resolution.value.y,
            {
                depthBuffer: false,
                stencilBuffer: false, 
                format: Three.RGBAFormat,
                minFilter: Three.LinearFilter, 
                magFilter: Three.LinearFilter,
                generateMipmaps: false,
            });
        
        Uniforms.iChannel0 = {value: bufferARenderTarget.texture};
        Uniforms.iChannel1 = {value: bufferBRenderTarget.texture};
    }

    setBuffers();


    function renderBuffers() {

        if(!bufferAScene) {
            bufferAScene = new Three.Scene();
            bufferAScene.add(meshBufferA.current);
            
            bufferBScene = new Three.Scene();
            bufferBScene.add(meshBufferB.current);

            THREE.scene.remove(meshBufferA.current.name);
            THREE.scene.remove(meshBufferB.current.name);
        }

        let currentRenderTarget = THREE.gl.getRenderTarget();

        THREE.gl.setRenderTarget(bufferARenderTarget);
        THREE.gl.render(bufferAScene, THREE.camera);

        THREE.gl.setRenderTarget(bufferBRenderTarget);
        THREE.gl.render(bufferBScene, THREE.camera);

        THREE.gl.setRenderTarget(currentRenderTarget);
    }


    function setMesh(mesh, prevMeshCamDist) {

        // allign raymarch view plane to camera
        mesh.current.position.copy(THREE.camera.position);
        mesh.current.rotation.copy(THREE.camera.rotation);
        mesh.current.updateMatrix();

        // push the plane to the correct position
        mesh.current.translateZ(-prevMeshCamDist.mag());
    }



    // todo: use Camera.scissor
    // todo: Camera.depthBuffer, then we can unblock ThreeWater bs
    useFrame((state, delta) => {

        // gets new sphere position calculations
        UpdateLogic(delta);

        // if the camera moved
        if(
            !previousPosition || !previousPosition.checkEach(THREE.camera.position) ||
            !previousRotation || !previousRotation.checkEach(THREE.camera.rotation) 
            ) {

            // current camera positions
            let currentPosition = new Vector(THREE.camera.position);
            let currentRotation = new Vector(THREE.camera.rotation);

            // distance of previous camera to mesh
            let prevMeshCamDist;

            // if not a previous position, we'll base our future caluations form the current (initial) state
            // otherwise:
            if(previousPosition) {
                // get the previous distance (new target distance)
                prevMeshCamDist = new Vector(mesh.current.position).sub(previousPosition);

                setMesh(mesh, prevMeshCamDist);
                setMesh(meshBufferA, prevMeshCamDist);
                setMesh(meshBufferB, prevMeshCamDist);
            }

            // if this is our first time, we'll grab the distance for future updates
            prevMeshCamDist = prevMeshCamDist || new Vector(mesh.current.position).sub(currentPosition);

            // make the plane take up the full screen viewport width
            // camera view in gl units https://stackoverflow.com/a/13351534
            let vFOV = Three.MathUtils.degToRad( THREE.camera.fov );

            let currentViewport = {};
            currentViewport.height = 2 * Math.tan( vFOV / 2 ) * prevMeshCamDist.mag();
            currentViewport.width = currentViewport.height * THREE.camera.aspect;   

            // if we need to resize the plane do so
            if(!previousViewport || previousViewport != currentViewport) {

                setBuffers();

                let scale = {
                    width: currentViewport.width/initSize.width,
                    height: currentViewport.height/initSize.height
                };

                mesh.current.scale.set(scale.width, scale.height, 1);
                meshBufferA.current.scale.set(scale.width, scale.height, 1);
                meshBufferB.current.scale.set(scale.width, scale.height, 1);

            }

            // time to update the world calculations in the shader by updating eye and world center
            let currentMeshPosition = new Vector(mesh.current.position);
            let center = new Vector(Uniforms.Center.value);

            // due to rounding errors we'll need to correct wrong negations and small changes during our checks
            if(previousMeshPosition && 
                !previousMeshPosition.abs().checkEach(currentMeshPosition.abs(), 5)) 
                {

                // add the change in mesh distance
                // world to shader coords are roughly half
                Uniforms.Center.value = 
                    center.add(
                        currentMeshPosition.sub(previousMeshPosition).mult(0.5)
                    ).toArray();
            }

            // set the eye to the current position + world center
            Uniforms.Eye.value = currentPosition.add(center).toArray();

            // update the previous variables for the next frame update
            previousPosition = currentPosition;
            previousRotation = currentRotation;
            previousViewport = currentViewport;
            previousMeshPosition = currentMeshPosition;

        }

        // update the uniforms according to the listed keys which signify what will need updates
        UniformUpdateKeys.forEach(
            key =>{
                mesh.current.material.uniforms[key].value = Uniforms[key].value;
                meshBufferA.current.material.uniforms[key].value = Uniforms[key].value;
                meshBufferB.current.material.uniforms[key].value = Uniforms[key].value;
            });

        meshGaussPrepass.current.material.uniforms["iResolution"] = Uniforms.Resolution;

        renderBuffers();

    });

    const meshProps = {
        position: [0, 0, 0],
        rotation: [0, Math.PI, 0],
    }

    const geoProps = {
        attach: "geometry",
        args: [initSize.width, initSize.height]
    }


    const matProps = {
        attach: "material",
        transparent: true,
        depthTest: false,
    }
    
    return(<group>

        {
            Array.from({length: Uniforms.NumSpheres.value}, (_, i) => <Goo key={i} index={i} />)
        }

        <mesh {...meshProps} ref={mesh} renderOrder={10} >
        <planeBufferGeometry {...geoProps} />
        <shaderMaterial 
            {...matProps}
            uniforms={Uniforms}
            fragmentShader={RaymarchPostpass}
            premultipliedAlpha={true}
        />
        {showDebugIcos ? <Icosahedron args={[5, 2]}> <meshPhongMaterial attach="material" color="pink" flatShading={true}/></Icosahedron> : null}
        </mesh>



        <mesh {...meshProps} ref={meshBufferA} >
        <planeBufferGeometry {...geoProps} />
        <shaderMaterial {...matProps} uniforms={Uniforms} fragmentShader={RaymarchPrepass}/>
        </mesh>

        <mesh {...meshProps} ref={meshBufferB} >
        <planeBufferGeometry {...geoProps} />
        <shaderMaterial {...matProps} uniforms={Uniforms} fragmentShader={RaymarchMain} />
        </mesh>

        <mesh {...meshProps} ref={meshGaussPrepass} renderOrder={9} >
        <planeBufferGeometry {...geoProps} />
        <shaderMaterial 
        {...matProps} 
        fragmentShader={GaussianBottomUp} 
        Uniforms={{
            iChannel0: {value: THREE.gl.texture},
            iResolution: Uniforms.Resolution,
            GaussianDepth: Uniforms.GaussianDepth,
            GaussianRingSamples: Uniforms.GaussianRingSamples,
            GammaAdjust: Uniforms.GammaAdjust,
        }}
        />
        </mesh>


        {showDebugIcos? <Icosahedron args={[5, 2]}> <meshNormalMaterial attach="material" flatShading={true}/> </Icosahedron> : null}


    </group>);
}