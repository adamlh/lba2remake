import * as THREE from 'three';

import { loadModel, Model } from '../model';
import { loadAnimState, resetAnimState } from '../model/animState';
import { angleToRad, distance2D, angleTo, getDistanceLba } from '../utils/lba';
import { loadSprite } from '../iso/sprites';

import { getObjectName } from '../ui/editor/DebugData';
import { runScript } from './scripting';

interface ActorFlags {
    hasCollisions: boolean;
    isVisible: boolean;
    isSprite: boolean;
    spriteAnim3DNumber: boolean;
}

interface ActorProps {
    index: number;
    sceneIndex: number;
    pos: [number, number, number];
    life: number;
    flags: ActorFlags;
    runtimeFlags: any;
    entityIndex: number;
    bodyIndex: number;
    animIndex: number;
    angle: number;
    speed: number;
    spriteIndex: number;
    hasSpriteAnim3D: number;
}

interface ActorPhysics {
    position: THREE.Vector3;
    orientation: THREE.Quaternion;
    temp: {
        position: THREE.Vector3,
        angle: number,
        destAngle: number
    };
}

export interface Actor {
    index: number;
    type: 'actor';
    props: ActorProps;
    threeObject?: THREE.Object3D;
    model?: Model;
    physics: ActorPhysics;
    animState: any;
    isVisible: boolean;
    isSprite: boolean;
    isKilled: boolean;
    runScripts?: Function;
    loadMesh: Function;
    reload: Function;
    hasCollidedWithActor: number;
    floorSound: number;
    reset: Function;
    resetAnimState: Function;
    resetPhysics: Function;
    goto: Function;
    facePoint: Function;
    setAngle: Function;
    getDistance: Function;
    getDistanceLba: Function;
    stop: Function;
    setBody: Function;
    setAnim: Function;
}

export const DirMode = {
    NO_MOVE: 0,
    MANUAL: 1,
    FOLLOW: 2,
    TRACK: 3,
    FOLLOW2: 4,
    TRACK_ATTACK: 5,
    SAME_XZ: 6,
    PINGUIN: 7,
    WAGON: 8,
    MOVE_CIRCLE: 9,
    MOVE_CIRCLE2: 10,
    SAME_XZ_BETA: 11,
    MOVE_BUGGY: 12,
    MOVE_BUGGY_MANUAL: 13
};

// TODO: move section offset to container THREE.Object3D
export async function loadActor(
    params: any,
    envInfo: any,
    ambience: any,
    props: ActorProps,
    isSideScene: boolean) {
    const skipModel = isSideScene && props.index === 0;
    const animState = !skipModel ? loadAnimState() : null;
    const actor: Actor = {
        type: 'actor',
        index: props.index,
        props,
        physics: initPhysics(props),
        isKilled: false,
        isVisible: props.flags.isVisible
            && (props.life > 0 || props.bodyIndex >= 0)
            && props.index !== 1,
        isSprite: props.flags.isSprite,
        hasCollidedWithActor: -1,
        floorSound: -1,
        model: null,
        threeObject: null,
        animState,

        /* @inspector(locate) */
        runScripts(time) {
            if (this.scripts) {
                runScript(params, this.scripts.life, time);
                runScript(params, this.scripts.move, time);
            }
        },

        /* @inspector(locate) */
        reset() {
            this.resetAnimState();
            this.resetPhysics();
            this.isKilled = false;
            this.floorSound = -1;
        },

        /* @inspector(locate) */
        resetAnimState() {
            resetAnimState(this.animState);
        },

        /* @inspector(locate) */
        resetPhysics() {
            this.physics = initPhysics(props);
        },

        /* @inspector(locate) */
        goto(point) {
            this.physics.temp.destination = point;
            let destAngle = angleTo(this.physics.position, point);
            const signCurr = this.physics.temp.destAngle > 0 ? 1 : -1;
            const signTgt = destAngle > 0 ? 1 : -1;
            if (signCurr !== signTgt && Math.abs(destAngle) > Math.PI / 4) {
                if (signCurr === -1) {
                    destAngle -= 2 * Math.PI;
                } else {
                    destAngle += 2 * Math.PI;
                }
            }
            this.physics.temp.destAngle = destAngle;
            this.props.runtimeFlags.isWalking = true;
            this.props.runtimeFlags.isTurning = true;
            return this.getDistance(point);
        },

        /* @inspector(locate) */
        facePoint(point) {
            let destAngle = angleTo(this.physics.position, point);
            const signCurr = this.physics.temp.destAngle > 0 ? 1 : -1;
            const signTgt = destAngle > 0 ? 1 : -1;
            if (signCurr !== signTgt && Math.abs(destAngle) > Math.PI / 4) {
                if (signCurr === -1) {
                    destAngle -= 2 * Math.PI;
                } else {
                    destAngle += 2 * Math.PI;
                }
            }
            this.physics.temp.destAngle = destAngle;
            this.props.runtimeFlags.isTurning = true;
        },

        /* @inspector(locate) */
        setAngle(angle) {
            this.props.runtimeFlags.isTurning = true;
            this.props.angle = angle;
            this.physics.temp.destAngle = angleToRad(angle);
        },

        /* @inspector(locate, pure) */
        getDistance(pos) {
            return distance2D(this.physics.position, pos);
        },

        /* @inspector(locate, pure) */
        getDistanceLba(pos) {
            return getDistanceLba(this.getDistance(pos));
        },

        /* @inspector(locate) */
        stop() {
            this.props.runtimeFlags.isWalking = false;
            this.props.runtimeFlags.isTurning = false;
            this.physics.temp.destAngle = this.physics.temp.angle;
            delete this.physics.temp.destination;
        },

        /* @inspector(locate) */
        async loadMesh() {
            // only if not sprite actor
            if (!this.isSprite && this.props.bodyIndex !== 0xFF) {
                const {entityIndex, bodyIndex, animIndex} = this.props;
                const model = await loadModel(
                    params,
                    entityIndex,
                    bodyIndex,
                    animIndex,
                    animState,
                    envInfo,
                    ambience
                );
                if (model !== null) {
                    // model.mesh.visible = actor.isVisible;
                    model.mesh.position.copy(this.physics.position);
                    model.mesh.quaternion.copy(this.physics.orientation);
                    this.model = model;
                    this.threeObject = model.mesh;
                    if (this.threeObject) {
                        const name = getObjectName('actor',
                                                    this.props.sceneIndex,
                                                    this.props.index);
                        this.threeObject.name = `actor:${name}`;
                        this.threeObject.visible = this.isVisible;
                    }
                }
            } else {
                const sprite = await loadSprite(this.props.spriteIndex);
                sprite.threeObject.position.copy(this.physics.position);
                // sprite.threeObject.quaternion.copy(actor.physics.orientation);
                this.threeObject = sprite.threeObject;
                if (this.threeObject) {
                    const name = getObjectName('actor',
                                                this.props.sceneIndex,
                                                this.props.index);
                    this.threeObject.name = `actor:${name}`;
                    this.threeObject.visible = this.isVisible;
                }
            }
        },

        /* @inspector(locate) */
        setBody(scene, index) {
            if (this.props.bodyIndex === index) {
                return;
            }
            this.props.bodyIndex = index;
            this.reload(scene);
        },

        /* @inspector(locate) */
        setAnim(index) {
            if (this.props.animIndex === index) {
                return;
            }
            this.props.animIndex = index;
            this.resetAnimState();
        },

        /* @inspector(locate) */
        reload(scene) {
            if (this.threeObject) {
                this.threeObject.visible = false;
                scene.removeMesh(this.threeObject);
                this.threeObject = null;
            }
            if (this.model) {
                this.model = null;
            }
            this.loadMesh().then(() => {
                scene.addMesh(this.threeObject);
            });
        }
    };

    const euler = new THREE.Euler(0, angleToRad(props.angle), 0, 'XZY');
    actor.physics.orientation.setFromEuler(euler);

    if (!skipModel) {
        await actor.loadMesh();
    }
    return actor;
}

function initPhysics({pos, angle}) {
    return {
        position: new THREE.Vector3(pos[0], pos[1], pos[2]),
        orientation: new THREE.Quaternion(),
        temp: {
            destination: new THREE.Vector3(0, 0, 0),
            position: new THREE.Vector3(0, 0, 0),
            angle: angleToRad(angle),
            destAngle: angleToRad(angle),
        }
    };
}
