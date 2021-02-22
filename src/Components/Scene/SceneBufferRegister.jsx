import * as THREE from 'three';
import DebugLog, { DebugDir } from '../../Tech/DebugTools';

let objectGlobalRegister = {};
let sceneRegister = {};
let perSceneObjectCount = {};// <key, array<objectKeys>

let bufferRegister = {};

function populateScene(scene, objs) {
    DebugLog('Populating Scene!');
    DebugDir(scene);
    Object.keys(objs).forEach(k => {
        if(objectGlobalRegister[k]) scene.add(objectGlobalRegister[k]);
    })
    DebugDir(scene);
    DebugLog('(Re)Populated!');
}


export function RegisterSceneObject(key, obj) {
    objectGlobalRegister[key] = obj;
}

export function GetScene(key, objs) {
    let scene = sceneRegister[key] = (sceneRegister[key] || new THREE.Scene());
    if(perSceneObjectCount[key] != Object.keys(objs).length) {
        scene.children = [];
        perSceneObjectCount[key] = 0;
        populateScene(scene, objs);
    }
    return scene;
}

export function SetBufferTarget(name, buffer) {
    bufferRegister[name] = buffer;
};

export function GetBufferContentsTexture(name) {
    return bufferRegister[name].texture;
}


const SceneNotRegisteredError = () => { throw new Error("Scene was not registered on buffer render!"); };
const BufferNotRegisteredError = () => { throw new Error("Buffer was not registered on buffer render!"); };

export function RenderBuffer({gl, camera}, bufferName, sceneName) {
    let buffer = bufferRegister[bufferName] || BufferNotRegisteredError();
    let scene =  sceneRegister[sceneName] || SceneNotRegisteredError();
    
    let prevRenderTarget = gl.getRenderTarget();
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(prevRenderTarget);
}