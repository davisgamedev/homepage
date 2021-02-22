import * as THREE from 'three';
import DebugLog, { DebugDir, DebugColorLog } from '../../Tech/DebugTools';

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
    return bufferRegister[name]?.texture || null;;
}



export function RenderBuffer({gl, camera}, bufferName, sceneName) {
    let buffer = bufferRegister[bufferName];
    let scene =  sceneRegister[sceneName];

    if(buffer && scene) {
        let prevRenderTarget = gl.getRenderTarget();
        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(prevRenderTarget);
    }
    else DebugColorLog(`Scene: ${sceneName}, Buffer: ${bufferName} could not be rendered!`, 'red');
}