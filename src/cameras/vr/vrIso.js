import * as THREE from 'three';

const CAMERA_HERO_OFFSET = new THREE.Vector3(-6, 7.2, 6);

export function getVRIsoCamera() {
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const controlNode = new THREE.Object3D();
    const orientation = new THREE.Object3D();
    orientation.rotation.set(0, Math.PI, 0);
    controlNode.add(orientation);
    orientation.add(camera);
    return {
        controlNode,
        threeCamera: camera,
        resize: (width, height) => {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        },
        init: (scene) => {
            processFollowMovement(controlNode, scene, true);
        },
        update: (scene) => {
            processFollowMovement(controlNode, scene);
        }
    };
}

function processFollowMovement(controlNode, scene, forceUpdate = false) {
    const hero = scene.actors[0];
    const heroPos = new THREE.Vector3();
    heroPos.applyMatrix4(hero.threeObject.matrixWorld);
    const cameraPos = heroPos.clone();
    cameraPos.add(CAMERA_HERO_OFFSET);

    const distance = cameraPos.distanceTo(controlNode.position);

    if (forceUpdate || distance > 3) {
        controlNode.position.copy(cameraPos);
        controlNode.lookAt(heroPos);
    }
}