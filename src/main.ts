import Phaser from 'phaser';
import debug from './debug';
import Preloader from './Preloader';
import Game from './Game';
import CONSTS from './configs/constants.json';
import './style.css'
import { InspectorGlobalPlugin, InspectorScenePlugin } from 'phaser-plugin-inspector';

type extraConfig = {
	pixelArt: boolean
}

const config: Phaser.Types.Core.GameConfig & extraConfig = {
	type: Phaser.AUTO,
	input: {
		gamepad: true,
	},
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser',
		width: CONSTS.width,
		height: CONSTS.height,
		max: {
			width: CONSTS.max.width,
			height: CONSTS.max.height
		}
	},
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: {
				y: 300
			},
		}
	},
  plugins: {
    // global: [{ key: 'InspectorGlobalPlugin', plugin: InspectorGlobalPlugin, mapping: 'inspectorGame' }],
    // scene: [{ key: 'InspectorScenePlugin', plugin: InspectorScenePlugin, mapping: 'inspectorScene' }]
  },
	scene: [Preloader, Game],
};

new Phaser.Game(config);
