import Phaser from 'phaser';
import debug from '~/debug';
import Game from './Game';

import '/scss/main.scss';

type extraConfig = {
	pixelArt: boolean
}

const config: Phaser.Types.Core.GameConfig & extraConfig = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser',
		width: 1200,
		height: 600,
		max: {
				width: 2400,
				height: 1200
		}
	},
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug,
			useTree: false
		}
	},
	scene: [Game],
};

new Phaser.Game(config);
