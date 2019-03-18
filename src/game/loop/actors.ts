import * as THREE from 'three';

import { Actor} from '../actors';
import { getAnim } from '../../model/entity';
import { loadAnim } from '../../model/anim';
import {
    updateKeyframe,
    updateKeyframeInterpolation
} from '../../model/animState';
import { processAnimAction } from './animAction';
import { Time } from '../../datatypes';

export function updateActor(game: any, scene: any, actor: Actor, time: any, step: any) {
    if (actor.runScripts) {
        actor.runScripts(time, step);
    }

    if (actor.model !== null && actor.threeObject && actor.threeObject.visible) {
        const model = actor.model;
        actor.animState.matrixRotation.makeRotationFromQuaternion(actor.physics.orientation);
        updateModel(
            game,
            scene.isActive,
            model,
            actor.animState,
            actor.props.entityIndex,
            actor.props.animIndex,
            time);
        if (actor.animState.isPlaying) {
            updateMovements(actor, time);
        }
    }
}

const wEuler = new THREE.Euler();

function updateMovements(actor: Actor, time: any) {
    const delta = time.delta * 1000;
    if (actor.props.runtimeFlags.isTurning) {
        const baseAngle = ((actor.physics.temp.destAngle - actor.physics.temp.angle) * delta);
        let angle = baseAngle / (actor.props.speed * 10);
        angle = Math.atan2(Math.sin(angle), Math.cos(angle));
        actor.physics.temp.angle += angle;
        wEuler.set(0, actor.physics.temp.angle, 0, 'XZY');
        actor.physics.orientation.setFromEuler(wEuler);
    }
    if (actor.props.runtimeFlags.isWalking) {
        actor.physics.temp.position.set(0, 0, 0);

        const speedZ = ((actor.animState.step.z * delta) / actor.animState.keyframeLength);
        const speedX = ((actor.animState.step.x * delta) / actor.animState.keyframeLength);

        actor.physics.temp.position.x += Math.sin(actor.physics.temp.angle) * speedZ;
        actor.physics.temp.position.z += Math.cos(actor.physics.temp.angle) * speedZ;

        actor.physics.temp.position.x -= Math.cos(actor.physics.temp.angle) * speedX;
        actor.physics.temp.position.z += Math.sin(actor.physics.temp.angle) * speedX;

        actor.physics.temp.position.y +=
            (actor.animState.step.y * delta) / (actor.animState.keyframeLength);
    } else {
        actor.physics.temp.position.set(0, 0, 0);
    }
}

function updateModel(game: any,
                            sceneIsActive: any,
                            model: any,
                            animState: any,
                            entityIdx: number,
                            animIdx: number,
                            time: Time) {
    const entity = model.entities[entityIdx];
    const entityAnim = getAnim(entity, animIdx);
    if (entityAnim !== null) {
        const realAnimIdx = entityAnim.animIndex;
        const anim = loadAnim(model, model.anims, realAnimIdx);
        animState.loopFrame = anim.loopFrame;
        if (animState.prevRealAnimIdx !== -1 && realAnimIdx !== animState.prevRealAnimIdx) {
            updateKeyframeInterpolation(anim, animState, time, realAnimIdx);
        }
        if (realAnimIdx === animState.realAnimIdx || animState.realAnimIdx === -1) {
            updateKeyframe(anim, animState, time, realAnimIdx);
        }
        if (sceneIsActive) {
            processAnimAction({
                game,
                model,
                entityAnim,
                animState
            });
        }
    }
}
