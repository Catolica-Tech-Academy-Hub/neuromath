"use client";

import launch, { Game } from "@/phaser/game";
import { useEffect, useRef } from "react";

const PhaserGame = () => {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (gameRef.current === null) {
      gameRef.current = launch("phaser-container");
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div id="phaser-container" style={{ width: "800px", height: "600px" }} />
  );
};

export default PhaserGame;
