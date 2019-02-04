import * as THREE from 'three';

export function processFollowIsoMovement(renderer, camera, scene) {
    centerIsoCamera(renderer, camera, scene);
}

export function centerIsoCamera(renderer, camera, scene, object) {
    if (camera.type === 'PerspectiveCamera') {
        const hero = scene.actors[0];
        const heroPos = new THREE.Vector3();
        heroPos.applyMatrix4(hero.threeObject.matrixWorld);
        camera.position.copy(heroPos);
        camera.position.add(new THREE.Vector3(-0.25, 0.3, 0.25));
        camera.lookAt(heroPos);
    } else {
        if (!object) {
            object = scene.actors[0];
        }

        if (!object.threeObject)
            return;

        const pos = getObjectIsoPos(renderer, camera, object);
        const {width, height} = camera.size;
        const sz = new THREE.Vector2(width, height);
        pos.multiply(sz);
        camera.offset.add(pos);
        camera.updateProjectionMatrix();
    }
}

export function processFreeIsoMovement(controlsState, camera, time) {
    if (camera.type !== 'PerspectiveCamera') {
        camera.offset.add(new THREE.Vector2(
            controlsState.cameraSpeed.x * time.delta * 500,
            -controlsState.cameraSpeed.z * time.delta * 500
        ));
        camera.updateProjectionMatrix();
    }
}

function getObjectIsoPos(renderer, camera, object) {
    let objectHeight = 0;
    if (object.model) {
        const bb = object.model.boundingBox;
        objectHeight = bb.max.y - bb.min.y;
    }
    const pos = new THREE.Vector3(0, objectHeight * 0.5, 0);
    object.threeObject.updateMatrix();
    object.threeObject.updateMatrixWorld();
    pos.applyMatrix4(object.threeObject.matrixWorld);
    pos.project(camera);
    return new THREE.Vector2(pos.x, pos.y);
}
