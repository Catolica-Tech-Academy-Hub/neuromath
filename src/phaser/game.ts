import Phaser from "phaser";
import MainScene from "./scenes/MainScene";

// 1. Configurações do Jogo
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Deixa o Phaser decidir se usa WebGL ou Canvas
  width: 800, // Largura da tela do jogo em pixels
  height: 600, // Altura da tela do jogo em pixels
  parent: "phaser-container", // ID do elemento HTML onde o jogo será renderizado
  backgroundColor: "#000000", // Cor de fundo da tela
  physics: {
    // Configurações da física do jogo
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 }, // Uma gravidade simples para começar
      debug: false, // Coloque 'true' para ver as caixas de colisão
    },
  },
  scene: [MainScene], // Lista de cenas do jogo. Começamos com a MainScene
};

// 2. Função para Lançar o Jogo
// Esta função será chamada pelo nosso componente React (PhaserGame.tsx)
const launch = (containerId: string) => {
  return new Phaser.Game({ ...config, parent: containerId });
};

export default launch;
export type { Game } from "phaser"; // Exportamos o tipo para usar no nosso hook useRef
