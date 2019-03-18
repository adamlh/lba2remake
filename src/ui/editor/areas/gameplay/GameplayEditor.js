import {clone} from 'lodash';
import GameUI from '../../../GameUI';
import ScriptEditorArea from './scripts/ScriptsArea';
import InspectorArea from '../shared/InspectorArea/InspectorArea';
import SceneArea from './scene/SceneArea';
import LocatorArea from './locator/LocatorArea';
import GameplayEditorMenu from './GameplayEditorMenu';
import {Orientation, Type} from '../../layout';

const GameplayEditor = {
    id: 'game',
    name: 'Gameplay Editor',
    menu: GameplayEditorMenu,
    content: GameUI,
    icon: 'game.png',
    mainArea: true,
    getInitialState: () => ({
        labels: {
            actor: false,
            zone: false,
            point: false
        }
    }),
    stateHandler: {
        setLabel(type, value) {
            const labels = clone(this.state.labels);
            labels[type] = value;
            this.setState({labels});
        }
    },
    toolAreas: [
        ScriptEditorArea,
        InspectorArea,
        SceneArea,
        LocatorArea,
    ],
    defaultLayout: {
        type: Type.LAYOUT,
        orientation: Orientation.HORIZONTAL,
        splitAt: 60,
        children: [
            {
                type: Type.LAYOUT,
                orientation: Orientation.VERTICAL,
                splitAt: 70,
                children: [
                    { type: Type.AREA, content_id: 'game', root: true },
                    { type: Type.AREA, content_id: 'script_editor' },
                    { type: Type.AREA, content_id: 'changelog' }
                ]
            },
            {
                type: Type.LAYOUT,
                orientation: Orientation.VERTICAL,
                splitAt: 70,
                children: [
                    {
                        type: Type.LAYOUT,
                        orientation: Orientation.VERTICAL,
                        splitAt: 50,
                        children: [
                            { type: Type.AREA, content_id: 'scene_outliner' },
                            { type: Type.AREA, content_id: 'locator' }
                        ]
                    },
                    { type: Type.AREA, content_id: 'inspector' }
                ]
            }
        ]
    }
};

export default GameplayEditor;
