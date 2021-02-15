import * as THREE from 'three';

let registeredObjects = {};
let registeredScenes = {};
let sceneObjectCount = {};// <key, array<objectKeys>

function populateScene(scene, objs) {
    DebugLog('Populating Scene!');
    DebugDir(scene);
    Object.keys(objs).forEach(k => {
        if(registeredObjects[k] != undefined) scene.add(registeredObjects[k]);
    })
    DebugDir(scene);
    DebugLog('(Re)Populated!');
}

export default function RegisterSceneObject(key, obj) {
    registeredObjects[key] = obj;
}

export function GetScene(key, objs) {
    let scene = registeredScenes[key] = registeredScenes[key] || new THREE.Scene();
    if(sceneObjectCount[key] != Object.keys(objs).length) {
        scene.children = [];
        sceneObjectCount[key] = 0;
        populateScene(scene, objs);
    }
    return scene;
}

