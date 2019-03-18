import { unimplemented } from './utils';

export function GOTO_POINT(point) {
    const distance = this.actor.goto(point.physics.position);

    if (distance > 0.5) {
        this.state.reentryOffset = this.state.offset;
        this.state.continue = false;
    } else {
        this.actor.stop();
    }
}

export function WAIT_ANIM() {
    if (this.actor.animState.hasEnded) {
        this.actor.props.angle = 0;
    } else {
        this.state.reentryOffset = this.state.offset;
        this.state.continue = false;
    }
}

export function ANGLE(angle) {
    this.actor.setAngle(angle);
}

export const GOTO_SYM_POINT = unimplemented();

export function WAIT_NUM_ANIM(repeats) {
    if (!this.state.animCount) {
        this.state.animCount = 0;
    }
    if (this.actor.animState.hasEnded) {
        this.state.animCount += 1;
        if (this.state.animCount === repeats) {
            this.state.animCount = 0;
        } else {
            this.state.continue = false;
        }
    } else {
        this.state.continue = false;
    }

    if (!this.state.continue) {
        this.state.reentryOffset = this.state.offset;
    }
}

export function SAMPLE(index) {
    const soundFxSource = this.game.getAudioManager().getSoundFxSource();
    soundFxSource.load(index, () => {
        soundFxSource.play();
    });
}

export const GOTO_POINT_3D = unimplemented();

export function SPEED(speed) {
    this.actor.props.speed = speed;
}

export const BACKGROUND = unimplemented();

export function WAIT_NUM_SECOND(numSeconds, unknown, time) {
    if (!this.state.waitUntil) {
        this.state.waitUntil = time.elapsed + numSeconds;
    }
    if (time.elapsed < this.state.waitUntil) {
        this.state.reentryOffset = this.state.offset;
        this.state.continue = false;
    } else {
        delete this.state.waitUntil;
    }
}

export function WAIT_NUM_DSEC(numDsec, unknown, time) {
    WAIT_NUM_SECOND.call(this, numDsec * 0.1, null, time);
}

export function WAIT_NUM_SECOND_RND(maxNumSeconds, unknown, time) {
    const numSeconds = Math.floor(Math.random() * maxNumSeconds);
    WAIT_NUM_SECOND.call(this, numSeconds, null, time);
}

export function WAIT_NUM_DECIMAL_RND(maxNumDsec, unknown, time) {
    const numDsec = Math.floor(Math.random() * maxNumDsec);
    WAIT_NUM_SECOND.call(this, numDsec * 0.1, null, time);
}

export const OPEN_LEFT = unimplemented();

export const OPEN_RIGHT = unimplemented();

export const OPEN_UP = unimplemented();

export const OPEN_DOWN = unimplemented();

export const CLOSE = unimplemented();

export const WAIT_DOOR = unimplemented();

export function SAMPLE_RND(index) {
    const soundFxSource = this.game.getAudioManager().getSoundFxSource();
    soundFxSource.load(index, () => {
        soundFxSource.play();
    });
}

export function SAMPLE_ALWAYS(index) {
    const soundFxSource = this.game.getAudioManager().getSoundFxSource();
    soundFxSource.load(index, () => {
        soundFxSource.play();
    });
}

export const SAMPLE_STOP = unimplemented();

export const PLAY_ACF = unimplemented();

export const REPEAT_SAMPLE = unimplemented();

export function SIMPLE_SAMPLE(index) {
    const soundFxSource = this.game.getAudioManager().getSoundFxSource();
    soundFxSource.load(index, () => {
        soundFxSource.play();
    });
}

export function FACE_HERO() {
    const hero = this.scene.actors[0];
    this.actor.facePoint(hero.physics.position);

    const distAngle = Math.abs(this.actor.physics.temp.destAngle - this.actor.physics.temp.angle);

    if (distAngle > Math.PI / 8) {
        this.state.reentryOffset = this.state.offset;
        this.state.continue = false;
    } else {
        this.actor.stop();
    }
}

export const DO = unimplemented();

export const AFF_TIMER = unimplemented();

export const ANGLE_RND = unimplemented();

export const REPLACE = unimplemented();

export const SPRITE = unimplemented();

export const SET_FRAME = unimplemented();

export const SET_FRAME_3DS = unimplemented();

export const SET_START_3DS = unimplemented();

export const SET_END_3DS = unimplemented();

export const START_ANIM_3DS = unimplemented();

export const STOP_ANIM_3DS = unimplemented();

export const WAIT_ANIM_3DS = unimplemented();

export const WAIT_FRAME_3DS = unimplemented();

export const INTERVAL = unimplemented();

export const FREQUENCY = unimplemented();

export const VOLUME = unimplemented();

export const LOOP = unimplemented();
