import Phaser from 'phaser';
import debug from './debug';
import Preloader from './Preloader';
import Game from './Game';
import CONSTS from './configs/constants.json';
import './style.css'
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
			debug,
			gravity: {
				y: 5500
			},
		}
	},
	scene: [Preloader, Game],
};

new Phaser.Game(config);
