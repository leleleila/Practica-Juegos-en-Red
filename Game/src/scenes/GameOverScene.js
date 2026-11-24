import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class GameOverScene extends BaseScene {
    constructor() {
        super('GameOverScene');
    }

    init(data){
        this.score = data.score || {player1: 0, player2: 0}
    }
// Cargamos sprites
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('boton_volver', 'assets/images/boton_volver.png');
        this.load.spritesheet('trofeo', 'assets/images/trofeo.png', {
            frameWidth : 256,
            frameHeight: 256
        });
        this.load.audio('victoria', 'assets/audio/victoria.mp3');
    }
 
 //Botón volver al menú
 create(){
    // Fondo
        this.cameras.main.setBackgroundColor('#91dfeb');

        // Título
        this.crearTexto(480, 70, 'GAME OVER', '#000000', '60px' );

    if(!this.anims.exists('brillar_trofeo')){
        this.anims.create({
            key: 'brillar_trofeo',
            frames: this.anims.generateFrameNumbers('trofeo', {start: 0, end: 6}),
            frameRate: 8,
            repeat: -1
        })
    }
    
    const spriteTrofeo = this.add.sprite(480, 290, 'trofeo');
        spriteTrofeo.setScale(1.5); 
        spriteTrofeo.play('brillar_trofeo');
    
        let textoGanador = '';
        if (this.score.player1 > this.score.player2) {
            textoGanador = 'JUGADOR 1';
        } else {
            textoGanador = 'JUGADOR 2';
        }

        this.crearTexto(480, 430, textoGanador, '#000000', '30px');
        // Marcador final
        this.crearTexto(480, 510, `${this.score.player1}  -  ${this.score.player2}`, '#000000', '42px' );
    
    const savedVolume = this.registry.get('volume') !== undefined ? this.registry.get('volume') : 1;
        this.sound.volume = savedVolume;
        this.music = this.sound.add('victoria', { loop: true });
        this.music.play();

    //Botón de volver al menú principal
    this.crearBotonDibujo(900, 480, 32, 32, 'MenuScene', null);

    // Parar y destruir la música automáticamente al salir de GameOverScene
        this.events.once('shutdown', () => {
            if (this.music) {
                this.music.stop();
                this.music.destroy();
            }
        });
 }
}