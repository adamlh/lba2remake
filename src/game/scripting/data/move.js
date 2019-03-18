import * as mv from '../move';
import * as cm from '../common';
import * as st from '../structural';
import Indent from '../indent';

export const MoveOpcode = [
    {
        opcode: 0x00,
        command: 'END',
        handler: st.END,
        indent: Indent.ZERO,
        type: 'keyword'
    },
    {
        opcode: 0x01,
        command: 'NOP',
        handler: st.NOP,
        indent: Indent.ONE,
        type: 'keyword'
    },
    {
        opcode: 0x02,
        command: 'BODY',
        handler: cm.BODY,
        args: ['Uint8:body'],
        indent: Indent.ONE,
        type: 'assignment',
        prop: 'body'
    },
    {
        opcode: 0x03,
        command: 'ANIM',
        handler: cm.ANIM,
        args: ['Uint16:anim'],
        indent: Indent.ONE,
        type: 'assignment',
        prop: 'anim'
    },
    {
        opcode: 0x04,
        command: 'GOTO_POINT',
        handler: mv.GOTO_POINT,
        args: ['Uint8:point'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x05,
        command: 'WAIT_ANIM',
        handler: mv.WAIT_ANIM,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x06,
        command: 'LOOP',
        handler: mv.LOOP,
        indent: Indent.ONE,
        type: 'keyword'
    },
    {
        opcode: 0x07,
        command: 'ANGLE',
        handler: mv.ANGLE,
        args: ['Int16:angle'],
        indent: Indent.ONE,
        type: 'assignment'
    },
    {
        opcode: 0x08,
        command: 'POS_POINT',
        handler: cm.POS_POINT,
        args: ['Uint8:point'],
        indent: Indent.ONE,
        type: 'assignment',
        prop: 'position'
    },
    {
        opcode: 0x09,
        command: 'TRACK',
        handler: st.TRACK,
        args: ['Uint8:label'],
        indent: Indent.ZERO,
        type: 'keyword'
    },
    {
        opcode: 0x0A,
        command: 'GOTO',
        handler: st.GOTO,
        args: ['Uint16:offset'],
        indent: Indent.ONE,
        type: 'keyword'
    },
    {
        opcode: 0x0B,
        command: 'STOP',
        handler: st.STOP,
        indent: Indent.ONE,
        type: 'keyword'
    },
    {
        opcode: 0x0C,
        command: 'GOTO_SYM_POINT',
        handler: mv.GOTO_SYM_POINT,
        args: ['Uint8:point'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x0D,
        command: 'WAIT_NUM_ANIM',
        handler: mv.WAIT_NUM_ANIM,
        args: ['Uint8', 'Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x0E,
        command: 'SAMPLE',
        handler: mv.SAMPLE,
        args: ['Uint16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x0F,
        command: 'GOTO_POINT_3D',
        handler: mv.GOTO_POINT_3D,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x10,
        command: 'SPEED',
        handler: mv.SPEED,
        args: ['Uint16'],
        indent: Indent.ONE,
        type: 'assignment'
    },
    {
        opcode: 0x11,
        command: 'BACKGROUND',
        handler: mv.BACKGROUND,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'assignment'
    },
    {
        opcode: 0x12,
        command: 'WAIT_NUM_SECOND',
        handler: mv.WAIT_NUM_SECOND,
        args: ['Uint8', 'Uint32'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x13,
        command: 'NO_BODY',
        handler: cm.NO_BODY,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x14,
        command: 'BETA',
        handler: cm.BETA,
        args: ['Int16:angle'],
        indent: Indent.ONE,
        type: 'assignment',
        prop: 'angle'
    },
    {
        opcode: 0x15,
        command: 'OPEN_LEFT',
        handler: mv.OPEN_LEFT,
        args: ['Int16'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x16,
        command: 'OPEN_RIGHT',
        handler: mv.OPEN_RIGHT,
        args: ['Int16'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x17,
        command: 'OPEN_UP',
        handler: mv.OPEN_UP,
        args: ['Int16'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x18,
        command: 'OPEN_DOWN',
        handler: mv.OPEN_DOWN,
        args: ['Int16'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x19,
        command: 'CLOSE',
        handler: mv.CLOSE,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x1A,
        command: 'WAIT_DOOR',
        handler: mv.WAIT_DOOR,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x1B,
        command: 'SAMPLE_RND',
        handler: mv.SAMPLE_RND,
        args: ['Int16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x1C,
        command: 'SAMPLE_ALWAYS',
        handler: mv.SAMPLE_ALWAYS,
        args: ['Int16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x1D,
        command: 'SAMPLE_STOP',
        handler: mv.SAMPLE_STOP,
        args: ['Int16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x1E,
        command: 'PLAY_VIDEO',
        handler: mv.PLAY_ACF,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x1F,
        command: 'REPEAT_SAMPLE',
        handler: mv.REPEAT_SAMPLE,
        args: ['Int16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x20,
        command: 'SIMPLE_SAMPLE',
        handler: mv.SIMPLE_SAMPLE,
        args: ['Int16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x21,
        command: 'FACE_HERO',
        handler: mv.FACE_HERO,
        args: ['Uint16'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x22,
        command: 'ANGLE_RND',
        handler: mv.ANGLE_RND,
        args: ['Int16', 'Uint16'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x23,
        command: 'REPLACE',
        handler: mv.REPLACE,
        indent: Indent.ZERO,
        type: 'keyword'
    },
    {
        opcode: 0x24,
        command: 'WAIT_NUM_DSEC',
        handler: mv.WAIT_NUM_DSEC,
        args: ['Uint8', 'Uint32'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x25,
        command: 'DO',
        handler: mv.DO,
        indent: Indent.ONE,
        type: 'keyword'
    },
    {
        opcode: 0x26,
        command: 'SPRITE',
        handler: mv.SPRITE,
        args: ['Int16'],
        indent: Indent.ONE,
        type: 'assignment'
    },
    {
        opcode: 0x27,
        command: 'WAIT_NUM_SECOND_RND',
        handler: mv.WAIT_NUM_SECOND_RND,
        args: ['Uint8', 'Uint32'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x28,
        command: 'AFF_TIMER',
        handler: mv.AFF_TIMER,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x29,
        command: 'SET_FRAME',
        handler: mv.SET_FRAME,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x2A,
        command: 'SET_FRAME_3DS',
        handler: mv.SET_FRAME_3DS,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x2B,
        command: 'SET_START_3DS',
        handler: mv.SET_START_3DS,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x2C,
        command: 'SET_END_3DS',
        handler: mv.SET_END_3DS,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x2D,
        command: 'START_ANIM_3DS',
        handler: mv.START_ANIM_3DS,
        args: ['Uint8'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x2E,
        command: 'STOP_ANIM_3DS',
        handler: mv.STOP_ANIM_3DS,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x2F,
        command: 'WAIT_ANIM_3DS',
        handler: mv.WAIT_ANIM_3DS,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x30,
        command: 'WAIT_FRAME_3DS',
        handler: mv.WAIT_FRAME_3DS,
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x31,
        command: 'WAIT_NUM_DECIMAL_RND',
        handler: mv.WAIT_NUM_DECIMAL_RND,
        args: ['Uint8', 'Uint32'],
        indent: Indent.ONE,
        type: 'fct'
    },
    {
        opcode: 0x32,
        command: 'INTERVAL',
        handler: mv.INTERVAL,
        args: ['Uint16'],
        indent: Indent.ONE,
        type: 'assignment'
    },
    {
        opcode: 0x33,
        command: 'FREQUENCY',
        handler: mv.FREQUENCY,
        args: ['Uint16'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'assignment'
    },
    {
        opcode: 0x34,
        command: 'VOLUME',
        handler: mv.VOLUME,
        args: ['Uint8'],
        skipSideScenes: true,
        indent: Indent.ONE,
        type: 'assignment'
    }
];

